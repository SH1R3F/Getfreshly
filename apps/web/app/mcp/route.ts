/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable turbo/no-undeclared-env-vars */

import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';

// Constants
const FB_API_VERSION = 'v22.0';
const FB_GRAPH_URL = `https://graph.facebook.com/${FB_API_VERSION}`;
const DEFAULT_AD_ACCOUNT_FIELDS = [
  'name',
  'business_name',
  'age',
  'account_status',
  'balance',
  'amount_spent',
  'attribution_spec',
  'account_id',
  'business',
  'business_city',
  'brand_safety_content_filter_levels',
  'currency',
  'created_time',
  'id',
];

// Helper Functions
const getFbAccessToken = (): string => {
  const token = process.env.FB_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FB_ACCESS_TOKEN environment variable is required');
  }
  return token;
};

const makeGraphApiCall = async (
  url: string,
  params: Record<string, any>,
): Promise<any> => {
  try {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        urlParams.append(key, String(value));
      }
    });

    const fullUrl = `${url}?${urlParams.toString()}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error making Graph API call to ${url}:`, error);
    throw error;
  }
};

const prepareParams = (
  baseParams: Record<string, any>,
  kwargs: Record<string, any>,
): Record<string, any> => {
  const params = { ...baseParams };

  Object.entries(kwargs).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      // Parameters that need JSON encoding
      if (
        [
          'filtering',
          'time_range',
          'time_ranges',
          'effective_status',
          'special_ad_categories',
          'objective',
          'buyer_guarantee_agreement_status',
        ].includes(key) &&
        (Array.isArray(value) || typeof value === 'object')
      ) {
        params[key] = JSON.stringify(value);
      } else if (
        [
          'fields',
          'action_attribution_windows',
          'action_breakdowns',
          'breakdowns',
        ].includes(key) &&
        Array.isArray(value)
      ) {
        params[key] = value.join(',');
      } else {
        params[key] = value;
      }
    }
  });

  return params;
};

const fetchNode = async (
  nodeId: string,
  kwargs: Record<string, any> = {},
): Promise<any> => {
  const accessToken = getFbAccessToken();
  const url = `${FB_GRAPH_URL}/${nodeId}`;
  const params = prepareParams({ access_token: accessToken }, kwargs);
  return makeGraphApiCall(url, params);
};

const fetchEdge = async (
  parentId: string,
  edgeName: string,
  kwargs: Record<string, any> = {},
): Promise<any> => {
  const accessToken = getFbAccessToken();
  const url = `${FB_GRAPH_URL}/${parentId}/${edgeName}`;

  // Handle time parameters specifically for activities edge
  const timeParams: Record<string, any> = {};
  if (edgeName === 'activities') {
    const timeRange = kwargs.time_range;
    const since = kwargs.since;
    const until = kwargs.until;
    delete kwargs.time_range;
    delete kwargs.since;
    delete kwargs.until;

    if (timeRange) {
      timeParams.time_range = timeRange;
    } else {
      if (since) timeParams.since = since;
      if (until) timeParams.until = until;
    }
  }

  const baseParams = { access_token: accessToken };
  const params = prepareParams(baseParams, { ...kwargs, ...timeParams });

  return makeGraphApiCall(url, params);
};

