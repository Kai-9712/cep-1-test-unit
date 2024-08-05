<<<<<<< HEAD
<script setup>
import { useAlert } from 'dashboard/composables';
import AddCanned from './AddCanned.vue';
import EditCanned from './EditCanned.vue';
import BaseSettingsHeader from '../components/BaseSettingsHeader.vue';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'dashboard/composables/useI18n';
import { useStoreGetters, useStore } from 'dashboard/composables/store';

const getters = useStoreGetters();
const store = useStore();
const { t } = useI18n();

const showAddPopup = ref(false);
const loading = ref({});
const showEditPopup = ref(false);
const showDeleteConfirmationPopup = ref(false);
const activeResponse = ref({});
const cannedResponseAPI = ref({ message: '' });

const sortOrder = ref('asc');
const records = computed(() =>
  getters.getSortedCannedResponses.value(sortOrder.value)
);
const uiFlags = computed(() => getters.getUIFlags.value);

const deleteConfirmText = computed(
  () =>
    `${t('CANNED_MGMT.DELETE.CONFIRM.YES')} ${activeResponse.value.short_code}`
);

const deleteRejectText = computed(
  () =>
    `${t('CANNED_MGMT.DELETE.CONFIRM.NO')} ${activeResponse.value.short_code}`
);

const deleteMessage = computed(() => {
  return ` ${activeResponse.value.short_code} ? `;
});

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const fetchCannedResponses = async () => {
  try {
    await store.dispatch('getCannedResponse');
  } catch (error) {
    // Ignore Error
  }
};

onMounted(() => {
  fetchCannedResponses();
});

const showAlertMessage = message => {
  loading[activeResponse.value.id] = false;
  activeResponse.value = {};
  cannedResponseAPI.value.message = message;
  useAlert(message);
};

const openAddPopup = () => {
  showAddPopup.value = true;
};
const hideAddPopup = () => {
  showAddPopup.value = false;
};

const openEditPopup = response => {
  showEditPopup.value = true;
  activeResponse.value = response;
};
const hideEditPopup = () => {
  showEditPopup.value = false;
};

const openDeletePopup = response => {
  showDeleteConfirmationPopup.value = true;
  activeResponse.value = response;
};

const closeDeletePopup = () => {
  showDeleteConfirmationPopup.value = false;
};

const deleteCannedResponse = async id => {
  try {
    await store.dispatch('deleteCannedResponse', id);
    showAlertMessage(t('CANNED_MGMT.DELETE.API.SUCCESS_MESSAGE'));
  } catch (error) {
    const errorMessage =
      error?.message || t('CANNED_MGMT.DELETE.API.ERROR_MESSAGE');
    showAlertMessage(errorMessage);
  }
};

const confirmDeletion = () => {
  loading[activeResponse.value.id] = true;
  closeDeletePopup();
  deleteCannedResponse(activeResponse.value.id);
};
</script>

<template>
  <div class="flex-1 overflow-auto">
    <BaseSettingsHeader
      :title="$t('CANNED_MGMT.HEADER')"
      :description="$t('CANNED_MGMT.DESCRIPTION')"
      :link-text="$t('CANNED_MGMT.LEARN_MORE')"
      feature-name="canned_responses"
    >
      <template #actions>
        <woot-button
          class="button nice rounded-md"
          icon="add-circle"
          @click="openAddPopup"
        >
          {{ $t('CANNED_MGMT.HEADER_BTN_TXT') }}
        </woot-button>
      </template>
    </BaseSettingsHeader>

    <div class="mt-6 flex-1">
      <woot-loading-state
        v-if="uiFlags.fetchingList"
        :message="$t('CANNED_MGMT.LOADING')"
      />
      <p
        v-else-if="!records.length"
        class="flex flex-col items-center justify-center h-full text-base text-slate-600 dark:text-slate-300 py-8"
      >
        {{ $t('CANNED_MGMT.LIST.404') }}
      </p>
      <table
        v-else
        class="min-w-full overflow-x-auto divide-y divide-slate-75 dark:divide-slate-700"
      >
        <thead>
          <th
            v-for="thHeader in $t('CANNED_MGMT.LIST.TABLE_HEADER')"
            :key="thHeader"
            class="py-4 pr-4 text-left font-semibold text-slate-700 dark:text-slate-300"
          >
            <span v-if="thHeader !== $t('CANNED_MGMT.LIST.TABLE_HEADER[0]')">
              {{ thHeader }}
            </span>

            <button
              v-if="thHeader === $t('CANNED_MGMT.LIST.TABLE_HEADER[0]')"
              class="flex items-center p-0 cursor-pointer"
              @click="toggleSort"
            >
              <span class="mb-0">
                {{ thHeader }}
