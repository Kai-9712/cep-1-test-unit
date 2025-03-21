<!-- eslint-disable vue/v-slot-style -->
<script>
import { mapGetters } from 'vuex';
import { useAlert } from 'dashboard/composables';
import { useIntegrationHook } from 'dashboard/composables/useIntegrationHook';

export default {
  props: {
    integrationId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { integration, isHookTypeInbox } = useIntegrationHook(
      props.integrationId
    );

    return { integration, isHookTypeInbox };
  },
  data() {
    return {
      endPoint: '',
      alertMessage: '',
      values: {},
    };
  },
  computed: {
    ...mapGetters({
      uiFlags: 'integrations/getUIFlags',
      dialogFlowEnabledInboxes: 'inboxes/dialogFlowEnabledInboxes',
    }),
    inboxes() {
      return this.dialogFlowEnabledInboxes
        .filter(inbox => {
          if (!this.isIntegrationDialogflow && !this.isIntegrationDialogflowCX) {
            return true;
          }
          return !this.connectedDialogflowInboxIds.includes(inbox.id);
        })
        .map(inbox => ({ label: inbox.name, value: inbox.id }));
    },

    connectedDialogflowInboxIds() {
      if (!this.isIntegrationDialogflow && !this.isIntegrationDialogflowCX) {
        return [];
      }
      return this.integration.hooks.map(hook => hook.inbox?.id);
    },
    formItems() {
      return this.integration.settings_form_schema;
    },
    isIntegrationDialogflow() {
      return this.integration.id === 'dialogflow';
    },
    isIntegrationDialogflowCX() {
      return this.integration.id === 'dialogflow_cx';
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    buildHookPayload() {
      const hookPayload = {
        app_id: this.integration.id,
        settings: {},
      };

      hookPayload.settings = Object.keys(this.values).reduce((acc, key) => {
        if (key !== 'inbox') {
          acc[key] = this.values[key];
        }
        return acc;
      }, {});

      this.formItems.forEach(item => {
        if (item.validation.includes('JSON')) {
          hookPayload.settings[item.name] = JSON.parse(
            hookPayload.settings[item.name]
          );
        }
      });

      if (this.isHookTypeInbox && this.values.inbox) {
        hookPayload.inbox_id = this.values.inbox;
      }

      return hookPayload;
    },
    async submitForm() {
      try {
        await this.$store.dispatch(
          'integrations/createHook',
          this.buildHookPayload()
        );
        this.alertMessage = this.$t('INTEGRATION_APPS.ADD.API.SUCCESS_MESSAGE');
        this.onClose();
      } catch (error) {
        const errorMessage = error?.response?.data?.message;
        this.alertMessage =
          errorMessage || this.$t('INTEGRATION_APPS.ADD.API.ERROR_MESSAGE');
      } finally {
        useAlert(this.alertMessage);
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col h-auto overflow-auto integration-hooks">
    <woot-modal-header
      :header-title="integration.name"
      :header-content="integration.description"
    />
    <formulate-form
      v-slot="{ hasErrors }"
      v-model="values"
      class="w-full"
      @submit="submitForm"
    >
      <formulate-input
        v-for="item in formItems"
        :key="item.name"
        v-bind="item"
      />
      <formulate-input
        v-if="isHookTypeInbox"
        :options="inboxes"
        type="select"
        name="inbox"
        :placeholder="$t('INTEGRATION_APPS.ADD.FORM.INBOX.LABEL')"
        :label="$t('INTEGRATION_APPS.ADD.FORM.INBOX.PLACEHOLDER')"
        validation="required"
        validation-name="Inbox"
      />
      <div class="flex flex-row justify-end w-full gap-2 px-0 py-2">
        <woot-button :disabled="hasErrors" :loading="uiFlags.isCreatingHook">
          {{ $t('INTEGRATION_APPS.ADD.FORM.SUBMIT') }}
        </woot-button>
        <woot-button class="button clear" @click.prevent="onClose">
          {{ $t('INTEGRATION_APPS.ADD.FORM.CANCEL') }}
        </woot-button>
      </div>
    </formulate-form>
  </div>
</template>
