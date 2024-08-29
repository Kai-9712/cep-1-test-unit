<script setup>
import { useAlert } from 'dashboard/composables';
import EditAttribute from './EditAttribute.vue';
import { useStoreGetters, useStore } from 'dashboard/composables/store';
import { computed, ref } from 'vue';
import { useI18n } from 'dashboard/composables/useI18n';
const props = defineProps({
  attributeModel: {
    type: String,
    default: 'conversation_attribute',
  },
});

const { t } = useI18n();

const showEditPopup = ref(false);
const showDeletePopup = ref(false);
const selectedAttribute = ref({});

const getters = useStoreGetters();
const store = useStore();

const attributes = computed(() =>
  getters['attributes/getAttributesByModel'].value(props.attributeModel)
);
const uiFlags = computed(() => getters['attributes/getUIFlags'].value);

const attributeDisplayName = computed(
  () => selectedAttribute.value.attribute_display_name
);
const deleteConfirmText = computed(
  () =>
    `${t('ATTRIBUTES_MGMT.DELETE.CONFIRM.YES')} ${attributeDisplayName.value}`
);
const deleteRejectText = computed(() => t('ATTRIBUTES_MGMT.DELETE.CONFIRM.NO'));
const confirmDeleteTitle = computed(() =>
  t('ATTRIBUTES_MGMT.DELETE.CONFIRM.TITLE', {
    attributeName: attributeDisplayName.value,
  })
);
const confirmPlaceHolderText = computed(
  () =>
    `${t('ATTRIBUTES_MGMT.DELETE.CONFIRM.PLACE_HOLDER', {
      attributeName: attributeDisplayName.value,
    })}`
);

const deleteAttributes = async ({ id }) => {
  try {
    await store.dispatch('attributes/delete', id);
    useAlert(t('ATTRIBUTES_MGMT.DELETE.API.SUCCESS_MESSAGE'));
  } catch (error) {
    const errorMessage =
      error?.response?.message || t('ATTRIBUTES_MGMT.DELETE.API.ERROR_MESSAGE');
    useAlert(errorMessage);
  }
};
const openEditPopup = response => {
  showEditPopup.value = true;
  selectedAttribute.value = response;
};
const hideEditPopup = () => {
  showEditPopup.value = false;
};

const closeDelete = () => {
  showDeletePopup.value = false;
  selectedAttribute.value = {};
};
const confirmDeletion = () => {
  deleteAttributes(selectedAttribute.value);
  closeDelete();
};
const openDelete = value => {
  showDeletePopup.value = true;
  selectedAttribute.value = value;
};
</script>

<template>
  <div class="flex flex-col">
    <table class="min-w-full overflow-x-auto">
      <thead>
        <th
          v-for="tableHeader in $t('ATTRIBUTES_MGMT.LIST.TABLE_HEADER')"
          :key="tableHeader"
          class="py-4 ltr:pr-4 rtl:pl-4 text-left font-semibold text-slate-700 dark:text-slate-300"
        >
          {{ tableHeader }}
        </th>
      </thead>
      <tbody
        class="divide-y divide-slate-25 dark:divide-slate-800 flex-1 text-slate-700 dark:text-slate-100"
      >
        <tr v-for="attribute in attributes" :key="attribute.attribute_key">
          <td
            class="py-4 ltr:pr-4 rtl:pl-4 overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {{ attribute.attribute_display_name }}
          </td>
          <td class="py-4 ltr:pr-4 rtl:pl-4">
            {{ attribute.attribute_description }}
          </td>
          <td
            class="py-4 ltr:pr-4 rtl:pl-4 overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {{ attribute.attribute_display_type }}
          </td>
          <td
            class="py-4 ltr:pr-4 rtl:pl-4 attribute-key overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {{ attribute.attribute_key }}
          </td>
          <td class="py-4 min-w-xs">
            <div class="flex gap-1">
              <woot-button
                v-tooltip.top="$t('ATTRIBUTES_MGMT.LIST.BUTTONS.EDIT')"
                variant="smooth"
                size="tiny"
                color-scheme="secondary"
                class-names="grey-btn"
                icon="edit"
                @click="openEditPopup(attribute)"
              />
              <woot-button
                v-tooltip.top="$t('ATTRIBUTES_MGMT.LIST.BUTTONS.DELETE')"
                variant="smooth"
                color-scheme="alert"
                size="tiny"
                icon="dismiss-circle"
                class-names="grey-btn"
                @click="openDelete(attribute)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <woot-modal :show.sync="showEditPopup" :on-close="hideEditPopup">
      <EditAttribute
        :selected-attribute="selectedAttribute"
        :is-updating="uiFlags.isUpdating"
        @onClose="hideEditPopup"
      />
    </woot-modal>
    <woot-confirm-delete-modal
      v-if="showDeletePopup"
      :show.sync="showDeletePopup"
      :title="confirmDeleteTitle"
      :message="$t('ATTRIBUTES_MGMT.DELETE.CONFIRM.MESSAGE')"
      :confirm-text="deleteConfirmText"
      :reject-text="deleteRejectText"
      :confirm-value="selectedAttribute.attribute_display_name"
      :confirm-place-holder-text="confirmPlaceHolderText"
      @onConfirm="confirmDeletion"
      @onClose="closeDelete"
    />
  </div>
