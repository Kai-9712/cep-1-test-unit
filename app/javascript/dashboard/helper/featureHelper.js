const FEATURE_HELP_URLS = {
<<<<<<< HEAD
  agent_bots: 'https://chwt.app/hc/agent-bots',
  audit_logs: 'https://chwt.app/hc/audit-logs',
  campaigns: 'https://chwt.app/hc/campaigns',
  canned_responses: 'https://chwt.app/hc/canned',
  channel_email: 'https://chwt.app/hc/email',
  channel_facebook: 'https://chwt.app/hc/fb',
  custom_attributes: 'https://chwt.app/hc/custom-attributes',
  dashboard_apps: 'https://chwt.app/hc/dashboard-apps',
  help_center: 'https://chwt.app/hc/help-center',
  integrations: 'https://chwt.app/hc/integrations',
  labels: 'https://chwt.app/hc/labels',
  message_reply_to: 'https://chwt.app/hc/reply-to',
  reports: 'https://chwt.app/hc/reports',
  sla: 'https://chwt.app/hc/sla',
  team_management: 'https://chwt.app/hc/teams',
=======
  channel_email: 'https://chwt.app/hc/email',
  channel_facebook: 'https://chwt.app/hc/fb',
  help_center: 'https://chwt.app/hc/help-center',
  agent_bots: 'https://chwt.app/hc/agent-bots',
  team_management: 'https://chwt.app/hc/teams',
  labels: 'https://chwt.app/hc/labels',
  custom_attributes: 'https://chwt.app/hc/custom-attributes',
  canned_responses: 'https://chwt.app/hc/canned',
  integrations: 'https://chwt.app/hc/integrations',
  campaigns: 'https://chwt.app/hc/campaigns',
  reports: 'https://chwt.app/hc/reports',
  message_reply_to: 'https://chwt.app/hc/reply-to',
  sla: 'https://chwt.app/hc/sla',
  dashboard_apps: 'https://chwt.app/hc/dashboard-apps',
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
};

export function getHelpUrlForFeature(featureName) {
  return FEATURE_HELP_URLS[featureName];
}