const buildInsightsParams = (
  params: Record<string, any>,
  options: {
    fields?: string[];
    date_preset?: string;
    time_range?: Record<string, string>;
    time_ranges?: Record<string, string>[];
    time_increment?: string;
    level?: string;
    action_attribution_windows?: string[];
    action_breakdowns?: string[];
    action_report_time?: string;
    breakdowns?: string[];
    default_summary?: boolean;
    use_account_attribution_setting?: boolean;
    use_unified_attribution_setting?: boolean;
    filtering?: Record<string, any>[];
    sort?: string;
    limit?: number;
    after?: string;
    before?: string;
    offset?: number;
    since?: string;
    until?: string;
    locale?: string;
  } = {},
): Record<string, any> => {
  // Use the generic parameter builder first
  params = prepareParams(params, {
    fields: options.fields,
    level: options.level,
    action_attribution_windows: options.action_attribution_windows,
    action_breakdowns: options.action_breakdowns,
    action_report_time: options.action_report_time,
    breakdowns: options.breakdowns,
    filtering: options.filtering,
    sort: options.sort,
    limit: options.limit,
    after: options.after,
    before: options.before,
    offset: options.offset,
    locale: options.locale,
  });

  // Handle time parameters (specific logic for insights)
  const timeParamsProvided =
    options.time_range || options.time_ranges || options.since || options.until;
  if (!timeParamsProvided && options.date_preset) {
    params.date_preset = options.date_preset;
  }
  if (options.time_range) {
    params.time_range = JSON.stringify(options.time_range);
  }
  if (options.time_ranges) {
    params.time_ranges = JSON.stringify(options.time_ranges);
  }
  if (options.time_increment && options.time_increment !== 'all_days') {
    params.time_increment = options.time_increment;
  }

  // Time-based pagination (only if specific time range isn't set)
  if (!options.time_range && !options.time_ranges) {
    if (options.since) {
      params.since = options.since;
    }
    if (options.until) {
      params.until = options.until;
    }
  }

  // Boolean flags need specific handling ('true'/'false' strings)
  if (options.default_summary) {
    params.default_summary = 'true';
  }
  if (options.use_account_attribution_setting) {
    params.use_account_attribution_setting = 'true';
  }
  if (options.use_unified_attribution_setting) {
    params.use_unified_attribution_setting = 'true';
  }

  return params;
};

// Zod schemas for validation
const fieldsSchema = z.array(z.string()).optional();
const timeRangeSchema = z.record(z.string(), z.string()).optional();
const timeRangesSchema = z.array(z.record(z.string(), z.string())).optional();
const filteringSchema = z.array(z.record(z.string(), z.any())).optional();
const effectiveStatusSchema = z.array(z.string()).optional();

