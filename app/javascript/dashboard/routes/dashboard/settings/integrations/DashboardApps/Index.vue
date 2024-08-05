<<<<<<< HEAD
<<<<<<< HEAD
=======
<template>
  <div class="flex-1 p-4 overflow-auto">
    <woot-button
      color-scheme="success"
      class-names="button--fixed-top"
      icon="add-circle"
      @click="openCreatePopup"
    >
      {{ $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.HEADER_BTN_TXT') }}
    </woot-button>
    <div class="flex flex-row gap-4">
      <div class="w-full lg:w-3/5">
        <p
          v-if="!uiFlags.isFetching && !records.length"
          class="flex flex-col items-center justify-center h-full"
        >
          {{ $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.LIST.404') }}
        </p>
        <woot-loading-state
          v-if="uiFlags.isFetching"
          :message="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.LIST.LOADING')"
        />
        <table v-if="!uiFlags.isFetching && records.length" class="woot-table">
          <thead>
            <th
              v-for="thHeader in $t(
                'INTEGRATION_SETTINGS.DASHBOARD_APPS.LIST.TABLE_HEADER'
              )"
              :key="thHeader"
            >
              {{ thHeader }}
            </th>
          </thead>
          <tbody>
            <dashboard-apps-row
              v-for="(dashboardAppItem, index) in records"
              :key="dashboardAppItem.id"
              :index="index"
              :app="dashboardAppItem"
              @edit="editApp"
              @delete="openDeletePopup"
            />
          </tbody>
        </table>
      </div>

      <div class="hidden w-1/3 lg:block">
        <span
          v-dompurify-html="
            useInstallationName(
              $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.SIDEBAR_TXT'),
              globalConfig.installationName
            )
          "
        />
      </div>
    </div>

    <dashboard-app-modal
      v-if="showDashboardAppPopup"
      :show="showDashboardAppPopup"
      :mode="mode"
      :selected-app-data="selectedApp"
      @close="toggleDashboardAppPopup"
    />

    <woot-delete-modal
      :show.sync="showDeleteConfirmationPopup"
      :on-close="closeDeletePopup"
      :on-confirm="confirmDeletion"
      :title="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.TITLE')"
      :message="
        $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.MESSAGE', {
          appName: selectedApp.title,
        })
      "
      :confirm-text="
        $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.CONFIRM_YES')
      "
      :reject-text="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.CONFIRM_NO')"
    />
  </div>
</template>
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
<script>
import { mapGetters } from 'vuex';
import { useAlert } from 'dashboard/composables';
import DashboardAppModal from './DashboardAppModal.vue';
import DashboardAppsRow from './DashboardAppsRow.vue';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';
import BaseSettingsHeader from '../../components/BaseSettingsHeader.vue';

export default {
  components: {
    BaseSettingsHeader,
    DashboardAppModal,
    DashboardAppsRow,
  },
  mixins: [globalConfigMixin],
  data() {
    return {
      loading: {},
      showDashboardAppPopup: false,
      showDeleteConfirmationPopup: false,
      selectedApp: {},
      mode: 'CREATE',
    };
  },
  computed: {
    ...mapGetters({
      records: 'dashboardApps/getRecords',
      uiFlags: 'dashboardApps/getUIFlags',
    }),
  },
  mounted() {
    this.$store.dispatch('dashboardApps/get');
  },
  methods: {
    toggleDashboardAppPopup() {
      this.showDashboardAppPopup = !this.showDashboardAppPopup;
      this.selectedApp = {};
    },
    openDeletePopup(response) {
      this.showDeleteConfirmationPopup = true;
      this.selectedApp = response;
    },
    openCreatePopup() {
      this.mode = 'CREATE';
      this.selectedApp = {};
      this.showDashboardAppPopup = true;
    },
    closeDeletePopup() {
      this.showDeleteConfirmationPopup = false;
    },
    editApp(app) {
      this.loading[app.id] = true;
      this.mode = 'UPDATE';
      this.selectedApp = app;
      this.showDashboardAppPopup = true;
    },
    confirmDeletion() {
      this.loading[this.selectedApp.id] = true;
      this.closeDeletePopup();
      this.deleteApp(this.selectedApp.id);
    },
    async deleteApp(id) {
      try {
        await this.$store.dispatch('dashboardApps/delete', id);
        useAlert(
          this.$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.API_SUCCESS')
        );
      } catch (error) {
        useAlert(
          this.$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.API_ERROR')
        );
      }
    },
  },
};
</script>

<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <div class="flex flex-col flex-1 gap-8 overflow-auto">
=======
  <div class="flex-1 overflow-auto flex gap-8 flex-col">
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
  <div class="flex flex-col flex-1 gap-8 overflow-auto">
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
    <BaseSettingsHeader
      :title="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.TITLE')"
      :description="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DESCRIPTION')"
      :link-text="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.LEARN_MORE')"
      feature-name="dashboard_apps"
      :back-button-label="$t('INTEGRATION_SETTINGS.HEADER')"
    >
      <template #actions>
        <woot-button
<<<<<<< HEAD
<<<<<<< HEAD
          class="rounded-md button nice"
=======
          class="button nice rounded-md"
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
          class="rounded-md button nice"
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
          icon="add-circle"
          @click="openCreatePopup"
        >
          {{ $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.HEADER_BTN_TXT') }}
        </woot-button>
      </template>
    </BaseSettingsHeader>
<<<<<<< HEAD
<<<<<<< HEAD
    <div class="w-full overflow-x-auto text-slate-700 dark:text-slate-200">
=======
    <div class="w-full text-slate-700 dark:text-slate-200 overflow-x-auto">
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
    <div class="w-full overflow-x-auto text-slate-700 dark:text-slate-200">
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
      <p
        v-if="!uiFlags.isFetching && !records.length"
        class="flex flex-col items-center justify-center h-full"
      >
        {{ $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.LIST.404') }}
      </p>
      <woot-loading-state
        v-if="uiFlags.isFetching"
        :message="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.LIST.LOADING')"
      />
      <table
        v-if="!uiFlags.isFetching && records.length"
        class="min-w-full divide-y divide-slate-75 dark:divide-slate-700"
      >
        <thead>
          <th
            v-for="thHeader in $t(
              'INTEGRATION_SETTINGS.DASHBOARD_APPS.LIST.TABLE_HEADER'
            )"
            :key="thHeader"
<<<<<<< HEAD
<<<<<<< HEAD
            class="py-4 pr-4 font-semibold text-left text-slate-700 dark:text-slate-300"
=======
            class="py-4 pr-4 text-left font-semibold text-slate-700 dark:text-slate-300"
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
            class="py-4 pr-4 font-semibold text-left text-slate-700 dark:text-slate-300"
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
          >
            {{ thHeader }}
          </th>
        </thead>
        <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
<<<<<<< HEAD
<<<<<<< HEAD
          <DashboardAppsRow
=======
          <dashboard-apps-row
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
          <DashboardAppsRow
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
            v-for="(dashboardAppItem, index) in records"
            :key="dashboardAppItem.id"
            :index="index"
            :app="dashboardAppItem"
            @edit="editApp"
            @delete="openDeletePopup"
          />
        </tbody>
      </table>
    </div>

<<<<<<< HEAD
<<<<<<< HEAD
    <DashboardAppModal
=======
    <dashboard-app-modal
>>>>>>> 6694db093 (feat: Update the design for dashboard_apps (#9840))
=======
    <DashboardAppModal
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
      v-if="showDashboardAppPopup"
      :show="showDashboardAppPopup"
      :mode="mode"
      :selected-app-data="selectedApp"
      @close="toggleDashboardAppPopup"
    />

    <woot-delete-modal
      :show.sync="showDeleteConfirmationPopup"
      :on-close="closeDeletePopup"
      :on-confirm="confirmDeletion"
      :title="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.TITLE')"
      :message="
        $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.MESSAGE', {
          appName: selectedApp.title,
        })
      "
      :confirm-text="
        $t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.CONFIRM_YES')
      "
      :reject-text="$t('INTEGRATION_SETTINGS.DASHBOARD_APPS.DELETE.CONFIRM_NO')"
    />
  </div>
</template>
