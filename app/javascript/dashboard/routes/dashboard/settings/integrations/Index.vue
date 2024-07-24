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
      <div class="flex-grow flex-shrink overflow-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <IntegrationItem
            v-for="item in integrationList"
            :id="item.id"
            :key="item.id"
<<<<<<< HEAD
            :logo="item.logo"
            :name="item.name"
            :description="item.description"
            :enabled="item.enabled"
          />
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
        </div>
      </div>
    </template>
  </SettingsLayout>
</template>
