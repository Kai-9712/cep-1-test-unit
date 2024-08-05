<<<<<<< HEAD
<<<<<<< HEAD
<script setup>
import { useAlert } from 'dashboard/composables';
import { messageTimestamp } from 'shared/helpers/timeHelper';
import { useStoreGetters, useStore } from 'dashboard/composables/store';
import TableFooter from 'dashboard/components/widgets/TableFooter.vue';
import BaseSettingsHeader from '../components/BaseSettingsHeader.vue';
import {
  generateTranslationPayload,
  generateLogActionKey,
} from 'dashboard/helper/auditlogHelper';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'dashboard/composables/useI18n';
import { useRoute, useRouter } from 'dashboard/composables/route';

const getters = useStoreGetters();
const store = useStore();
const router = useRouter();
const records = computed(() => getters['auditlogs/getAuditLogs'].value);
const uiFlags = computed(() => getters['auditlogs/getUIFlags'].value);
const meta = computed(() => getters['auditlogs/getMeta'].value);
const agentList = computed(() => getters['agents/getAgents'].value);

const { t } = useI18n();
const route = useRoute();

const routerPage = computed(() => Number(route.query.page ?? 1));

const fetchAuditLogs = page => {
  try {
    store.dispatch('auditlogs/fetch', { page });
  } catch (error) {
    const errorMessage = error?.message || t('AUDIT_LOGS.API.ERROR_MESSAGE');
    useAlert(errorMessage);
  }
};

const generateLogText = auditLogItem => {
  const translationPayload = generateTranslationPayload(
    auditLogItem,
    agentList.value
  );
  const translationKey = generateLogActionKey(auditLogItem);

  return t(translationKey, translationPayload);
};

const onPageChange = page => {
  router.push({ name: 'auditlogs_list', query: { page: page } });
};

onMounted(() => {
  store.dispatch('agents/get');
  fetchAuditLogs(routerPage.value);
});

watch(routerPage, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    fetchAuditLogs(newPage);
  }
});
</script>

<template>
  <div class="flex-1 overflow-auto">
    <BaseSettingsHeader
      :title="$t('AUDIT_LOGS.HEADER')"
      :description="$t('AUDIT_LOGS.DESCRIPTION')"
      :link-text="$t('AUDIT_LOGS.LEARN_MORE')"
      feature-name="audit_logs"
    />

    <div class="mt-6 flex-1 text-slate-700 dark:text-slate-300">
      <woot-loading-state
        v-if="uiFlags.fetchingList"
        :message="$t('AUDIT_LOGS.LOADING')"
      />
      <p
        v-else-if="!records.length"
        class="flex flex-col items-center justify-center h-full text-base p-8"
      >
        {{ $t('AUDIT_LOGS.LIST.404') }}
      </p>
      <div v-else class="min-w-full overflow-x-auto">
        <table class="divide-y divide-slate-75 dark:divide-slate-700">
=======
<template>
  <div class="flex flex-col justify-between flex-1 p-4 overflow-auto">
    <!-- List Audit Logs -->
    <div>
      <div>
        <p
          v-if="!uiFlags.fetchingList && !records.length"
          class="flex flex-col items-center justify-center h-full"
        >
          {{ $t('AUDIT_LOGS.LIST.404') }}
        </p>
        <woot-loading-state
          v-if="uiFlags.fetchingList"
          :message="$t('AUDIT_LOGS.LOADING')"
        />

        <table
          v-if="!uiFlags.fetchingList && records.length"
          class="w-full woot-table"
        >
          <colgroup>
            <col class="w-3/5" />
            <col />
            <col />
          </colgroup>
