<<<<<<< HEAD
<<<<<<< HEAD
<script>
import { useAlert } from 'dashboard/composables';
=======
<template>
  <div class="flex flex-col h-auto overflow-auto">
    <woot-modal-header
      :header-title="$t('SLA.ADD.TITLE')"
      :header-content="$t('SLA.ADD.DESC')"
    />
    <sla-form
      :submit-label="$t('SLA.FORM.CREATE')"
      @submit="addSLA"
      @close="onClose"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
<<<<<<< HEAD
>>>>>>> 84c380c8c (feat: Replace SLA `validationMixin` within the component (#9804))
=======
=======
<script>
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
import { useAlert } from 'dashboard/composables';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
import SlaForm from './SlaForm.vue';

export default {
  components: {
    SlaForm,
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  mixins: [alertMixin],
=======
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
  computed: {
    ...mapGetters({
      uiFlags: 'sla/getUIFlags',
    }),
  },
>>>>>>> 84c380c8c (feat: Replace SLA `validationMixin` within the component (#9804))
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
  methods: {
    onClose() {
      this.$emit('close');
    },
    async addSLA(payload) {
      try {
        await this.$store.dispatch('sla/create', payload);
        useAlert(this.$t('SLA.ADD.API.SUCCESS_MESSAGE'));
        this.onClose();
      } catch (error) {
        const errorMessage =
          error.message || this.$t('SLA.ADD.API.ERROR_MESSAGE');
        useAlert(errorMessage);
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col h-auto overflow-auto">
    <woot-modal-header
      :header-title="$t('SLA.ADD.TITLE')"
      :header-content="$t('SLA.ADD.DESC')"
    />
    <SlaForm
      :submit-label="$t('SLA.FORM.CREATE')"
      @submit="addSLA"
      @close="onClose"
    />
  </div>
</template>
