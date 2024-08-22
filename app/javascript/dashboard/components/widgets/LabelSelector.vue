<<<<<<< HEAD
<<<<<<< HEAD
<script setup>
import { ref, computed } from 'vue';
import { useAdmin } from 'dashboard/composables/useAdmin';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
import AddLabel from 'shared/components/ui/dropdown/AddLabel.vue';
import LabelDropdown from 'shared/components/ui/label/LabelDropdown.vue';

const props = defineProps({
  allLabels: {
    type: Array,
    default: () => [],
  },
  savedLabels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['add', 'remove']);

const { isAdmin } = useAdmin();

const showSearchDropdownLabel = ref(false);

const selectedLabels = computed(() => {
  return props.savedLabels.map(label => label.title);
});

const addItem = label => {
  emit('add', label);
};

const removeItem = label => {
  emit('remove', label);
};

const toggleLabels = () => {
  showSearchDropdownLabel.value = !showSearchDropdownLabel.value;
};

const closeDropdownLabel = () => {
  showSearchDropdownLabel.value = false;
};

const keyboardEvents = {
  KeyL: {
    action: e => {
      toggleLabels();
      e.preventDefault();
    },
  },
  Escape: {
    action: () => closeDropdownLabel(),
    allowOnFocusedInput: true,
  },
};

useKeyboardEvents(keyboardEvents);
</script>

<template>
  <div v-on-clickaway="closeDropdownLabel" class="relative leading-6">
    <AddLabel @add="toggleLabels" />
    <woot-label
      v-for="label in savedLabels"
      :key="label.id"
      :title="label.title"
      :description="label.description"
      show-close
      :color="label.color"
      variant="smooth"
      @click="removeItem"
    />
    <div class="absolute w-full top-7">
      <div
        :class="{ 'dropdown-pane--open': showSearchDropdownLabel }"
        class="!box-border !w-full dropdown-pane"
      >
        <LabelDropdown
          v-if="showSearchDropdownLabel"
          :account-labels="allLabels"
          :selected-labels="selectedLabels"
          :allow-creation="isAdmin"
          @add="addItem"
          @remove="removeItem"
        />
      </div>
    </div>
  </div>
</template>
<<<<<<< HEAD
=======

=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<script>
import AddLabel from 'shared/components/ui/dropdown/AddLabel.vue';
import keyboardEventListenerMixins from 'shared/mixins/keyboardEventListenerMixins';
import LabelDropdown from 'shared/components/ui/label/LabelDropdown.vue';
=======
<script setup>
import { ref, computed } from 'vue';
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
import { useAdmin } from 'dashboard/composables/useAdmin';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
import AddLabel from 'shared/components/ui/dropdown/AddLabel.vue';
import LabelDropdown from 'shared/components/ui/label/LabelDropdown.vue';

const props = defineProps({
  allLabels: {
    type: Array,
    default: () => [],
  },
  savedLabels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['add', 'remove']);

const labelSelectorWrapRef = ref(null);

const { isAdmin } = useAdmin();

const showSearchDropdownLabel = ref(false);

const selectedLabels = computed(() => {
  return props.savedLabels.map(label => label.title);
});

const addItem = label => {
  emit('add', label);
};

const removeItem = label => {
  emit('remove', label);
};

const toggleLabels = () => {
  showSearchDropdownLabel.value = !showSearchDropdownLabel.value;
};

const closeDropdownLabel = () => {
  showSearchDropdownLabel.value = false;
};

const keyboardEvents = {
  KeyL: {
    action: e => {
      toggleLabels();
      e.preventDefault();
    },
  },
  Escape: {
    action: () => closeDropdownLabel(),
    allowOnFocusedInput: true,
  },
};

useKeyboardEvents(keyboardEvents, labelSelectorWrapRef);
</script>

<template>
  <div
    ref="labelSelectorWrapRef"
    v-on-clickaway="closeDropdownLabel"
    class="relative leading-6"
  >
    <AddLabel @add="toggleLabels" />
    <woot-label
      v-for="label in savedLabels"
      :key="label.id"
      :title="label.title"
      :description="label.description"
      show-close
      :color="label.color"
      variant="smooth"
      @click="removeItem"
    />
    <div class="absolute w-full top-7">
      <div
        :class="{ 'dropdown-pane--open': showSearchDropdownLabel }"
        class="!box-border !w-full dropdown-pane"
      >
        <LabelDropdown
          v-if="showSearchDropdownLabel"
          :account-labels="allLabels"
          :selected-labels="selectedLabels"
          :allow-creation="isAdmin"
          @add="addItem"
          @remove="removeItem"
        />
      </div>
    </div>
  </div>
</template>
<<<<<<< HEAD

<style lang="scss" scoped>
.title-icon {
  margin-right: var(--space-smaller);
}

.label-wrap {
  position: relative;
  line-height: var(--space-medium);

  .dropdown-wrap {
    display: flex;
    position: absolute;
    margin-right: var(--space-medium);
    top: var(--space-medium);
    width: 100%;
    left: -1px;

    .dropdown-pane {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
=======
>>>>>>> 89acbd8d0 (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -2) (#9892))
