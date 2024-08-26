<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
<!-- eslint-disable vue/attribute-hyphenation -->
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
>>>>>>> 646cfb97e (fix: Snooze conversation not working in Inbox view (#9875))
<script>
=======
<script setup>
>>>>>>> 7f8d718da (feat: Rewrite command bar mixin to a composable (#10015))
import '@chatwoot/ninja-keys';
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useStore } from 'dashboard/composables/store';
import { useTrack } from 'dashboard/composables';
import { useI18n } from 'dashboard/composables/useI18n';
import { useAppearanceHotKeys } from 'dashboard/composables/commands/useAppearanceHotKeys';
import { useInboxHotKeys } from 'dashboard/composables/commands/useInboxHotKeys';
import { useGoToCommandHotKeys } from 'dashboard/composables/commands/useGoToCommandHotKeys';
import { useBulkActionsHotKeys } from 'dashboard/composables/commands/useBulkActionsHotKeys';
import { useConversationHotKeys } from 'dashboard/composables/commands/useConversationHotKeys';
import wootConstants from 'dashboard/constants/globals';
<<<<<<< HEAD
import conversationHotKeysMixin from './conversationHotKeys';
import bulkActionsHotKeysMixin from './bulkActionsHotKeys';
import inboxHotKeysMixin from './inboxHotKeys';
import goToCommandHotKeys from './goToCommandHotKeys';
import appearanceHotKeys from './appearanceHotKeys';
<<<<<<< HEAD
import agentMixin from 'dashboard/mixins/agentMixin';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import conversationLabelMixin from 'dashboard/mixins/conversation/labelMixin';
<<<<<<< HEAD
import conversationTeamMixin from 'dashboard/mixins/conversation/teamMixin';
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> d5f34bf9d (feat: Replace `conversation/teamMixin` within the components (#9923))
=======
>>>>>>> 4c6572c2c (feat: Rewrite `conversation/labelMixin` to a composable (#9936))
=======
>>>>>>> c63a6ed8e (feat: Rewrite `agentMixin` to a helper (#9940))
import { GENERAL_EVENTS } from '../../../helper/AnalyticsHelper/events';

export default {
  mixins: [
    conversationHotKeysMixin,
    bulkActionsHotKeysMixin,
    inboxHotKeysMixin,
<<<<<<< HEAD
<<<<<<< HEAD
=======
    conversationLabelMixin,
>>>>>>> d5f34bf9d (feat: Replace `conversation/teamMixin` within the components (#9923))
=======
>>>>>>> 4c6572c2c (feat: Rewrite `conversation/labelMixin` to a composable (#9936))
    appearanceHotKeys,
    goToCommandHotKeys,
  ],
  setup() {
    // used in conversationHotKeysMixin
    const {
      activeLabels,
      inactiveLabels,
      addLabelToConversation,
      removeLabelFromConversation,
    } = useConversationLabels();
=======
import { GENERAL_EVENTS } from 'dashboard/helper/AnalyticsHelper/events';

const store = useStore();
const track = useTrack();
const { t } = useI18n();
>>>>>>> 7f8d718da (feat: Rewrite command bar mixin to a composable (#10015))

const ninjakeys = ref(null);

// Added selectedSnoozeType to track the selected snooze type
// So if the selected snooze type is "custom snooze" then we set selectedSnoozeType with the CMD action id
// So that we can track the selected snooze type and when we close the command bar
const selectedSnoozeType = ref(null);

const { goToAppearanceHotKeys } = useAppearanceHotKeys();
const { inboxHotKeys } = useInboxHotKeys();
const { goToCommandHotKeys } = useGoToCommandHotKeys();
const { bulkActionsHotKeys } = useBulkActionsHotKeys();
const { conversationHotKeys } = useConversationHotKeys();

const placeholder = computed(() => t('COMMAND_BAR.SEARCH_PLACEHOLDER'));

const hotKeys = computed(() => [
  ...inboxHotKeys.value,
  ...goToCommandHotKeys.value,
  ...goToAppearanceHotKeys.value,
  ...bulkActionsHotKeys.value,
  ...conversationHotKeys.value,
]);

const setCommandBarData = () => {
  ninjakeys.value.data = hotKeys.value;
};

const onSelected = item => {
  const {
    detail: { action: { title = null, section = null, id = null } = {} } = {},
  } = item;
  // Added this condition to prevent setting the selectedSnoozeType to null
  // When we select the "custom snooze" (CMD bar will close and the custom snooze modal will open)
  if (id === wootConstants.SNOOZE_OPTIONS.UNTIL_CUSTOM_TIME) {
    selectedSnoozeType.value = wootConstants.SNOOZE_OPTIONS.UNTIL_CUSTOM_TIME;
  } else {
    selectedSnoozeType.value = null;
  }

  track(GENERAL_EVENTS.COMMAND_BAR, {
    section,
    action: title,
  });

  setCommandBarData();
};

const onClosed = () => {
  // If the selectedSnoozeType is not "SNOOZE_OPTIONS.UNTIL_CUSTOM_TIME (custom snooze)" then we set the context menu chat id to null
  // Else we do nothing and its handled in the ChatList.vue hideCustomSnoozeModal() method
  if (
    selectedSnoozeType.value !== wootConstants.SNOOZE_OPTIONS.UNTIL_CUSTOM_TIME
  ) {
    store.dispatch('setContextMenuChatId', null);
  }
};

watchEffect(() => {
  if (ninjakeys.value) {
    ninjakeys.value.data = hotKeys.value;
  }
});

onMounted(setCommandBarData);
</script>

<<<<<<< HEAD
<<<<<<< HEAD
<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <ninja-keys
    ref="ninjakeys"
    noAutoLoadMdIcons
    hideBreadcrumbs
=======
<template>
  <ninja-keys
    ref="ninjakeys"
    no-auto-load-md-icons
    hide-breadcrumbs
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <ninja-keys
    ref="ninjakeys"
    noAutoLoadMdIcons
    hideBreadcrumbs
>>>>>>> 646cfb97e (fix: Snooze conversation not working in Inbox view (#9875))
    :placeholder="placeholder"
    @selected="onSelected"
    @closed="onClosed"
  />
</template>

<style lang="scss">
ninja-keys {
  --ninja-accent-color: var(--w-500);
  --ninja-font-family: 'PlusJakarta';
  z-index: 9999;
}

// Wrapped with body.dark to avoid overriding the default theme
// If OS is in dark theme and app is in light mode, It will prevent showing dark theme in command bar
body.dark {
  ninja-keys {
    --ninja-overflow-background: rgba(26, 29, 30, 0.5);
    --ninja-modal-background: #151718;
    --ninja-secondary-background-color: #26292b;
    --ninja-selected-background: #26292b;
    --ninja-footer-background: #2b2f31;
    --ninja-text-color: #f8faf9;
    --ninja-icon-color: #f8faf9;
    --ninja-secondary-text-color: #c2c9c6;
  }
}
</style>