const handler = createMcpHandler(
  (server) => {
    // Ad Account Tools
    server.tool(
      'list_ad_accounts',
      'List down the ad accounts and their names associated with your Facebook account',
      {},
      async () => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/me`;
        const params = {
          access_token: accessToken,
          fields: 'adaccounts{name}',
        };
        const result = await makeGraphApiCall(url, params);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_details_of_ad_account',
      'Get details of a specific ad account as per the fields provided',
      {
        act_id: z
          .string()
          .describe('The act ID of the ad account, example: act_1234567890'),
        fields: fieldsSchema.describe(
          'The fields to get from the ad account. If None, defaults are used.',
        ),
      },
      async ({ act_id, fields }) => {
        const effectiveFields = fields || DEFAULT_AD_ACCOUNT_FIELDS;
        const result = await fetchNode(act_id, { fields: effectiveFields });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Insights API Tools
    server.tool(
      'get_adaccount_insights',
      'Retrieves performance insights for a specified Facebook ad account',
      {
        act_id: z
          .string()
          .describe('The target ad account ID, prefixed with "act_"'),
        fields: fieldsSchema,
        date_preset: z.string().default('last_30d'),
        time_range: timeRangeSchema,
        time_ranges: timeRangesSchema,
        time_increment: z.string().default('all_days'),
        level: z.string().default('account'),
        action_attribution_windows: z.array(z.string()).optional(),
        action_breakdowns: z.array(z.string()).optional(),
        action_report_time: z.string().optional(),
        breakdowns: z.array(z.string()).optional(),
        default_summary: z.boolean().default(false),
        use_account_attribution_setting: z.boolean().default(false),
        use_unified_attribution_setting: z.boolean().default(true),
        filtering: filteringSchema,
        sort: z.string().optional(),
        limit: z.number().optional(),
        after: z.string().optional(),
        before: z.string().optional(),
        offset: z.number().optional(),
        since: z.string().optional(),
        until: z.string().optional(),
        locale: z.string().optional(),
      },
      async (options) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/${options.act_id}/insights`;
        let params: Record<string, any> = { access_token: accessToken };

        params = buildInsightsParams(params, options);
        const result = await makeGraphApiCall(url, params);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_campaign_insights',
      'Retrieves performance insights for a specific Facebook ad campaign',
      {
        campaign_id: z
          .string()
          .describe('The ID of the target Facebook ad campaign'),
        fields: fieldsSchema,
        date_preset: z.string().default('last_30d'),
        time_range: timeRangeSchema,
        time_ranges: timeRangesSchema,
        time_increment: z.string().default('all_days'),
        action_attribution_windows: z.array(z.string()).optional(),
        action_breakdowns: z.array(z.string()).optional(),
        action_report_time: z.string().optional(),
        breakdowns: z.array(z.string()).optional(),
        default_summary: z.boolean().default(false),
        use_account_attribution_setting: z.boolean().default(false),
        use_unified_attribution_setting: z.boolean().default(true),
        level: z.string().optional(),
        filtering: filteringSchema,
        sort: z.string().optional(),
        limit: z.number().optional(),
        after: z.string().optional(),
        before: z.string().optional(),
        offset: z.number().optional(),
        since: z.string().optional(),
        until: z.string().optional(),
        locale: z.string().optional(),
      },
      async (options) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/${options.campaign_id}/insights`;
        let params: Record<string, any> = { access_token: accessToken };

        const effectiveLevel = options.level || 'campaign';
        params = buildInsightsParams(params, {
          ...options,
          level: effectiveLevel,
        });
        const result = await makeGraphApiCall(url, params);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_adset_insights',
      'Retrieves performance insights for a specific Facebook ad set',
      {
        adset_id: z.string().describe('The ID of the target ad set'),
        fields: fieldsSchema,
        date_preset: z.string().default('last_30d'),
        time_range: timeRangeSchema,
        time_ranges: timeRangesSchema,
        time_increment: z.string().default('all_days'),
        action_attribution_windows: z.array(z.string()).optional(),
        action_breakdowns: z.array(z.string()).optional(),
        action_report_time: z.string().optional(),
        breakdowns: z.array(z.string()).optional(),
        default_summary: z.boolean().default(false),
        use_account_attribution_setting: z.boolean().default(false),
        use_unified_attribution_setting: z.boolean().default(true),
        level: z.string().optional(),
        filtering: filteringSchema,
        sort: z.string().optional(),
        limit: z.number().optional(),
        after: z.string().optional(),
        before: z.string().optional(),
        offset: z.number().optional(),
        since: z.string().optional(),
        until: z.string().optional(),
        locale: z.string().optional(),
      },
      async (options) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/${options.adset_id}/insights`;
        let params: Record<string, any> = { access_token: accessToken };

        const effectiveLevel = options.level || 'adset';
        params = buildInsightsParams(params, {
          ...options,
          level: effectiveLevel,
        });
        const result = await makeGraphApiCall(url, params);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_ad_insights',
      'Retrieves detailed performance insights for a specific Facebook ad',
      {
        ad_id: z.string().describe('The ID of the target ad'),
        fields: fieldsSchema,
        date_preset: z.string().default('last_30d'),
        time_range: timeRangeSchema,
        time_ranges: timeRangesSchema,
        time_increment: z.string().default('all_days'),
        action_attribution_windows: z.array(z.string()).optional(),
        action_breakdowns: z.array(z.string()).optional(),
        action_report_time: z.string().optional(),
        breakdowns: z.array(z.string()).optional(),
        default_summary: z.boolean().default(false),
        use_account_attribution_setting: z.boolean().default(false),
        use_unified_attribution_setting: z.boolean().default(true),
        level: z.string().optional(),
        filtering: filteringSchema,
        sort: z.string().optional(),
        limit: z.number().optional(),
        after: z.string().optional(),
        before: z.string().optional(),
        offset: z.number().optional(),
        since: z.string().optional(),
        until: z.string().optional(),
        locale: z.string().optional(),
      },
      async (options) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/${options.ad_id}/insights`;
        let params: Record<string, any> = { access_token: accessToken };

        const effectiveLevel = options.level || 'ad';
        params = buildInsightsParams(params, {
          ...options,
          level: effectiveLevel,
        });
        const result = await makeGraphApiCall(url, params);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Pagination Tool
    server.tool(
      'fetch_pagination_url',
      'Fetch data from a Facebook Graph API pagination URL',
      {
        url: z
          .string()
          .describe(
            'The complete pagination URL from response paging.next or paging.previous',
          ),
      },
      async ({ url }) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Ad Creative Tools
    server.tool(
      'get_ad_creative_by_id',
      'Retrieves detailed information about a specific Facebook ad creative',
      {
        creative_id: z
          .string()
          .describe('The ID of the ad creative to retrieve'),
        fields: fieldsSchema,
        thumbnail_width: z.number().optional(),
        thumbnail_height: z.number().optional(),
      },
      async ({ creative_id, fields, thumbnail_width, thumbnail_height }) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/${creative_id}`;
        const params: Record<string, any> = { access_token: accessToken };

        if (fields) {
          params.fields = fields.join(',');
        }
        if (thumbnail_width) {
          params.thumbnail_width = thumbnail_width;
        }
        if (thumbnail_height) {
          params.thumbnail_height = thumbnail_height;
        }

        const result = await makeGraphApiCall(url, params);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_ad_creatives_by_ad_id',
      'Retrieves the ad creatives associated with a specific Facebook ad',
      {
        ad_id: z
          .string()
          .describe('The ID of the ad to retrieve creatives for'),
        fields: fieldsSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        date_format: z.string().optional(),
      },
      async ({ ad_id, fields, limit, after, before, date_format }) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/${ad_id}/adcreatives`;
        const params: Record<string, any> = { access_token: accessToken };

        if (fields) {
          params.fields = fields.join(',');
        }
        if (limit !== undefined) {
          params.limit = limit;
        }
        if (after) {
          params.after = after;
        }
        if (before) {
          params.before = before;
        }
        if (date_format) {
          params.date_format = date_format;
        }

        const result = await makeGraphApiCall(url, params);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Ad Tools
    server.tool(
      'get_ad_by_id',
      'Retrieves detailed information about a specific Facebook ad by its ID',
      {
        ad_id: z.string().describe('The ID of the ad to retrieve'),
        fields: fieldsSchema,
      },
      async ({ ad_id, fields }) => {
        const result = await fetchNode(ad_id, { fields });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_ads_by_adaccount',
      'Retrieves ads from a specific Facebook ad account',
      {
        act_id: z
          .string()
          .describe('The ID of the ad account, prefixed with "act_"'),
        fields: fieldsSchema,
        filtering: filteringSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        date_preset: z.string().optional(),
        time_range: timeRangeSchema,
        updated_since: z.number().optional(),
        effective_status: effectiveStatusSchema,
      },
      async (options) => {
        const result = await fetchEdge(options.act_id, 'ads', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_ads_by_campaign',
      'Retrieves ads associated with a specific Facebook campaign',
      {
        campaign_id: z.string().describe('The ID of the campaign'),
        fields: fieldsSchema,
        filtering: filteringSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        effective_status: effectiveStatusSchema,
      },
      async (options) => {
        const result = await fetchEdge(options.campaign_id, 'ads', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_ads_by_adset',
      'Retrieves ads associated with a specific Facebook ad set',
      {
        adset_id: z.string().describe('The ID of the ad set'),
        fields: fieldsSchema,
        filtering: filteringSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        effective_status: effectiveStatusSchema,
        date_format: z.string().optional(),
      },
      async (options) => {
        const result = await fetchEdge(options.adset_id, 'ads', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Ad Set Tools
    server.tool(
      'get_adset_by_id',
      'Retrieves detailed information about a specific Facebook ad set by its ID',
      {
        adset_id: z.string().describe('The ID of the ad set'),
        fields: fieldsSchema,
      },
      async ({ adset_id, fields }) => {
        const result = await fetchNode(adset_id, { fields });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_adsets_by_ids',
      'Retrieves detailed information about multiple Facebook ad sets by their IDs',
      {
        adset_ids: z.array(z.string()).describe('A list of ad set IDs'),
        fields: fieldsSchema,
        date_format: z.string().optional(),
      },
      async ({ adset_ids, fields, date_format }) => {
        const accessToken = getFbAccessToken();
        const url = `${FB_GRAPH_URL}/`;
        const params: Record<string, any> = {
          access_token: accessToken,
          ids: adset_ids.join(','),
        };

        if (fields) {
          params.fields = fields.join(',');
        }
        if (date_format) {
          params.date_format = date_format;
        }

        const result = await makeGraphApiCall(url, params);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_adsets_by_adaccount',
      'Retrieves ad sets from a specific Facebook ad account',
      {
        act_id: z
          .string()
          .describe('The ID of the ad account, prefixed with "act_"'),
        fields: fieldsSchema,
        filtering: filteringSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        date_preset: z.string().optional(),
        time_range: timeRangeSchema,
        updated_since: z.number().optional(),
        effective_status: effectiveStatusSchema,
        date_format: z.string().optional(),
      },
      async (options) => {
        const result = await fetchEdge(options.act_id, 'adsets', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_adsets_by_campaign',
      'Retrieves ad sets associated with a specific Facebook campaign',
      {
        campaign_id: z.string().describe('The ID of the campaign'),
        fields: fieldsSchema,
        filtering: filteringSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        effective_status: effectiveStatusSchema,
        date_format: z.string().optional(),
      },
      async (options) => {
        const result = await fetchEdge(options.campaign_id, 'adsets', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Campaign Tools
    server.tool(
      'get_campaign_by_id',
      'Retrieves detailed information about a specific Facebook ad campaign by its ID',
      {
        campaign_id: z.string().describe('The ID of the campaign'),
        fields: fieldsSchema,
        date_format: z.string().optional(),
      },
      async ({ campaign_id, fields, date_format }) => {
        const result = await fetchNode(campaign_id, { fields, date_format });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_campaigns_by_adaccount',
      'Retrieves campaigns from a specific Facebook ad account',
      {
        act_id: z
          .string()
          .describe('The ID of the ad account, prefixed with "act_"'),
        fields: fieldsSchema,
        filtering: filteringSchema,
        limit: z.number().default(25),
        after: z.string().optional(),
        before: z.string().optional(),
        date_preset: z.string().optional(),
        time_range: timeRangeSchema,
        updated_since: z.number().optional(),
        effective_status: effectiveStatusSchema,
        is_completed: z.boolean().optional(),
        special_ad_categories: z.array(z.string()).optional(),
        objective: z.array(z.string()).optional(),
        buyer_guarantee_agreement_status: z.array(z.string()).optional(),
        date_format: z.string().optional(),
        include_drafts: z.boolean().optional(),
      },
      async (options) => {
        const result = await fetchEdge(options.act_id, 'campaigns', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    // Activity Tools
    server.tool(
      'get_activities_by_adaccount',
      'Retrieves activities for a Facebook ad account',
      {
        act_id: z
          .string()
          .describe('The ID of the ad account, prefixed with "act_"'),
        fields: fieldsSchema,
        limit: z.number().optional(),
        after: z.string().optional(),
        before: z.string().optional(),
        time_range: timeRangeSchema,
        since: z.string().optional(),
        until: z.string().optional(),
      },
      async (options) => {
        const result = await fetchEdge(options.act_id, 'activities', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );

    server.tool(
      'get_activities_by_adset',
      'Retrieves activities for a Facebook ad set',
      {
        adset_id: z.string().describe('The ID of the ad set'),
        fields: fieldsSchema,
        limit: z.number().optional(),
        after: z.string().optional(),
        before: z.string().optional(),
        time_range: timeRangeSchema,
        since: z.string().optional(),
        until: z.string().optional(),
      },
      async (options) => {
        const result = await fetchEdge(options.adset_id, 'activities', options);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      },
    );
  },
  {},
  {
    redisUrl: process.env.REDIS_URL,
    basePath: '',
    verboseLogs: true,
    maxDuration: 60,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
