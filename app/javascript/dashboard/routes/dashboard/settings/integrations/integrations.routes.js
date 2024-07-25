import { frontendURL } from '../../../../helper/URLHelper';
const SettingsWrapper = () => import('../SettingsWrapper.vue');
const IntegrationHooks = () => import('./IntegrationHooks.vue');
const Index = () => import('./Index.vue');
const Webhook = () => import('./Webhooks/Index.vue');
const DashboardApps = () => import('./DashboardApps/Index.vue');
const Slack = () => import('./Slack.vue');
const SettingsContent = () => import('../Wrapper.vue');

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/settings/integrations'),
      component: SettingsWrapper,
      props: {},
      children: [
        {
          path: '',
          name: 'settings_applications',
          component: Index,
          meta: {
            permissions: ['administrator'],
          },
        },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
        {
          path: 'dashboard_apps',
          component: DashboardApps,
          name: 'settings_integrations_dashboard_apps',
          meta: {
            permissions: ['administrator'],
          },
        },
<<<<<<< HEAD
      ],
    },
=======
      ],
    },

>>>>>>> 8b1d98af5 (feat: Update the design for integration page (#9825))
=======
      ],
    },
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
    {
      path: frontendURL('accounts/:accountId/settings/integrations'),
      component: SettingsContent,
      props: params => {
        const showBackButton = params.name !== 'settings_integrations';
        const backUrl =
          params.name === 'settings_integrations_integration'
            ? { name: 'settings_integrations' }
            : '';
        return {
          headerTitle: 'INTEGRATION_SETTINGS.HEADER',
          icon: 'flash-on',
          showBackButton,
          backUrl,
        };
      },
      children: [
        {
          path: 'webhook',
          component: Webhook,
          name: 'settings_integrations_webhook',
          meta: {
            permissions: ['administrator'],
          },
        },
        {
<<<<<<< HEAD
<<<<<<< HEAD
=======
          path: 'dashboard_apps',
          component: DashboardApps,
          name: 'settings_integrations_dashboard_apps',
          meta: {
            permissions: ['administrator'],
          },
        },
        {
>>>>>>> 39d20b197 (chore: Update the integration icons, logic for enabled/active attributes for the integration (#9828))
=======
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
          path: 'slack',
          name: 'settings_integrations_slack',
          component: Slack,
          meta: {
            permissions: ['administrator'],
          },
          props: route => ({ code: route.query.code }),
        },
        {
          path: ':integration_id',
          name: 'settings_applications_integration',
          component: IntegrationHooks,
          meta: {
            permissions: ['administrator'],
          },
          props: route => ({
            integrationId: route.params.integration_id,
          }),
        },
      ],
    },
  ],
};