</template>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<script>
import { mapGetters } from 'vuex';
import { useAlert } from 'dashboard/composables';
import EditAttribute from './EditAttribute.vue';

export default {
  components: {
    EditAttribute,
  },
  data() {
    return {
      selectedTabIndex: 0,
      showEditPopup: false,
      showDeletePopup: false,
      selectedAttribute: {},
    };
  },
  computed: {
    ...mapGetters({
      uiFlags: 'attributes/getUIFlags',
    }),
    attributes() {
      const attributeModel = this.selectedTabIndex
        ? 'contact_attribute'
        : 'conversation_attribute';

      return this.$store.getters['attributes/getAttributesByModel'](
        attributeModel
      );
    },
    tabs() {
      return [
        {
          key: 0,
          name: this.$t('ATTRIBUTES_MGMT.TABS.CONVERSATION'),
        },
        {
          key: 1,
          name: this.$t('ATTRIBUTES_MGMT.TABS.CONTACT'),
        },
      ];
    },
    deleteConfirmText() {
      return `${this.$t('ATTRIBUTES_MGMT.DELETE.CONFIRM.YES')} ${
        this.selectedAttribute.attribute_display_name
      }`;
    },
    deleteRejectText() {
      return this.$t('ATTRIBUTES_MGMT.DELETE.CONFIRM.NO');
    },
    confirmDeleteTitle() {
      return this.$t('ATTRIBUTES_MGMT.DELETE.CONFIRM.TITLE', {
        attributeName: this.selectedAttribute.attribute_display_name,
      });
    },
    confirmPlaceHolderText() {
      return `${this.$t('ATTRIBUTES_MGMT.DELETE.CONFIRM.PLACE_HOLDER', {
        attributeName: this.selectedAttribute.attribute_display_name,
      })}`;
    },
  },
  mounted() {
    this.fetchAttributes(this.selectedTabIndex);
  },
  methods: {
    onClickTabChange(index) {
      this.selectedTabIndex = index;
      this.fetchAttributes(index);
    },
    fetchAttributes(index) {
      this.$store.dispatch('attributes/get', index);
    },
    async deleteAttributes({ id }) {
      try {
        await this.$store.dispatch('attributes/delete', id);
        useAlert(this.$t('ATTRIBUTES_MGMT.DELETE.API.SUCCESS_MESSAGE'));
      } catch (error) {
        const errorMessage =
          error?.response?.message ||
          this.$t('ATTRIBUTES_MGMT.DELETE.API.ERROR_MESSAGE');
        useAlert(errorMessage);
      }
    },
    openEditPopup(response) {
      this.showEditPopup = true;
      this.selectedAttribute = response;
    },
    hideEditPopup() {
      this.showEditPopup = false;
    },
    confirmDeletion() {
      this.deleteAttributes(this.selectedAttribute);
      this.closeDelete();
    },
    openDelete(value) {
      this.showDeletePopup = true;
      this.selectedAttribute = value;
    },
    closeDelete() {
      this.showDeletePopup = false;
      this.selectedAttribute = {};
    },
  },
};
</script>

>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<style lang="scss" scoped>
.attribute-key {
  font-family: monospace;
}
</style>
