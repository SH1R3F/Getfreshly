const FB_API_VERSION = 'v22.0';
const FB_GRAPH_URL = `https://graph.facebook.com/${FB_API_VERSION}`;

// Utility functions
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
    return `Error making Graph API call to ${url}:` + error;
  }
};

const fetchNode = async (
  accessToken: string,
  nodeId: string,
  options: any = {},
): Promise<any> => {
  const url = `${FB_GRAPH_URL}/${nodeId}`;
  const params: Record<string, any> = { access_token: accessToken };

  if (options.fields) {
    params.fields = Array.isArray(options.fields)
      ? options.fields.join(',')
      : options.fields;
  }
  if (options.date_format) {
    params.date_format = options.date_format;
  }

  return await makeGraphApiCall(url, params);
};

const fetchEdge = async (
  nodeId: string,
  edge: string,
  options: any = {},
): Promise<any> => {
  const url = `${FB_GRAPH_URL}/${nodeId}/${edge}`;
  const params: Record<string, any> = { access_token: options.accessToken };

  // Add common parameters
  if (options.fields) {
    params.fields = Array.isArray(options.fields)
      ? options.fields.join(',')
      : options.fields;
  }
  if (options.filtering) {
    params.filtering = JSON.stringify(options.filtering);
  }
  if (options.limit !== undefined) {
    params.limit = options.limit;
  }
  if (options.after) {
    params.after = options.after;
  }
  if (options.before) {
    params.before = options.before;
  }
  if (options.date_preset) {
    params.date_preset = options.date_preset;
  }
  if (options.time_range) {
    params.time_range = JSON.stringify(options.time_range);
  }
  if (options.updated_since !== undefined) {
    params.updated_since = options.updated_since;
  }
  if (options.effective_status) {
    params.effective_status = Array.isArray(options.effective_status)
      ? JSON.stringify(options.effective_status)
      : options.effective_status;
  }
  if (options.date_format) {
    params.date_format = options.date_format;
  }
  if (options.is_completed !== undefined) {
    params.is_completed = options.is_completed;
  }
  if (options.special_ad_categories) {
    params.special_ad_categories = JSON.stringify(
      options.special_ad_categories,
    );
  }
  if (options.objective) {
    params.objective = JSON.stringify(options.objective);
  }
  if (options.buyer_guarantee_agreement_status) {
    params.buyer_guarantee_agreement_status = JSON.stringify(
      options.buyer_guarantee_agreement_status,
    );
  }
  if (options.include_drafts !== undefined) {
    params.include_drafts = options.include_drafts;
  }
  if (options.since) {
    params.since = options.since;
  }
  if (options.until) {
    params.until = options.until;
  }

  return await makeGraphApiCall(url, params);
};

const buildInsightsParams = (
  params: Record<string, any>,
  options: any,
): Record<string, any> => {
  if (options.fields) {
    params.fields = Array.isArray(options.fields)
      ? options.fields.join(',')
      : options.fields;
  }
  if (options.date_preset) {
    params.date_preset = options.date_preset;
  }
  if (options.time_range) {
    params.time_range = JSON.stringify(options.time_range);
  }
  if (options.time_ranges) {
    params.time_ranges = JSON.stringify(options.time_ranges);
  }
  if (options.time_increment) {
    params.time_increment = options.time_increment;
  }
  if (options.level) {
    params.level = options.level;
  }
  if (options.action_attribution_windows) {
    params.action_attribution_windows = JSON.stringify(
      options.action_attribution_windows,
    );
  }
  if (options.action_breakdowns) {
    params.action_breakdowns = JSON.stringify(options.action_breakdowns);
  }
  if (options.action_report_time) {
    params.action_report_time = options.action_report_time;
  }
  if (options.breakdowns) {
    params.breakdowns = JSON.stringify(options.breakdowns);
  }
  if (options.default_summary !== undefined) {
    params.default_summary = options.default_summary;
  }
  if (options.use_account_attribution_setting !== undefined) {
    params.use_account_attribution_setting =
      options.use_account_attribution_setting;
  }
  if (options.use_unified_attribution_setting !== undefined) {
    params.use_unified_attribution_setting =
      options.use_unified_attribution_setting;
  }
  if (options.filtering) {
    params.filtering = JSON.stringify(options.filtering);
  }
  if (options.sort) {
    params.sort = options.sort;
  }
  if (options.limit !== undefined) {
    params.limit = options.limit;
  }
  if (options.after) {
    params.after = options.after;
  }
  if (options.before) {
    params.before = options.before;
  }
  if (options.offset !== undefined) {
    params.offset = options.offset;
  }
  if (options.since) {
    params.since = options.since;
  }
  if (options.until) {
    params.until = options.until;
  }
  if (options.locale) {
    params.locale = options.locale;
  }

  return params;
};

