<script>
import Banner from 'dashboard/components/ui/Banner.vue';
import { mapGetters } from 'vuex';
<<<<<<< HEAD
=======
import accountMixin from 'dashboard/mixins/account';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
import { useAlert } from 'dashboard/composables';

export default {
  components: { Banner },
<<<<<<< HEAD
=======
  mixins: [accountMixin],
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
    bannerMessage() {
      return this.$t('APP_GLOBAL.EMAIL_VERIFICATION_PENDING');
    },
    actionButtonMessage() {
      return this.$t('APP_GLOBAL.RESEND_VERIFICATION_MAIL');
    },
    shouldShowBanner() {
      return !this.currentUser.confirmed;
    },
  },
  methods: {
    resendVerificationEmail() {
      this.$store.dispatch('resendConfirmation');
      useAlert(this.$t('APP_GLOBAL.EMAIL_VERIFICATION_SENT'));
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
    action-button-icon="mail"
    has-action-button
    @click="resendVerificationEmail"
  />
</template>
