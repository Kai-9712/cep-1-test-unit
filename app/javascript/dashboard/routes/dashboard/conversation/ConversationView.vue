<<<<<<< HEAD
<template>
  <section class="bg-white conversation-page dark:bg-slate-900">
    <chat-list
      :show-conversation-list="showConversationList"
      :conversation-inbox="inboxId"
      :label="label"
      :team-id="teamId"
      :conversation-type="conversationType"
      :folders-id="foldersId"
      :is-on-expanded-layout="isOnExpandedLayout"
      @conversation-load="onConversationLoad"
    >
      <pop-over-search
        :is-on-expanded-layout="isOnExpandedLayout"
        @toggle-conversation-layout="toggleConversationLayout"
      />
    </chat-list>
    <conversation-box
      v-if="showMessageView"
      :inbox-id="inboxId"
      :is-contact-panel-open="isContactPanelOpen"
      :is-on-expanded-layout="isOnExpandedLayout"
      @contact-panel-toggle="onToggleContactPanel"
    />
  </section>
</template>

=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<script>
import { mapGetters } from 'vuex';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useAlert } from 'dashboard/composables';
import { useUISettings } from 'dashboard/composables/useUISettings';
<<<<<<< HEAD
=======
import { useAlert } from 'dashboard/composables';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
import { getUnixTime } from 'date-fns';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
import ChatList from '../../../components/ChatList.vue';
import ConversationBox from '../../../components/widgets/conversation/ConversationBox.vue';
import PopOverSearch from './search/PopOverSearch.vue';
<<<<<<< HEAD
<<<<<<< HEAD
import uiSettingsMixin from 'dashboard/mixins/uiSettings';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
import CustomSnoozeModal from 'dashboard/components/CustomSnoozeModal.vue';
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
=======
import { useUISettings } from 'dashboard/composables/useUISettings';
import ChatList from '../../../components/ChatList.vue';
import ConversationBox from '../../../components/widgets/conversation/ConversationBox.vue';
import PopOverSearch from './search/PopOverSearch.vue';
>>>>>>> 646cfb97e (fix: Snooze conversation not working in Inbox view (#9875))
=======
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
import CustomSnoozeModal from 'dashboard/components/CustomSnoozeModal.vue';
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
import wootConstants from 'dashboard/constants/globals';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
import { BUS_EVENTS } from 'shared/constants/busEvents';
<<<<<<< HEAD
import wootConstants from 'dashboard/constants/globals';
=======
import CmdBarConversationSnooze from 'dashboard/routes/dashboard/commands/CmdBarConversationSnooze.vue';
>>>>>>> 646cfb97e (fix: Snooze conversation not working in Inbox view (#9875))

export default {
  components: {
    ChatList,
    ConversationBox,
    PopOverSearch,
<<<<<<< HEAD
=======
    CmdBarConversationSnooze,
>>>>>>> 646cfb97e (fix: Snooze conversation not working in Inbox view (#9875))
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  mixins: [uiSettingsMixin],
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> fb99ba7b4 (feat: Rewrite `uiSettings` mixin to a composable (#9819))
  props: {
    inboxId: {
      type: [String, Number],
      default: 0,
    },
    conversationId: {
      type: [String, Number],
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    teamId: {
      type: String,
      default: '',
    },
    conversationType: {
      type: String,
      default: '',
    },
    foldersId: {
      type: [String, Number],
      default: 0,
    },
  },
  setup() {
    const { uiSettings, updateUISettings } = useUISettings();

    return {
      uiSettings,
      updateUISettings,
    };
  },
  data() {
    return {
      showSearchModal: false,
    };
  },
  computed: {
    ...mapGetters({
      chatList: 'getAllConversations',
      currentChat: 'getSelectedChat',
    }),
    showConversationList() {
      return this.isOnExpandedLayout ? !this.conversationId : true;
    },
    showMessageView() {
      return this.conversationId ? true : !this.isOnExpandedLayout;
    },
    isOnExpandedLayout() {
      const {
        LAYOUT_TYPES: { CONDENSED },
      } = wootConstants;
      const { conversation_display_type: conversationDisplayType = CONDENSED } =
        this.uiSettings;
      return conversationDisplayType !== CONDENSED;
    },
    isContactPanelOpen() {
      if (this.currentChat.id) {
        const { is_contact_sidebar_open: isContactSidebarOpen } =
          this.uiSettings;
        return isContactSidebarOpen;
      }
      return false;
    },
  },
  watch: {
    conversationId() {
      this.fetchConversationIfUnavailable();
    },
  },
  mounted() {
    this.$store.dispatch('agents/get');
    this.initialize();
    this.$watch('$store.state.route', () => this.initialize());
    this.$watch('chatList.length', () => {
      this.setActiveChat();
    });
  },

  methods: {
    onConversationLoad() {
      this.fetchConversationIfUnavailable();
    },
    initialize() {
      this.$store.dispatch('setActiveInbox', this.inboxId);
      this.setActiveChat();
    },
    toggleConversationLayout() {
      const { LAYOUT_TYPES } = wootConstants;
      const {
        conversation_display_type:
          conversationDisplayType = LAYOUT_TYPES.CONDENSED,
      } = this.uiSettings;
      const newViewType =
        conversationDisplayType === LAYOUT_TYPES.CONDENSED
          ? LAYOUT_TYPES.EXPANDED
          : LAYOUT_TYPES.CONDENSED;
      this.updateUISettings({
        conversation_display_type: newViewType,
        previously_used_conversation_display_type: newViewType,
      });
    },
    fetchConversationIfUnavailable() {
      if (!this.conversationId) {
        return;
      }
      const chat = this.findConversation();
      if (!chat) {
        this.$store.dispatch('getConversation', this.conversationId);
      }
    },
    findConversation() {
      const conversationId = parseInt(this.conversationId, 10);
      const [chat] = this.chatList.filter(c => c.id === conversationId);
      return chat;
    },
    setActiveChat() {
      if (this.conversationId) {
        const selectedConversation = this.findConversation();
        // If conversation doesn't exist or selected conversation is same as the active
        // conversation, don't set active conversation.
        if (
          !selectedConversation ||
          selectedConversation.id === this.currentChat.id
        ) {
          return;
        }
        const { messageId } = this.$route.query;
        this.$store
          .dispatch('setActiveChat', {
            data: selectedConversation,
            after: messageId,
          })
          .then(() => {
            this.$emitter.emit(BUS_EVENTS.SCROLL_TO_MESSAGE, { messageId });
          });
      } else {
        this.$store.dispatch('clearSelectedState');
      }
    },
    onToggleContactPanel() {
      this.updateUISettings({
        is_contact_sidebar_open: !this.isContactPanelOpen,
      });
    },
    onSearch() {
      this.showSearchModal = true;
    },
    closeSearch() {
      this.showSearchModal = false;
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
    onCmdSnoozeConversation(snoozeType) {
      if (snoozeType === wootConstants.SNOOZE_OPTIONS.UNTIL_CUSTOM_TIME) {
        this.showCustomSnoozeModal = true;
      } else {
        this.toggleStatus(
          wootConstants.STATUS_TYPE.SNOOZED,
          findSnoozeTime(snoozeType) || null
        );
      }
    },
    chooseSnoozeTime(customSnoozeTime) {
      this.showCustomSnoozeModal = false;
      if (customSnoozeTime) {
        this.toggleStatus(
          wootConstants.STATUS_TYPE.SNOOZED,
          getUnixTime(customSnoozeTime)
        );
      }
    },
    toggleStatus(status, snoozedUntil) {
      this.$store
        .dispatch('toggleStatus', {
          conversationId: this.currentChat?.id || this.contextMenuChatId,
          status,
          snoozedUntil,
        })
        .then(() => {
          this.$store.dispatch('setContextMenuChatId', null);
          useAlert(this.$t('CONVERSATION.CHANGE_STATUS'));
        });
    },
    hideCustomSnoozeModal() {
      // if we select custom snooze and the custom snooze modal is open
      // Then if the custom snooze modal is closed then set the context menu chat id to null
      this.$store.dispatch('setContextMenuChatId', null);
      this.showCustomSnoozeModal = false;
    },
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> 646cfb97e (fix: Snooze conversation not working in Inbox view (#9875))
  },
};
</script>

<template>
  <section class="bg-white conversation-page dark:bg-slate-900">
    <ChatList
      :show-conversation-list="showConversationList"
      :conversation-inbox="inboxId"
      :label="label"
      :team-id="teamId"
      :conversation-type="conversationType"
      :folders-id="foldersId"
      :is-on-expanded-layout="isOnExpandedLayout"
      @conversationLoad="onConversationLoad"
    >
      <PopOverSearch
        :is-on-expanded-layout="isOnExpandedLayout"
        @toggleConversationLayout="toggleConversationLayout"
      />
    </ChatList>
    <ConversationBox
      v-if="showMessageView"
      :inbox-id="inboxId"
      :is-contact-panel-open="isContactPanelOpen"
      :is-on-expanded-layout="isOnExpandedLayout"
      @contactPanelToggle="onToggleContactPanel"
    />
    <CmdBarConversationSnooze />
  </section>
</template>

<style lang="scss" scoped>
.conversation-page {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
