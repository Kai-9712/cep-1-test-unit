<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 56e93d152 (feat: Replace the use of `mentionSelectionKeyboard` mixin to a composable (#9904))
<script setup>
import { ref, watch, computed } from 'vue';
import { useKeyboardNavigableList } from 'dashboard/composables/useKeyboardNavigableList';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
<<<<<<< HEAD
  },
  type: {
    type: String,
    default: 'canned',
  },
});

const emit = defineEmits(['mentionSelect']);

const mentionsListContainerRef = ref(null);
const selectedIndex = ref(0);

const adjustScroll = () => {
  const container = mentionsListContainerRef.value;
  const item = container.querySelector(`#mention-item-${selectedIndex.value}`);
  if (item) {
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.offsetHeight;
    if (itemTop < containerTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom + 34 > containerBottom) {
      container.scrollTop = itemBottom - container.offsetHeight + 34;
    }
  }
};

const onSelect = () => {
  emit('mentionSelect', props.items[selectedIndex.value]);
};

useKeyboardNavigableList({
  items: computed(() => props.items),
  onSelect,
  adjustScroll,
  selectedIndex,
});

watch(
  () => props.items,
  newItems => {
    if (newItems.length < selectedIndex.value + 1) {
      selectedIndex.value = 0;
    }
  }
);

watch(selectedIndex, adjustScroll);

const onHover = index => {
  selectedIndex.value = index;
};

const onListItemSelection = index => {
  selectedIndex.value = index;
  onSelect();
};

const variableKey = (item = {}) => {
  return props.type === 'variable' ? `{{${item.label}}}` : `/${item.label}`;
=======
<script>
import mentionSelectionKeyboardMixin from './mentionSelectionKeyboardMixin';
export default {
  mixins: [mentionSelectionKeyboardMixin],
  props: {
    items: {
      type: Array,
      default: () => {},
    },
    type: {
      type: String,
      default: 'canned',
    },
=======
>>>>>>> 56e93d152 (feat: Replace the use of `mentionSelectionKeyboard` mixin to a composable (#9904))
  },
  type: {
    type: String,
    default: 'canned',
  },
<<<<<<< HEAD
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
});

const emit = defineEmits(['mentionSelect']);

const mentionsListContainerRef = ref(null);
const selectedIndex = ref(0);

const adjustScroll = () => {
  const container = mentionsListContainerRef.value;
  const item = container.querySelector(`#mention-item-${selectedIndex.value}`);
  if (item) {
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.offsetHeight;
    if (itemTop < containerTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom + 34 > containerBottom) {
      container.scrollTop = itemBottom - container.offsetHeight + 34;
    }
  }
};

const onSelect = () => {
  emit('mentionSelect', props.items[selectedIndex.value]);
};

useKeyboardNavigableList({
  elementRef: mentionsListContainerRef,
  items: computed(() => props.items),
  onSelect,
  adjustScroll,
  selectedIndex,
});

watch(
  () => props.items,
  newItems => {
    if (newItems.length < selectedIndex.value + 1) {
      selectedIndex.value = 0;
    }
  }
);

watch(selectedIndex, adjustScroll);

const onHover = index => {
  selectedIndex.value = index;
};

const onListItemSelection = index => {
  selectedIndex.value = index;
  onSelect();
};

const variableKey = (item = {}) => {
  return props.type === 'variable' ? `{{${item.label}}}` : `/${item.label}`;
>>>>>>> 56e93d152 (feat: Replace the use of `mentionSelectionKeyboard` mixin to a composable (#9904))
};
</script>

<template>
  <div
<<<<<<< HEAD
<<<<<<< HEAD
    ref="mentionsListContainerRef"
    class="bg-white dark:bg-slate-800 rounded-md overflow-auto absolute w-full z-20 pb-0 shadow-md left-0 bottom-full max-h-[9.75rem] border border-solid border-slate-100 dark:border-slate-700 mention--box"
  >
    <ul class="mb-0 vertical dropdown menu">
=======
    ref="mentionsListContainer"
    class="bg-white dark:bg-slate-800 rounded-md overflow-auto absolute w-full z-20 pb-0 shadow-md left-0 bottom-full max-h-[9.75rem] border border-solid border-slate-100 dark:border-slate-700 mention--box"
  >
    <ul class="vertical dropdown menu">
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
    ref="mentionsListContainerRef"
    class="bg-white dark:bg-slate-800 rounded-md overflow-auto absolute w-full z-20 pb-0 shadow-md left-0 bottom-full max-h-[9.75rem] border border-solid border-slate-100 dark:border-slate-700 mention--box"
  >
    <ul class="mb-0 vertical dropdown menu">
>>>>>>> 56e93d152 (feat: Replace the use of `mentionSelectionKeyboard` mixin to a composable (#9904))
      <woot-dropdown-item
        v-for="(item, index) in items"
        :id="`mention-item-${index}`"
        :key="item.key"
        class="!mb-0"
        @mouseover="onHover(index)"
      >
        <button
          class="flex group flex-col gap-0.5 overflow-hidden cursor-pointer items-start rounded-none py-2.5 px-2.5 justify-center w-full h-full text-left hover:bg-woot-50 dark:hover:bg-woot-800 border-x-0 border-t-0 border-b border-solid border-slate-100 dark:border-slate-700"
          :class="{
            ' bg-woot-25 dark:bg-woot-800': index === selectedIndex,
          }"
          @click="onListItemSelection(index)"
        >
          <slot :item="item" :index="index" :selected="index === selectedIndex">
            <p
              class="max-w-full min-w-0 mb-0 overflow-hidden text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-woot-500 dark:group-hover:text-woot-500 text-ellipsis whitespace-nowrap"
              :class="{
                'text-woot-500 dark:text-woot-500': index === selectedIndex,
              }"
            >
              {{ item.description }}
            </p>
            <p
              class="max-w-full min-w-0 mb-0 overflow-hidden text-xs text-slate-500 dark:text-slate-300 group-hover:text-woot-500 dark:group-hover:text-woot-500 text-ellipsis whitespace-nowrap"
              :class="{
                'text-woot-500 dark:text-woot-500': index === selectedIndex,
              }"
            >
              {{ variableKey(item) }}
            </p>
          </slot>
        </button>
      </woot-dropdown-item>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.mention--box {
  .dropdown-menu__item:last-child > button {
    @apply border-0;
  }
}

.canned-item__button::v-deep .button__content {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}
</style>