>>>>>>> 79381b08c (feat: Move timeMixin to a helper (#9799))
          <thead>
            <th
              v-for="thHeader in $t('AUDIT_LOGS.LIST.TABLE_HEADER')"
              :key="thHeader"
              class="py-4 pr-4 text-left font-semibold text-slate-700 dark:text-slate-300"
            >
              {{ thHeader }}
            </th>
          </thead>
          <tbody
            class="divide-y divide-slate-50 dark:divide-slate-800 text-slate-700 dark:text-slate-300"
          >
            <tr v-for="auditLogItem in records" :key="auditLogItem.id">
<<<<<<< HEAD
              <td class="py-4 pr-4 break-all whitespace-nowrap">
                {{ generateLogText(auditLogItem) }}
              </td>
              <td class="py-4 pr-4 break-all whitespace-nowrap">
=======
              <td class="break-all whitespace-nowrap">
                {{ generateLogText(auditLogItem) }}
              </td>
              <td class="break-all whitespace-nowrap">
>>>>>>> 79381b08c (feat: Move timeMixin to a helper (#9799))
                {{
                  messageTimestamp(
                    auditLogItem.created_at,
                    'MMM dd, yyyy hh:mm a'
                  )
                }}
              </td>
              <td class="py-4 w-[8.75rem]">
                {{ auditLogItem.remote_address }}
              </td>
            </tr>
          </tbody>
        </table>
        <TableFooter
          :current-page="Number(meta.currentPage)"
          :total-count="meta.totalEntries"
          :page-size="meta.perPage"
          class="border-slate-50 dark:border-slate-800 border-t !px-0 py-4"
          @pageChange="onPageChange"
        />
      </div>
    </div>
  </div>
</template>
<<<<<<< HEAD
=======
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<script>
import { mapGetters } from 'vuex';
import { useAlert } from 'dashboard/composables';
import { messageTimestamp } from 'shared/helpers/timeHelper';
import TableFooter from 'dashboard/components/widgets/TableFooter.vue';
import {
  generateTranslationPayload,
  generateLogActionKey,
} from 'dashboard/helper/auditlogHelper';

export default {
  components: {
    TableFooter,
  },
  beforeRouteEnter(to, from, next) {
    // Fetch Audit Logs on page load without manual refresh
    next(vm => {
      vm.fetchAuditLogs();
    });
  },
  data() {
    return {
      loading: {},
      auditLogsAPI: {
        message: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      records: 'auditlogs/getAuditLogs',
      uiFlags: 'auditlogs/getUIFlags',
      meta: 'auditlogs/getMeta',
      agentList: 'agents/getAgents',
    }),
  },
  mounted() {
    // Fetch API Call
    this.$store.dispatch('agents/get');
  },
  methods: {
    messageTimestamp,
    fetchAuditLogs() {
      const page = this.$route.query.page ?? 1;
      this.$store.dispatch('auditlogs/fetch', { page }).catch(error => {
        const errorMessage =
          error?.message || this.$t('AUDIT_LOGS.API.ERROR_MESSAGE');
        useAlert(errorMessage);
      });
    },
    generateLogText(auditLogItem) {
      const translationPayload = generateTranslationPayload(
        auditLogItem,
        this.agentList
      );
      const translationKey = generateLogActionKey(auditLogItem);

      return this.$t(translationKey, translationPayload);
    },
    onPageChange(page) {
      window.history.pushState({}, null, `${this.$route.path}?page=${page}`);
      try {
        this.$store.dispatch('auditlogs/fetch', { page });
      } catch (error) {
        const errorMessage =
          error?.message || this.$t('AUDIT_LOGS.API.ERROR_MESSAGE');
        useAlert(errorMessage);
      }
    },
  },
};
</script>
<<<<<<< HEAD
>>>>>>> 79381b08c (feat: Move timeMixin to a helper (#9799))
=======

<template>
  <div class="flex flex-col justify-between flex-1 p-4 overflow-auto">
    <!-- List Audit Logs -->
    <div>
      <div>
        <p
          v-if="!uiFlags.fetchingList && !records.length"
          class="flex flex-col items-center justify-center h-full"
        >
          {{ $t('AUDIT_LOGS.LIST.404') }}
        </p>
        <woot-loading-state
          v-if="uiFlags.fetchingList"
          :message="$t('AUDIT_LOGS.LOADING')"
        />

        <table
          v-if="!uiFlags.fetchingList && records.length"
          class="w-full woot-table"
        >
          <colgroup>
            <col class="w-3/5" />
            <col />
            <col />
          </colgroup>
          <thead>
            <!-- Header -->
            <th
              v-for="thHeader in $t('AUDIT_LOGS.LIST.TABLE_HEADER')"
              :key="thHeader"
            >
              {{ thHeader }}
            </th>
          </thead>
          <tbody>
            <tr v-for="auditLogItem in records" :key="auditLogItem.id">
              <td class="break-all whitespace-nowrap">
                {{ generateLogText(auditLogItem) }}
              </td>
              <td class="break-all whitespace-nowrap">
                {{
                  messageTimestamp(
                    auditLogItem.created_at,
                    'MMM dd, yyyy hh:mm a'
                  )
                }}
              </td>
              <td class="w-[8.75rem]">
                {{ auditLogItem.remote_address }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <TableFooter
      :current-page="Number(meta.currentPage)"
      :total-count="meta.totalEntries"
      :page-size="meta.perPage"
      class="!bg-slate-25 dark:!bg-slate-900 border-t border-slate-75 dark:border-slate-700/50"
      @pageChange="onPageChange"
    />
  </div>
</template>
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
