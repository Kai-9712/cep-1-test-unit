<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import { useAdmin } from 'dashboard/composables/useAdmin';
<<<<<<< HEAD
<<<<<<< HEAD
import { useUISettings } from 'dashboard/composables/useUISettings';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
<<<<<<< HEAD
=======
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
import { useUISettings } from 'dashboard/composables/useUISettings';
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
=======
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
import AICTAModal from './AICTAModal.vue';
import AIAssistanceModal from './AIAssistanceModal.vue';
import aiMixin from 'dashboard/mixins/aiMixin';
import { CMD_AI_ASSIST } from 'dashboard/routes/dashboard/commands/commandBarBusEvents';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import keyboardEventListenerMixins from 'shared/mixins/keyboardEventListenerMixins';
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
=======
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
import AIAssistanceCTAButton from './AIAssistanceCTAButton.vue';

export default {
  components: {
    AIAssistanceModal,
    AICTAModal,
    AIAssistanceCTAButton,
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  mixins: [aiMixin],
  setup(props, { emit }) {
    const { uiSettings, updateUISettings } = useUISettings();

    const { isAdmin } = useAdmin();

    const aiAssistanceButtonRef = ref(null);
    const initialMessage = ref('');

    const initializeMessage = draftMessage => {
      initialMessage.value = draftMessage;
    };
    const keyboardEvents = {
      '$mod+KeyZ': {
        action: () => {
          if (initialMessage.value) {
            emit('replaceText', initialMessage.value);
            initialMessage.value = '';
          }
        },
        allowOnFocusedInput: true,
      },
    };
    useKeyboardEvents(keyboardEvents, aiAssistanceButtonRef);

    return {
      uiSettings,
      updateUISettings,
      isAdmin,
      aiAssistanceButtonRef,
      initialMessage,
      initializeMessage,
=======
  mixins: [aiMixin, keyboardEventListenerMixins, uiSettingsMixin],
=======
  mixins: [aiMixin, keyboardEventListenerMixins],
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
  setup() {
=======
  mixins: [aiMixin],
  setup(props, { emit }) {
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
    const { uiSettings, updateUISettings } = useUISettings();

    const { isAdmin } = useAdmin();

    const aiAssistanceButtonRef = ref(null);
    const initialMessage = ref('');

    const initializeMessage = draftMessage => {
      initialMessage.value = draftMessage;
    };
    const keyboardEvents = {
      '$mod+KeyZ': {
        action: () => {
          if (initialMessage.value) {
            emit('replaceText', initialMessage.value);
            initialMessage.value = '';
          }
        },
        allowOnFocusedInput: true,
      },
    };
    useKeyboardEvents(keyboardEvents, aiAssistanceButtonRef);

    return {
      uiSettings,
      updateUISettings,
      isAdmin,
<<<<<<< HEAD
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
      aiAssistanceButtonRef,
      initialMessage,
      initializeMessage,
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
    };
  },
  data: () => ({
    showAIAssistanceModal: false,
    showAICtaModal: false,
    aiOption: '',
  }),
  computed: {
    ...mapGetters({
      isAChatwootInstance: 'globalConfig/isAChatwootInstance',
    }),
    isAICTAModalDismissed() {
      return this.uiSettings.is_open_ai_cta_modal_dismissed;
    },
    // Display a AI CTA button for admins if the AI integration has not been added yet and the AI assistance modal has not been dismissed.
    shouldShowAIAssistCTAButtonForAdmin() {
      return (
        this.isAdmin &&
        !this.isAIIntegrationEnabled &&
        !this.isAICTAModalDismissed &&
        this.isAChatwootInstance
      );
    },
    // Display a AI CTA button for agents and other admins who have not yet opened the AI assistance modal.
    shouldShowAIAssistCTAButton() {
      return this.isAIIntegrationEnabled && !this.isAICTAModalDismissed;
    },
  },

  mounted() {
    this.$emitter.on(CMD_AI_ASSIST, this.onAIAssist);
    this.initializeMessage(this.draftMessage);
  },

  methods: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    getKeyboardEvents() {
      return {
        '$mod+KeyZ': {
          action: () => {
            if (this.initialMessage) {
              this.$emit('replaceText', this.initialMessage);
              this.initialMessage = '';
            }
          },
        },
      };
    },
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
    hideAIAssistanceModal() {
      this.recordAnalytics('DISMISS_AI_SUGGESTION', {
        aiOption: this.aiOption,
      });
      this.showAIAssistanceModal = false;
    },
    openAIAssist() {
      // Dismiss the CTA modal if it is not dismissed
      if (!this.isAICTAModalDismissed) {
        this.updateUISettings({
          is_open_ai_cta_modal_dismissed: true,
        });
      }
      this.initializeMessage(this.draftMessage);
      const ninja = document.querySelector('ninja-keys');
      ninja.open({ parent: 'ai_assist' });
    },
    hideAICtaModal() {
      this.showAICtaModal = false;
    },
    openAICta() {
      this.showAICtaModal = true;
    },
    onAIAssist(option) {
      this.aiOption = option;
      this.showAIAssistanceModal = true;
    },
    insertText(message) {
      this.$emit('replaceText', message);
    },
  },
};
</script>

<template>
<<<<<<< HEAD
<<<<<<< HEAD
  <div ref="aiAssistanceButtonRef">
=======
  <div v-if="!isFetchingAppIntegrations">
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
  <div ref="aiAssistanceButtonRef">
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
    <div v-if="isAIIntegrationEnabled" class="relative">
      <AIAssistanceCTAButton
        v-if="shouldShowAIAssistCTAButton"
        @click="openAIAssist"
      />
      <woot-button
        v-else
        v-tooltip.top-end="$t('INTEGRATION_SETTINGS.OPEN_AI.AI_ASSIST')"
        icon="wand"
        color-scheme="secondary"
        variant="smooth"
        size="small"
        @click="openAIAssist"
      />
      <woot-modal
        :show.sync="showAIAssistanceModal"
        :on-close="hideAIAssistanceModal"
      >
        <AIAssistanceModal
          :ai-option="aiOption"
          @applyText="insertText"
          @close="hideAIAssistanceModal"
        />
      </woot-modal>
    </div>
    <div v-else-if="shouldShowAIAssistCTAButtonForAdmin" class="relative">
      <AIAssistanceCTAButton @click="openAICta" />
      <woot-modal :show.sync="showAICtaModal" :on-close="hideAICtaModal">
        <AICTAModal @close="hideAICtaModal" />
      </woot-modal>
    </div>
  </div>
</template>
