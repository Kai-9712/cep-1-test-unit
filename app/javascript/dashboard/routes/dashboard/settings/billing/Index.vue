<<<<<<< HEAD
<<<<<<< HEAD
=======
<template>
  <div class="flex-1 p-6 overflow-auto dark:bg-slate-900">
    <woot-loading-state v-if="uiFlags.isFetchingItem" />
    <div v-else-if="!hasABillingPlan">
      <p>{{ $t('BILLING_SETTINGS.NO_BILLING_USER') }}</p>
    </div>
    <div v-else class="w-full">
      <div class="current-plan--details">
        <h6>{{ $t('BILLING_SETTINGS.CURRENT_PLAN.TITLE') }}</h6>
        <div
          v-dompurify-html="
            formatMessage(
              $t('BILLING_SETTINGS.CURRENT_PLAN.PLAN_NOTE', {
                plan: planName,
                quantity: subscribedQuantity,
              })
            )
          "
        />
      </div>
      <billing-item
        :title="$t('BILLING_SETTINGS.MANAGE_SUBSCRIPTION.TITLE')"
        :description="$t('BILLING_SETTINGS.MANAGE_SUBSCRIPTION.DESCRIPTION')"
        :button-label="$t('BILLING_SETTINGS.MANAGE_SUBSCRIPTION.BUTTON_TXT')"
        @click="onClickBillingPortal"
      />
      <billing-item
        :title="$t('BILLING_SETTINGS.CHAT_WITH_US.TITLE')"
        :description="$t('BILLING_SETTINGS.CHAT_WITH_US.DESCRIPTION')"
        :button-label="$t('BILLING_SETTINGS.CHAT_WITH_US.BUTTON_TXT')"
        button-icon="chat-multiple"
        @click="onToggleChatWindow"
      />
    </div>
  </div>
</template>

>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<script>
import { useMessageFormatter } from 'shared/composables/useMessageFormatter';

import { mapGetters } from 'vuex';
<<<<<<< HEAD
<<<<<<< HEAD
import { useAccount } from 'dashboard/composables/useAccount';
=======
import accountMixin from '../../../../mixins/account';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
import { useAccount } from 'dashboard/composables/useAccount';
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
import BillingItem from './components/BillingItem.vue';

export default {
  components: { BillingItem },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
  mixins: [messageFormatterMixin],
=======
>>>>>>> f82ec3b88 (chore: Repalce message formatter mixin with useMessageFormatter [CW-3470] (#9986))
  setup() {
    const { accountId } = useAccount();
    const { formatMessage } = useMessageFormatter();
    return {
      accountId,
      formatMessage,
    };
  },
<<<<<<< HEAD
=======
  mixins: [accountMixin, messageFormatterMixin],
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
  computed: {
    ...mapGetters({
      getAccount: 'accounts/getAccount',
      uiFlags: 'accounts/getUIFlags',
    }),
    currentAccount() {
      return this.getAccount(this.accountId) || {};
    },
    customAttributes() {
      return this.currentAccount.custom_attributes || {};
    },
    hasABillingPlan() {
      return !!this.planName;
    },
    planName() {
      return this.customAttributes.plan_name || '';
    },
    subscribedQuantity() {
      return this.customAttributes.subscribed_quantity || 0;
    },
  },
  mounted() {
    this.fetchAccountDetails();
  },
  methods: {
    async fetchAccountDetails() {
      if (!this.hasABillingPlan) {
        this.$store.dispatch('accounts/subscription');
      }
    },
    onClickBillingPortal() {
      this.$store.dispatch('accounts/checkout');
    },
    onToggleChatWindow() {
      if (window.$chatwoot) {
        window.$chatwoot.toggle();
      }
    },
  },
};
</script>

<template>
  <div class="flex-1 p-6 overflow-auto dark:bg-slate-900">
    <woot-loading-state v-if="uiFlags.isFetchingItem" />
    <div v-else-if="!hasABillingPlan">
      <p>{{ $t('BILLING_SETTINGS.NO_BILLING_USER') }}</p>
    </div>
    <div v-else class="w-full">
      <div class="current-plan--details">
        <h6>{{ $t('BILLING_SETTINGS.CURRENT_PLAN.TITLE') }}</h6>
        <div
          v-dompurify-html="
            formatMessage(
              $t('BILLING_SETTINGS.CURRENT_PLAN.PLAN_NOTE', {
                plan: planName,
                quantity: subscribedQuantity,
              })
            )
          "
        />
      </div>
      <BillingItem
        :title="$t('BILLING_SETTINGS.MANAGE_SUBSCRIPTION.TITLE')"
        :description="$t('BILLING_SETTINGS.MANAGE_SUBSCRIPTION.DESCRIPTION')"
        :button-label="$t('BILLING_SETTINGS.MANAGE_SUBSCRIPTION.BUTTON_TXT')"
        @click="onClickBillingPortal"
      />
      <BillingItem
        :title="$t('BILLING_SETTINGS.CHAT_WITH_US.TITLE')"
        :description="$t('BILLING_SETTINGS.CHAT_WITH_US.DESCRIPTION')"
        :button-label="$t('BILLING_SETTINGS.CHAT_WITH_US.BUTTON_TXT')"
        button-icon="chat-multiple"
        @click="onToggleChatWindow"
      />
    </div>
  </div>
</template>

<style lang="scss">
.manage-subscription {
  @apply bg-white dark:bg-slate-800 flex justify-between mb-2 py-6 px-4 items-center rounded-md border border-solid border-slate-75 dark:border-slate-700;
}

.current-plan--details {
  @apply border-b border-solid border-slate-75 dark:border-slate-800 mb-4 pb-4;

  h6 {
    @apply text-slate-800 dark:text-slate-100;
  }

  p {
    @apply text-slate-600 dark:text-slate-200;
  }
}

.manage-subscription {
  .manage-subscription--description {
    @apply mb-0 text-slate-600 dark:text-slate-200;
  }

  h6 {
    @apply text-slate-800 dark:text-slate-100;
  }
}
</style>
