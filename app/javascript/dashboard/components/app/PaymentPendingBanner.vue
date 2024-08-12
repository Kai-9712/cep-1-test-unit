<script>
import { mapGetters } from 'vuex';
import { useAdmin } from 'dashboard/composables/useAdmin';
<<<<<<< HEAD
<<<<<<< HEAD
import { useAccount } from 'dashboard/composables/useAccount';
import Banner from 'dashboard/components/ui/Banner.vue';
=======
import Banner from 'dashboard/components/ui/Banner.vue';
import accountMixin from 'dashboard/mixins/account';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
import { useAccount } from 'dashboard/composables/useAccount';
import Banner from 'dashboard/components/ui/Banner.vue';
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))

const EMPTY_SUBSCRIPTION_INFO = {
  status: null,
  endsOn: null,
};

export default {
  components: { Banner },
<<<<<<< HEAD
<<<<<<< HEAD
  setup() {
    const { isAdmin } = useAdmin();

    const { accountId } = useAccount();

    return {
      accountId,
=======
  mixins: [accountMixin],
=======
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
  setup() {
    const { isAdmin } = useAdmin();

    const { accountId } = useAccount();

    return {
<<<<<<< HEAD
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
      accountId,
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
      isAdmin,
    };
  },
  computed: {
    ...mapGetters({
      isOnChatwootCloud: 'globalConfig/isOnChatwootCloud',
      getAccount: 'accounts/getAccount',
    }),
    bannerMessage() {
      return this.$t('GENERAL_SETTINGS.PAYMENT_PENDING');
    },
    actionButtonMessage() {
      return this.$t('GENERAL_SETTINGS.OPEN_BILLING');
    },
    shouldShowBanner() {
      if (!this.isOnChatwootCloud) {
        return false;
      }

      if (!this.isAdmin) {
        return false;
      }

      return this.isPaymentPending();
    },
  },
  methods: {
    routeToBilling() {
      this.$router.push({
        name: 'billing_settings_index',
        params: { accountId: this.accountId },
      });
    },
    isPaymentPending() {
      const { status, endsOn } = this.getSubscriptionInfo();

      if (status && endsOn) {
        const now = new Date();
        if (status === 'past_due' && endsOn < now) {
          return true;
        }
      }

      return false;
    },
    getSubscriptionInfo() {
      const account = this.getAccount(this.accountId);
      if (!account) return EMPTY_SUBSCRIPTION_INFO;

      const { custom_attributes: subscription } = account;
      if (!subscription) return EMPTY_SUBSCRIPTION_INFO;

      const { subscription_status: status, subscription_ends_on: endsOn } =
        subscription;

      return { status, endsOn: new Date(endsOn) };
    },
  },
};
</script>

<template>
  <Banner
    v-if="shouldShowBanner"
    color-scheme="alert"
    :banner-message="bannerMessage"
    :action-button-label="actionButtonMessage"
    has-action-button
    @click="routeToBilling"
  />
</template>