<<<<<<< HEAD
              </span>
              <fluent-icon
                class="ml-2"
                :icon="sortOrder === 'desc' ? 'chevron-up' : 'chevron-down'"
              />
            </button>
          </th>
        </thead>
        <tbody
          class="divide-y divide-slate-50 dark:divide-slate-800 text-slate-700 dark:text-slate-300"
        >
          <tr
            v-for="(cannedItem, index) in records"
            :key="cannedItem.short_code"
          >
            <td
              class="py-4 pr-4 truncate max-w-xs font-medium"
              :title="cannedItem.short_code"
=======
              </p>

              <button
                v-if="thHeader === $t('CANNED_MGMT.LIST.TABLE_HEADER[0]')"
                class="flex items-center p-0 cursor-pointer"
                @click="toggleSort"
              >
                <p class="uppercase">
                  {{ thHeader }}
                </p>
                <fluent-icon
                  class="mb-2 ml-2"
                  :icon="sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'"
                />
              </button>
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(cannedItem, index) in records"
              :key="cannedItem.short_code"
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
            >
              {{ cannedItem.short_code }}
            </td>
            <td class="py-4 pr-4 md:break-all whitespace-normal">
              {{ cannedItem.content }}
            </td>
            <td class="py-4 flex justify-end gap-1">
              <woot-button
                v-tooltip.top="$t('CANNED_MGMT.EDIT.BUTTON_TEXT')"
                variant="smooth"
                size="tiny"
                color-scheme="secondary"
                icon="edit"
                @click="openEditPopup(cannedItem)"
              />
              <woot-button
                v-tooltip.top="$t('CANNED_MGMT.DELETE.BUTTON_TEXT')"
                variant="smooth"
                color-scheme="alert"
                size="tiny"
                icon="dismiss-circle"
                class-names="grey-btn"
                :is-loading="loading[cannedItem.id]"
                @click="openDeletePopup(cannedItem, index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <woot-modal :show.sync="showAddPopup" :on-close="hideAddPopup">
      <AddCanned :on-close="hideAddPopup" />
    </woot-modal>

    <woot-modal :show.sync="showEditPopup" :on-close="hideEditPopup">
      <EditCanned
        v-if="showEditPopup"
        :id="activeResponse.id"
        :edshort-code="activeResponse.short_code"
        :edcontent="activeResponse.content"
        :on-close="hideEditPopup"
      />
    </woot-modal>

    <woot-delete-modal
      :show.sync="showDeleteConfirmationPopup"
      :on-close="closeDeletePopup"
      :on-confirm="confirmDeletion"
      :title="$t('CANNED_MGMT.DELETE.CONFIRM.TITLE')"
      :message="$t('CANNED_MGMT.DELETE.CONFIRM.MESSAGE')"
      :message-value="deleteMessage"
      :confirm-text="deleteConfirmText"
      :reject-text="deleteRejectText"
    />
  </div>
</template>
<<<<<<< HEAD
=======
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<script>
import { mapGetters } from 'vuex';
import { useAlert } from 'dashboard/composables';
import AddCanned from './AddCanned.vue';
import EditCanned from './EditCanned.vue';

export default {
  components: {
    AddCanned,
    EditCanned,
  },
  data() {
    return {
      loading: {},
      showAddPopup: false,
      showEditPopup: false,
      showDeleteConfirmationPopup: false,
      selectedResponse: {},
      cannedResponseAPI: {
        message: '',
      },
      sortOrder: 'asc',
    };
  },
  computed: {
    ...mapGetters({
      records: 'getCannedResponses',
      uiFlags: 'getUIFlags',
    }),
    // Delete Modal
    deleteConfirmText() {
      return `${this.$t('CANNED_MGMT.DELETE.CONFIRM.YES')} ${
        this.selectedResponse.short_code
      }`;
    },
    deleteRejectText() {
      return `${this.$t('CANNED_MGMT.DELETE.CONFIRM.NO')} ${
        this.selectedResponse.short_code
      }`;
    },
    deleteMessage() {
      return ` ${this.selectedResponse.short_code}?`;
    },
  },
  mounted() {
    // Fetch API Call
    this.$store.dispatch('getCannedResponse').then(() => {
      this.toggleSort();
    });
  },
  methods: {
    toggleSort() {
      this.records.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.short_code.localeCompare(b.short_code);
        }
        return b.short_code.localeCompare(a.short_code);
      });
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    showAlertMessage(message) {
      // Reset loading, current selected agent
      this.loading[this.selectedResponse.id] = false;
      this.selectedResponse = {};
      // Show message
      this.cannedResponseAPI.message = message;
      useAlert(message);
    },
    // Edit Function
    openAddPopup() {
      this.showAddPopup = true;
    },
    hideAddPopup() {
      this.showAddPopup = false;
    },

    // Edit Modal Functions
    openEditPopup(response) {
      this.showEditPopup = true;
      this.selectedResponse = response;
    },
    hideEditPopup() {
      this.showEditPopup = false;
    },

    // Delete Modal Functions
    openDeletePopup(response) {
      this.showDeleteConfirmationPopup = true;
      this.selectedResponse = response;
    },
    closeDeletePopup() {
      this.showDeleteConfirmationPopup = false;
    },
    // Set loading and call Delete API
    confirmDeletion() {
      this.loading[this.selectedResponse.id] = true;
      this.closeDeletePopup();
      this.deleteCannedResponse(this.selectedResponse.id);
    },
    deleteCannedResponse(id) {
      this.$store
        .dispatch('deleteCannedResponse', id)
        .then(() => {
          this.showAlertMessage(
            this.$t('CANNED_MGMT.DELETE.API.SUCCESS_MESSAGE')
          );
        })
        .catch(error => {
          const errorMessage =
            error?.message || this.$t('CANNED_MGMT.DELETE.API.ERROR_MESSAGE');
          this.showAlertMessage(errorMessage);
        });
    },
  },
};
</script>
<<<<<<< HEAD
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======

