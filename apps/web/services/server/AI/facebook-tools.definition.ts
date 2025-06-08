export const facebookToolDefinition = [
  {
    type: 'function',
    function: {
      name: 'list_ad_accounts',
      description: 'List down the ad accounts and their names associated with your Facebook account',
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_details_of_ad_account',
      description: 'Get details of a specific ad account as per the fields provided',
      parameters: {
        type: 'object',
        properties: {
          act_id: {
            type: 'string',
            description: 'The act ID of the ad account, example: act_1234567890',
          },
          fields: {
            description: 'The fields to get from the ad account. If None, defaults are used.',
          },
        },
        required: ['act_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_adaccount_insights',
      description: 'Retrieves performance insights for a specified Facebook ad account',
      parameters: {
        type: 'object',
        properties: {
          act_id: {
            type: 'string',
            description: 'The target ad account ID, prefixed with "act_"',
          },
          fields: {
            description: 'The fields to retrieve from insights',
          },
          date_preset: {
            type: 'string',
            default: 'last_30d',
          },
          time_range: {
            description: 'Time range for the insights',
          },
          time_ranges: {
            description: 'Multiple time ranges for the insights',
          },
          time_increment: {
            type: 'string',
            default: 'all_days',
          },
          level: {
            type: 'string',
            default: 'account',
          },
          action_attribution_windows: {
            type: 'array',
            items: { type: 'string' },
          },
          action_breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          action_report_time: {
            type: 'string',
          },
          breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          default_summary: {
            type: 'boolean',
            default: false,
          },
          use_account_attribution_setting: {
            type: 'boolean',
            default: false,
          },
          use_unified_attribution_setting: {
            type: 'boolean',
            default: true,
          },
          filtering: {
            description: 'Filtering options for the insights',
          },
          sort: {
            type: 'string',
          },
          limit: {
            type: 'number',
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          offset: {
            type: 'number',
          },
          since: {
            type: 'string',
          },
          until: {
            type: 'string',
          },
          locale: {
            type: 'string',
          },
        },
        required: ['act_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_campaign_insights',
      description: 'Retrieves performance insights for a specific Facebook ad campaign',
      parameters: {
        type: 'object',
        properties: {
          campaign_id: {
            type: 'string',
            description: 'The ID of the target Facebook ad campaign',
          },
          fields: {
            description: 'The fields to retrieve from insights',
          },
          date_preset: {
            type: 'string',
            default: 'last_30d',
          },
          time_range: {
            description: 'Time range for the insights',
          },
          time_ranges: {
            description: 'Multiple time ranges for the insights',
          },
          time_increment: {
            type: 'string',
            default: 'all_days',
          },
          action_attribution_windows: {
            type: 'array',
            items: { type: 'string' },
          },
          action_breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          action_report_time: {
            type: 'string',
          },
          breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          default_summary: {
            type: 'boolean',
            default: false,
          },
          use_account_attribution_setting: {
            type: 'boolean',
            default: false,
          },
          use_unified_attribution_setting: {
            type: 'boolean',
            default: true,
          },
          level: {
            type: 'string',
          },
          filtering: {
            description: 'Filtering options for the insights',
          },
          sort: {
            type: 'string',
          },
          limit: {
            type: 'number',
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          offset: {
            type: 'number',
          },
          since: {
            type: 'string',
          },
          until: {
            type: 'string',
          },
          locale: {
            type: 'string',
          },
        },
        required: ['campaign_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_adset_insights',
      description: 'Retrieves performance insights for a specific Facebook ad set',
      parameters: {
        type: 'object',
        properties: {
          adset_id: {
            type: 'string',
            description: 'The ID of the target ad set',
          },
          fields: {
            description: 'The fields to retrieve from insights',
          },
          date_preset: {
            type: 'string',
            default: 'last_30d',
          },
          time_range: {
            description: 'Time range for the insights',
          },
          time_ranges: {
            description: 'Multiple time ranges for the insights',
          },
          time_increment: {
            type: 'string',
            default: 'all_days',
          },
          action_attribution_windows: {
            type: 'array',
            items: { type: 'string' },
          },
          action_breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          action_report_time: {
            type: 'string',
          },
          breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          default_summary: {
            type: 'boolean',
            default: false,
          },
          use_account_attribution_setting: {
            type: 'boolean',
            default: false,
          },
          use_unified_attribution_setting: {
            type: 'boolean',
            default: true,
          },
          level: {
            type: 'string',
          },
          filtering: {
            description: 'Filtering options for the insights',
          },
          sort: {
            type: 'string',
          },
          limit: {
            type: 'number',
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          offset: {
            type: 'number',
          },
          since: {
            type: 'string',
          },
          until: {
            type: 'string',
          },
          locale: {
            type: 'string',
          },
        },
        required: ['adset_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ad_insights',
      description: 'Retrieves detailed performance insights for a specific Facebook ad',
      parameters: {
        type: 'object',
        properties: {
          ad_id: {
            type: 'string',
            description: 'The ID of the target ad',
          },
          fields: {
            description: 'The fields to retrieve from insights',
          },
          date_preset: {
            type: 'string',
            default: 'last_30d',
          },
          time_range: {
            description: 'Time range for the insights',
          },
          time_ranges: {
            description: 'Multiple time ranges for the insights',
          },
          time_increment: {
            type: 'string',
            default: 'all_days',
          },
          action_attribution_windows: {
            type: 'array',
            items: { type: 'string' },
          },
          action_breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          action_report_time: {
            type: 'string',
          },
          breakdowns: {
            type: 'array',
            items: { type: 'string' },
          },
          default_summary: {
            type: 'boolean',
            default: false,
          },
          use_account_attribution_setting: {
            type: 'boolean',
            default: false,
          },
          use_unified_attribution_setting: {
            type: 'boolean',
            default: true,
          },
          level: {
            type: 'string',
          },
          filtering: {
            description: 'Filtering options for the insights',
          },
          sort: {
            type: 'string',
          },
          limit: {
            type: 'number',
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          offset: {
            type: 'number',
          },
          since: {
            type: 'string',
          },
          until: {
            type: 'string',
          },
          locale: {
            type: 'string',
          },
        },
        required: ['ad_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fetch_pagination_url',
      description: 'Fetch data from a Facebook Graph API pagination URL',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The complete pagination URL from response paging.next or paging.previous',
          },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ad_creative_by_id',
      description: 'Retrieves detailed information about a specific Facebook ad creative',
      parameters: {
        type: 'object',
        properties: {
          creative_id: {
            type: 'string',
            description: 'The ID of the ad creative to retrieve',
          },
          fields: {
            description: 'The fields to retrieve from the creative',
          },
          thumbnail_width: {
            type: 'number',
          },
          thumbnail_height: {
            type: 'number',
          },
        },
        required: ['creative_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ad_creatives_by_ad_id',
      description: 'Retrieves the ad creatives associated with a specific Facebook ad',
      parameters: {
        type: 'object',
        properties: {
          ad_id: {
            type: 'string',
            description: 'The ID of the ad to retrieve creatives for',
          },
          fields: {
            description: 'The fields to retrieve from the creatives',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          date_format: {
            type: 'string',
          },
        },
        required: ['ad_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ad_by_id',
      description: 'Retrieves detailed information about a specific Facebook ad by its ID',
      parameters: {
        type: 'object',
        properties: {
          ad_id: {
            type: 'string',
            description: 'The ID of the ad to retrieve',
          },
          fields: {
            description: 'The fields to retrieve from the ad',
          },
        },
        required: ['ad_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ads_by_adaccount',
      description: 'Retrieves ads from a specific Facebook ad account',
      parameters: {
        type: 'object',
        properties: {
          act_id: {
            type: 'string',
            description: 'The ID of the ad account, prefixed with "act_"',
          },
          fields: {
            description: 'The fields to retrieve from the ads',
          },
          filtering: {
            description: 'Filtering options for the ads',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          date_preset: {
            type: 'string',
          },
          time_range: {
            description: 'Time range for the ads',
          },
          updated_since: {
            type: 'number',
          },
          effective_status: {
            description: 'Effective status filter for the ads',
          },
        },
        required: ['act_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ads_by_campaign',
      description: 'Retrieves ads associated with a specific Facebook campaign',
      parameters: {
        type: 'object',
        properties: {
          campaign_id: {
            type: 'string',
            description: 'The ID of the campaign',
          },
          fields: {
            description: 'The fields to retrieve from the ads',
          },
          filtering: {
            description: 'Filtering options for the ads',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          effective_status: {
            description: 'Effective status filter for the ads',
          },
        },
        required: ['campaign_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ads_by_adset',
      description: 'Retrieves ads associated with a specific Facebook ad set',
      parameters: {
        type: 'object',
        properties: {
          adset_id: {
            type: 'string',
            description: 'The ID of the ad set',
          },
          fields: {
            description: 'The fields to retrieve from the ads',
          },
          filtering: {
            description: 'Filtering options for the ads',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          effective_status: {
            description: 'Effective status filter for the ads',
          },
          date_format: {
            type: 'string',
          },
        },
        required: ['adset_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_adset_by_id',
      description: 'Retrieves detailed information about a specific Facebook ad set by its ID',
      parameters: {
        type: 'object',
        properties: {
          adset_id: {
            type: 'string',
            description: 'The ID of the ad set',
          },
          fields: {
            description: 'The fields to retrieve from the ad set',
          },
        },
        required: ['adset_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_adsets_by_ids',
      description: 'Retrieves detailed information about multiple Facebook ad sets by their IDs',
      parameters: {
        type: 'object',
        properties: {
          adset_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'A list of ad set IDs',
          },
          fields: {
            description: 'The fields to retrieve from the ad sets',
          },
          date_format: {
            type: 'string',
          },
        },
        required: ['adset_ids'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_adsets_by_adaccount',
      description: 'Retrieves ad sets from a specific Facebook ad account',
      parameters: {
        type: 'object',
        properties: {
          act_id: {
            type: 'string',
            description: 'The ID of the ad account, prefixed with "act_"',
          },
          fields: {
            description: 'The fields to retrieve from the ad sets',
          },
          filtering: {
            description: 'Filtering options for the ad sets',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          date_preset: {
            type: 'string',
          },
          time_range: {
            description: 'Time range for the ad sets',
          },
          updated_since: {
            type: 'number',
          },
          effective_status: {
            description: 'Effective status filter for the ad sets',
          },
          date_format: {
            type: 'string',
          },
        },
        required: ['act_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_adsets_by_campaign',
      description: 'Retrieves ad sets associated with a specific Facebook campaign',
      parameters: {
        type: 'object',
        properties: {
          campaign_id: {
            type: 'string',
            description: 'The ID of the campaign',
          },
          fields: {
            description: 'The fields to retrieve from the ad sets',
          },
          filtering: {
            description: 'Filtering options for the ad sets',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          effective_status: {
            description: 'Effective status filter for the ad sets',
          },
          date_format: {
            type: 'string',
          },
        },
        required: ['campaign_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_campaign_by_id',
      description: 'Retrieves detailed information about a specific Facebook ad campaign by its ID',
      parameters: {
        type: 'object',
        properties: {
          campaign_id: {
            type: 'string',
            description: 'The ID of the campaign',
          },
          fields: {
            description: 'The fields to retrieve from the campaign',
          },
          date_format: {
            type: 'string',
          },
        },
        required: ['campaign_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_campaigns_by_adaccount',
      description: 'Retrieves campaigns from a specific Facebook ad account',
      parameters: {
        type: 'object',
        properties: {
          act_id: {
            type: 'string',
            description: 'The ID of the ad account, prefixed with "act_"',
          },
          fields: {
            description: 'The fields to retrieve from the campaigns',
          },
          filtering: {
            description: 'Filtering options for the campaigns',
          },
          limit: {
            type: 'number',
            default: 25,
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          date_preset: {
            type: 'string',
          },
          time_range: {
            description: 'Time range for the campaigns',
          },
          updated_since: {
            type: 'number',
          },
          effective_status: {
            description: 'Effective status filter for the campaigns',
          },
          is_completed: {
            type: 'boolean',
          },
          special_ad_categories: {
            type: 'array',
            items: { type: 'string' },
          },
          objective: {
            type: 'array',
            items: { type: 'string' },
          },
          buyer_guarantee_agreement_status: {
            type: 'array',
            items: { type: 'string' },
          },
          date_format: {
            type: 'string',
          },
          include_drafts: {
            type: 'boolean',
          },
        },
        required: ['act_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_activities_by_adaccount',
      description: 'Retrieves activities for a Facebook ad account',
      parameters: {
        type: 'object',
        properties: {
          act_id: {
            type: 'string',
            description: 'The ID of the ad account, prefixed with "act_"',
          },
          fields: {
            description: 'The fields to retrieve from the activities',
          },
          limit: {
            type: 'number',
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          time_range: {
            description: 'Time range for the activities',
          },
          since: {
            type: 'string',
          },
          until: {
            type: 'string',
          },
        },
        required: ['act_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_activities_by_adset',
      description: 'Retrieves activities for a Facebook ad set',
      parameters: {
        type: 'object',
        properties: {
          adset_id: {
            type: 'string',
            description: 'The ID of the ad set',
          },
          fields: {
            description: 'The fields to retrieve from the activities',
          },
          limit: {
            type: 'number',
          },
          after: {
            type: 'string',
          },
          before: {
            type: 'string',
          },
          time_range: {
            description: 'Time range for the activities',
          },
          since: {
            type: 'string',
          },
          until: {
            type: 'string',
          },
        },
        required: ['adset_id'],
      },
    },
  },
];