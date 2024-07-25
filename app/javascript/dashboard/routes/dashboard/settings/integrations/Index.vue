<script setup>
import { useStoreGetters, useStore } from 'dashboard/composables/store';
import { computed, onMounted } from 'vue';
import IntegrationItem from './IntegrationItem.vue';
import SettingsLayout from '../SettingsLayout.vue';
import BaseSettingsHeader from '../components/BaseSettingsHeader.vue';

const store = useStore();
const getters = useStoreGetters();

const uiFlags = getters['integrations/getUIFlags'];

const integrationList = computed(
  () => getters['integrations/getAppIntegrations'].value
);

onMounted(() => {
  store.dispatch('integrations/get');
});
</script>

<template>
  <SettingsLayout
    :is-loading="uiFlags.isFetching"
    :loading-message="$t('INTEGRATION_SETTINGS.LOADING')"
  >
    <template #header>
      <BaseSettingsHeader
        :title="$t('INTEGRATION_SETTINGS.HEADER')"
        :description="$t('INTEGRATION_SETTINGS.DESCRIPTION')"
        :link-text="$t('INTEGRATION_SETTINGS.LEARN_MORE')"
        feature-name="integrations"
      />
    </template>
    <template #body>
<<<<<<< HEAD
<<<<<<< HEAD
      <div class="flex-grow flex-shrink overflow-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <IntegrationItem
            v-for="item in integrationList"
            :id="item.id"
            :key="item.id"
<<<<<<< HEAD
=======
      <div class="flex-grow flex-shrink overflow-auto font-inter">
=======
      <div class="flex-grow flex-shrink overflow-auto">
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <integration-item
            v-for="item in integrationList"
            :id="item.id"
            :key="item.id"
>>>>>>> 8b1d98af5 (feat: Update the design for integration page (#9825))
            :logo="item.logo"
            :name="item.name"
            :description="item.description"
            :enabled="item.enabled"
          />
<<<<<<< HEAD
=======
            class="bg-white dark:bg-slate-800 border border-solid border-slate-75 dark:border-slate-700/50 rounded-sm mb-4 p-4"
          >
            <integration
              :integration-id="item.id"
              :integration-logo="item.logo"
              :integration-name="item.name"
              :integration-description="item.description"
              :integration-enabled="item.enabled"
              :integration-action="item.action"
            />
          </div>
          <div
            class="bg-white dark:bg-slate-800 border border-solid border-slate-75 dark:border-slate-700/50 rounded-sm mb-4 p-4"
          >
            <integration
              integration-id="dashboard_apps"
              :integration-name="
                $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.TITLE')
              "
              :integration-description="
                $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DESCRIPTION')
              "
              integration-enabled
              integration-action="/dashboard-apps"
            />
          </div>
>>>>>>> 39d20b197 (chore: Update the integration icons, logic for enabled/active attributes for the integration (#9828))
=======
>>>>>>> 8b1d98af5 (feat: Update the design for integration page (#9825))
        </div>
      </div>
    </template>
  </SettingsLayout>
</template>