<template>
  <div class="flex-1 overflow-auto">
    <woot-button
      color-scheme="success"
      class-names="button--fixed-top"
      icon="add-circle"
      @click="openAddPopup()"
    >
      {{ $t('CANNED_MGMT.HEADER_BTN_TXT') }}
    </woot-button>

    <!-- List Canned Response -->
    <div class="flex flex-row gap-4 p-8">
      <div class="w-full xl:w-3/5">
        <p
          v-if="!uiFlags.fetchingList && !records.length"
          class="flex flex-col items-center justify-center h-full"
        >
          {{ $t('CANNED_MGMT.LIST.404') }}
        </p>
        <woot-loading-state
          v-if="uiFlags.fetchingList"
          :message="$t('CANNED_MGMT.LOADING')"
        />

        <table
          v-if="!uiFlags.fetchingList && records.length"
          class="woot-table"
        >
          <thead>
            <!-- Header -->
            <th
              v-for="thHeader in $t('CANNED_MGMT.LIST.TABLE_HEADER')"
              :key="thHeader"
              class="last:text-right first:m-0 first:p-0"
            >
              <p v-if="thHeader !== $t('CANNED_MGMT.LIST.TABLE_HEADER[0]')">
                {{ thHeader }}
              </p>

              <button
                v-if="thHeader === $t('CANNED_MGMT.LIST.TABLE_HEADER[0]')"
                class="flex items-center p-0 cursor-pointer"
                @click="toggleSort"
              >
                <p class="uppercase">
                  {{ thHeader }}
                </p>
                <fluent-icon
                  class="mb-2 ml-2"
                  :icon="sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'"
                />
              </button>
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(cannedItem, index) in records"
              :key="cannedItem.short_code"
            >
              <!-- Short Code  -->
              <td
                class="w-[8.75rem] truncate max-w-[8.75rem]"
                :title="cannedItem.short_code"
              >
                {{ cannedItem.short_code }}
              </td>
              <!-- Content -->
              <td class="break-all whitespace-normal">
                {{ cannedItem.content }}
              </td>
              <!-- Action Buttons -->
              <td class="flex justify-end gap-1 min-w-[12.5rem]">
                <woot-button
                  v-tooltip.top="$t('CANNED_MGMT.EDIT.BUTTON_TEXT')"
                  variant="smooth"
                  size="tiny"
                  color-scheme="secondary"
                  icon="edit"
                  @click="openEditPopup(cannedItem)"
                />
                <woot-button
                  v-tooltip.top="$t('CANNED_MGMT.DELETE.BUTTON_TEXT')"
                  variant="smooth"
                  color-scheme="alert"
                  size="tiny"
                  icon="dismiss-circle"
                  class-names="grey-btn"
                  :is-loading="loading[cannedItem.id]"
                  @click="openDeletePopup(cannedItem, index)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hidden w-1/3 xl:block">
        <span v-dompurify-html="$t('CANNED_MGMT.SIDEBAR_TXT')" />
      </div>
    </div>
    <!-- Add Agent -->
    <woot-modal :show.sync="showAddPopup" :on-close="hideAddPopup">
      <AddCanned :on-close="hideAddPopup" />
    </woot-modal>

    <!-- Edit Canned Response -->
    <woot-modal :show.sync="showEditPopup" :on-close="hideEditPopup">
      <EditCanned
        v-if="showEditPopup"
        :id="selectedResponse.id"
        :edshort-code="selectedResponse.short_code"
        :edcontent="selectedResponse.content"
        :on-close="hideEditPopup"
      />
    </woot-modal>

    <!-- Delete Canned Response -->
    <woot-delete-modal
      :show.sync="showDeleteConfirmationPopup"
      :on-close="closeDeletePopup"
      :on-confirm="confirmDeletion"
      :title="$t('CANNED_MGMT.DELETE.CONFIRM.TITLE')"
      :message="$t('CANNED_MGMT.DELETE.CONFIRM.MESSAGE')"
      :message-value="deleteMessage"
      :confirm-text="deleteConfirmText"
      :reject-text="deleteRejectText"
    />
  </div>
</template>
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
