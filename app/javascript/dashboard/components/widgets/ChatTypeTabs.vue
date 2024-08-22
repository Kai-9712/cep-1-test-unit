<<<<<<< HEAD
<<<<<<< HEAD
<script setup>
import { computed } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
=======
<script>
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
<script setup>
import { ref, computed } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
import wootConstants from 'dashboard/constants/globals';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeTab: {
    type: String,
    default: wootConstants.ASSIGNEE_TYPE.ME,
  },
});

const emit = defineEmits(['chatTabChange']);

const activeTabIndex = computed(() => {
  return props.items.findIndex(item => item.key === props.activeTab);
});

const onTabChange = selectedTabIndex => {
  if (props.items[selectedTabIndex].key !== props.activeTab) {
    emit('chatTabChange', props.items[selectedTabIndex].key);
  }
};

const keyboardEvents = {
  'Alt+KeyN': {
    action: () => {
      if (props.activeTab === wootConstants.ASSIGNEE_TYPE.ALL) {
        onTabChange(0);
      } else {
        onTabChange(activeTabIndex.value + 1);
      }
    },
  },
};

useKeyboardEvents(keyboardEvents);
</script>

<template>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
  <div ref="chatTypeTabsRef">
    <woot-tabs
      :index="activeTabIndex"
      class="tab--chat-type py-0 px-4 w-full"
      @change="onTabChange"
    >
      <woot-tabs-item
        v-for="item in items"
        :key="item.key"
        :name="item.name"
        :count="item.count"
      />
    </woot-tabs>
  </div>
<<<<<<< HEAD
=======
  <woot-tabs :index="activeTabIndex" @change="onTabChange">
=======
  <woot-tabs
    :index="activeTabIndex"
    class="w-full px-4 py-0 tab--chat-type"
    @change="onTabChange"
  >
>>>>>>> dadd572f9 (refactor: `useKeyboardEvents` composable  (#9959))
    <woot-tabs-item
      v-for="item in items"
      :key="item.key"
      :name="item.name"
      :count="item.count"
    />
  </woot-tabs>
<<<<<<< HEAD
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
=======
>>>>>>> dadd572f9 (refactor: `useKeyboardEvents` composable  (#9959))
</template>

<style scoped lang="scss">
.tab--chat-type {
  ::v-deep {
    .tabs {
      @apply p-0;
    }
  }
}
</style>
