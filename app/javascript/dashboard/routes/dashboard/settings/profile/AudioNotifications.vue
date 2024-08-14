<script>
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { mapGetters } from 'vuex';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
import { useAlert } from 'dashboard/composables';
import { useUISettings } from 'dashboard/composables/useUISettings';
import AudioAlertTone from './AudioAlertTone.vue';
import AudioAlertEvent from './AudioAlertEvent.vue';
import AudioAlertCondition from './AudioAlertCondition.vue';

export default {
  components: {
    AudioAlertEvent,
    AudioAlertTone,
    AudioAlertCondition,
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
  mixins: [configMixin],
=======
>>>>>>> dd8abe975 (feat: Rewrite `configMixin` to a composable (#9921))
  setup() {
    const { uiSettings, updateUISettings } = useUISettings();

    return {
      uiSettings,
      updateUISettings,
    };
  },
<<<<<<< HEAD
=======
  mixins: [configMixin, uiSettingsMixin],
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
  data() {
    return {
      audioAlert: '',
      playAudioWhenTabIsInactive: false,
      alertIfUnreadConversationExist: false,
      alertTone: 'ding',
      audioAlertConditions: [],
    };
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  computed: {
    ...mapGetters({
      accountId: 'getCurrentAccountId',
    }),
  },
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
  watch: {
    uiSettings(value) {
      this.notificationUISettings(value);
    },
  },
  mounted() {
    this.notificationUISettings(this.uiSettings);
    this.$store.dispatch('userNotificationSettings/get');
  },
  methods: {
    notificationUISettings(uiSettings) {
      const {
        enable_audio_alerts: audioAlert = '',
        always_play_audio_alert: alwaysPlayAudioAlert,
        alert_if_unread_assigned_conversation_exist:
          alertIfUnreadConversationExist,
        notification_tone: alertTone,
      } = uiSettings;
      this.audioAlert = audioAlert;
      this.playAudioWhenTabIsInactive = !alwaysPlayAudioAlert;
      this.alertIfUnreadConversationExist = alertIfUnreadConversationExist;
      this.audioAlertConditions = [
        {
          id: 'audio1',
          label: this.$t(
            'PROFILE_SETTINGS.FORM.AUDIO_NOTIFICATIONS_SECTION.CONDITIONS.CONDITION_ONE'
          ),
          model: this.playAudioWhenTabIsInactive,
          value: 'tab_is_inactive',
        },
        {
          id: 'audio2',
          label: this.$t(
            'PROFILE_SETTINGS.FORM.AUDIO_NOTIFICATIONS_SECTION.CONDITIONS.CONDITION_TWO'
          ),
          model: this.alertIfUnreadConversationExist,
          value: 'conversations_are_read',
        },
      ];
      this.alertTone = alertTone || 'ding';
    },
    handAudioAlertChange(value) {
      this.audioAlert = value;
      this.updateUISettings({
        enable_audio_alerts: this.audioAlert,
      });
      useAlert(this.$t('PROFILE_SETTINGS.FORM.API.UPDATE_SUCCESS'));
    },
    handleAudioAlertConditions(id, value) {
      if (id === 'tab_is_inactive') {
        this.updateUISettings({
          always_play_audio_alert: !value,
        });
      } else if (id === 'conversations_are_read') {
        this.updateUISettings({
          alert_if_unread_assigned_conversation_exist: value,
        });
      }
      useAlert(this.$t('PROFILE_SETTINGS.FORM.API.UPDATE_SUCCESS'));
    },
    handleAudioToneChange(value) {
      this.updateUISettings({ notification_tone: value });
      useAlert(this.$t('PROFILE_SETTINGS.FORM.API.UPDATE_SUCCESS'));
    },
  },
};
</script>

<template>
  <div id="profile-settings-notifications" class="flex flex-col gap-6">
    <AudioAlertTone
      :value="alertTone"
      :label="
        $t(
          'PROFILE_SETTINGS.FORM.AUDIO_NOTIFICATIONS_SECTION.DEFAULT_TONE.TITLE'
        )
      "
      @change="handleAudioToneChange"
    />

    <AudioAlertEvent
      :label="
        $t('PROFILE_SETTINGS.FORM.AUDIO_NOTIFICATIONS_SECTION.ALERT_TYPE.TITLE')
      "
      :value="audioAlert"
      @update="handAudioAlertChange"
    />

    <AudioAlertCondition
      :items="audioAlertConditions"
      :label="
        $t('PROFILE_SETTINGS.FORM.AUDIO_NOTIFICATIONS_SECTION.CONDITIONS.TITLE')
      "
      @change="handleAudioAlertConditions"
    />
  </div>
</template>
