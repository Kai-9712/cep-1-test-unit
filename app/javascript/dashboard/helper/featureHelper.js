const FEATURE_HELP_URLS = {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> aea68f1ec (feat: Update the design of the audit logs page (#9901))
  agent_bots: 'https://chwt.app/hc/agent-bots',
  audit_logs: 'https://chwt.app/hc/audit-logs',
  campaigns: 'https://chwt.app/hc/campaigns',
  canned_responses: 'https://chwt.app/hc/canned',
<<<<<<< HEAD
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
=======
>>>>>>> aea68f1ec (feat: Update the design of the audit logs page (#9901))
  channel_email: 'https://chwt.app/hc/email',
  channel_facebook: 'https://chwt.app/hc/fb',
  custom_attributes: 'https://chwt.app/hc/custom-attributes',
  dashboard_apps: 'https://chwt.app/hc/dashboard-apps',
<<<<<<< HEAD
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
  help_center: 'https://chwt.app/hc/help-center',
  integrations: 'https://chwt.app/hc/integrations',
  labels: 'https://chwt.app/hc/labels',
  message_reply_to: 'https://chwt.app/hc/reply-to',
  reports: 'https://chwt.app/hc/reports',
  sla: 'https://chwt.app/hc/sla',
  team_management: 'https://chwt.app/hc/teams',
>>>>>>> aea68f1ec (feat: Update the design of the audit logs page (#9901))
};

export function getHelpUrlForFeature(featureName) {
  return FEATURE_HELP_URLS[featureName];
}