export const facebookToolsExecution = (accessToken?: string) => ({
  list_ad_accounts: async () => {
    const url = `${FB_GRAPH_URL}/me`;
    const params = {
      access_token: accessToken,
      fields: 'adaccounts{name}',
    };
    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_details_of_ad_account: async (options: {
    act_id: string;
    fields?: any;
  }) => {
    const result = await fetchNode(accessToken!, options.act_id, {
      fields: options.fields,
    });
    return result;
  },

  get_adaccount_insights: async (options: {
    act_id: string;
    fields?: any;
    date_preset?: string;
    time_range?: any;
    time_ranges?: any;
    time_increment?: string;
    level?: string;
    action_attribution_windows?: string[];
    action_breakdowns?: string[];
    action_report_time?: string;
    breakdowns?: string[];
    default_summary?: boolean;
    use_account_attribution_setting?: boolean;
    use_unified_attribution_setting?: boolean;
    filtering?: any;
    sort?: string;
    limit?: number;
    after?: string;
    before?: string;
    offset?: number;
    since?: string;
    until?: string;
    locale?: string;
  }) => {
    const url = `${FB_GRAPH_URL}/${options.act_id}/insights`;
    let params: Record<string, any> = { access_token: accessToken };

    params = buildInsightsParams(params, options);
    console.log('~~~~xxx get_adaccount_insights', url, params);
    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_campaign_insights: async (options: {
    campaign_id: string;
    fields?: any;
    date_preset?: string;
    time_range?: any;
    time_ranges?: any;
    time_increment?: string;
    action_attribution_windows?: string[];
    action_breakdowns?: string[];
    action_report_time?: string;
    breakdowns?: string[];
    default_summary?: boolean;
    use_account_attribution_setting?: boolean;
    use_unified_attribution_setting?: boolean;
    level?: string;
    filtering?: any;
    sort?: string;
    limit?: number;
    after?: string;
    before?: string;
    offset?: number;
    since?: string;
    until?: string;
    locale?: string;
  }) => {
    const url = `${FB_GRAPH_URL}/${options.campaign_id}/insights`;
    let params: Record<string, any> = { access_token: accessToken };

    const effectiveLevel = options.level || 'campaign';
    params = buildInsightsParams(params, {
      ...options,
      level: effectiveLevel,
    });
    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_adset_insights: async (options: {
    adset_id: string;
    fields?: any;
    date_preset?: string;
    time_range?: any;
    time_ranges?: any;
    time_increment?: string;
    action_attribution_windows?: string[];
    action_breakdowns?: string[];
    action_report_time?: string;
    breakdowns?: string[];
    default_summary?: boolean;
    use_account_attribution_setting?: boolean;
    use_unified_attribution_setting?: boolean;
    level?: string;
    filtering?: any;
    sort?: string;
    limit?: number;
    after?: string;
    before?: string;
    offset?: number;
    since?: string;
    until?: string;
    locale?: string;
  }) => {
    const url = `${FB_GRAPH_URL}/${options.adset_id}/insights`;
    let params: Record<string, any> = { access_token: accessToken };

    const effectiveLevel = options.level || 'adset';
    params = buildInsightsParams(params, {
      ...options,
      level: effectiveLevel,
    });
    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_ad_insights: async (options: {
    ad_id: string;
    fields?: any;
    date_preset?: string;
    time_range?: any;
    time_ranges?: any;
    time_increment?: string;
    action_attribution_windows?: string[];
    action_breakdowns?: string[];
    action_report_time?: string;
    breakdowns?: string[];
    default_summary?: boolean;
    use_account_attribution_setting?: boolean;
    use_unified_attribution_setting?: boolean;
    level?: string;
    filtering?: any;
    sort?: string;
    limit?: number;
    after?: string;
    before?: string;
    offset?: number;
    since?: string;
    until?: string;
    locale?: string;
  }) => {
    const url = `${FB_GRAPH_URL}/${options.ad_id}/insights`;
    let params: Record<string, any> = { access_token: accessToken };

    const effectiveLevel = options.level || 'ad';
    params = buildInsightsParams(params, {
      ...options,
      level: effectiveLevel,
    });
    const result = await makeGraphApiCall(url, params);
    return result;
  },

  fetch_pagination_url: async (options: { url: string }) => {
    const response = await fetch(options.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  get_ad_creative_by_id: async (options: {
    creative_id: string;
    fields?: any;
    thumbnail_width?: number;
    thumbnail_height?: number;
  }) => {
    const url = `${FB_GRAPH_URL}/${options.creative_id}`;
    const params: Record<string, any> = { access_token: accessToken };

    if (options.fields) {
      params.fields = Array.isArray(options.fields)
        ? options.fields.join(',')
        : options.fields;
    }
    if (options.thumbnail_width) {
      params.thumbnail_width = options.thumbnail_width;
    }
    if (options.thumbnail_height) {
      params.thumbnail_height = options.thumbnail_height;
    }

    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_ad_creatives_by_ad_id: async (options: {
    ad_id: string;
    fields?: any;
    limit?: number;
    after?: string;
    before?: string;
    date_format?: string;
  }) => {
    const url = `${FB_GRAPH_URL}/${options.ad_id}/adcreatives`;
    const params: Record<string, any> = { access_token: accessToken };

    if (options.fields) {
      params.fields = Array.isArray(options.fields)
        ? options.fields.join(',')
        : options.fields;
    }
    if (options.limit !== undefined) {
      params.limit = options.limit;
    }
    if (options.after) {
      params.after = options.after;
    }
    if (options.before) {
      params.before = options.before;
    }
    if (options.date_format) {
      params.date_format = options.date_format;
    }

    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_ad_by_id: async (options: { ad_id: string; fields?: any }) => {
    const result = await fetchNode(accessToken!, options.ad_id, {
      fields: options.fields,
    });
    return result;
  },

  get_ads_by_adaccount: async (options: {
    act_id: string;
    fields?: any;
    filtering?: any;
    limit?: number;
    after?: string;
    before?: string;
    date_preset?: string;
    time_range?: any;
    updated_since?: number;
    effective_status?: any;
  }) => {
    const result = await fetchEdge(options.act_id, 'ads', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_ads_by_campaign: async (options: {
    campaign_id: string;
    fields?: any;
    filtering?: any;
    limit?: number;
    after?: string;
    before?: string;
    effective_status?: any;
  }) => {
    const result = await fetchEdge(options.campaign_id, 'ads', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_ads_by_adset: async (options: {
    adset_id: string;
    fields?: any;
    filtering?: any;
    limit?: number;
    after?: string;
    before?: string;
    effective_status?: any;
    date_format?: string;
  }) => {
    const result = await fetchEdge(options.adset_id, 'ads', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_adset_by_id: async (options: { adset_id: string; fields?: any }) => {
    const result = await fetchNode(accessToken!, options.adset_id, {
      fields: options.fields,
    });
    return result;
  },

  get_adsets_by_ids: async (options: {
    adset_ids: string[];
    fields?: any;
    date_format?: string;
  }) => {
    const url = `${FB_GRAPH_URL}/`;
    const params: Record<string, any> = {
      access_token: accessToken,
      ids: options.adset_ids.join(','),
    };

    if (options.fields) {
      params.fields = Array.isArray(options.fields)
        ? options.fields.join(',')
        : options.fields;
    }
    if (options.date_format) {
      params.date_format = options.date_format;
    }

    const result = await makeGraphApiCall(url, params);
    return result;
  },

  get_adsets_by_adaccount: async (options: {
    act_id: string;
    fields?: any;
    filtering?: any;
    limit?: number;
    after?: string;
    before?: string;
    date_preset?: string;
    time_range?: any;
    updated_since?: number;
    effective_status?: any;
    date_format?: string;
  }) => {
    const result = await fetchEdge(options.act_id, 'adsets', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_adsets_by_campaign: async (options: {
    campaign_id: string;
    fields?: any;
    filtering?: any;
    limit?: number;
    after?: string;
    before?: string;
    effective_status?: any;
    date_format?: string;
  }) => {
    const result = await fetchEdge(options.campaign_id, 'adsets', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_campaign_by_id: async (options: {
    campaign_id: string;
    fields?: any;
    date_format?: string;
  }) => {
    const result = await fetchNode(accessToken!, options.campaign_id, {
      fields: options.fields,
      date_format: options.date_format,
    });
    return result;
  },

  get_campaigns_by_adaccount: async (options: {
    act_id: string;
    fields?: any;
    filtering?: any;
    limit?: number;
    after?: string;
    before?: string;
    date_preset?: string;
    time_range?: any;
    updated_since?: number;
    effective_status?: any;
    is_completed?: boolean;
    special_ad_categories?: string[];
    objective?: string[];
    buyer_guarantee_agreement_status?: string[];
    date_format?: string;
    include_drafts?: boolean;
  }) => {
    const result = await fetchEdge(options.act_id, 'campaigns', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_activities_by_adaccount: async (options: {
    act_id: string;
    fields?: any;
    limit?: number;
    after?: string;
    before?: string;
    time_range?: any;
    since?: string;
    until?: string;
  }) => {
    const result = await fetchEdge(options.act_id, 'activities', {
      ...options,
      accessToken,
    });
    return result;
  },

  get_activities_by_adset: async (options: {
    adset_id: string;
    fields?: any;
    limit?: number;
    after?: string;
    before?: string;
    time_range?: any;
    since?: string;
    until?: string;
  }) => {
    const result = await fetchEdge(options.adset_id, 'activities', {
      ...options,
      accessToken,
    });
    return result;
  },
});
