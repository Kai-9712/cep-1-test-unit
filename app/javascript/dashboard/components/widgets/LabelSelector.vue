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
=======

<script>
import AddLabel from 'shared/components/ui/dropdown/AddLabel.vue';
import keyboardEventListenerMixins from 'shared/mixins/keyboardEventListenerMixins';
import LabelDropdown from 'shared/components/ui/label/LabelDropdown.vue';
import { useAdmin } from 'dashboard/composables/useAdmin';

export default {
  components: {
    AddLabel,
    LabelDropdown,
  },

  mixins: [keyboardEventListenerMixins],

  props: {
    allLabels: {
      type: Array,
      default: () => [],
    },
    savedLabels: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const { isAdmin } = useAdmin();
    return {
      isAdmin,
    };
  },

  data() {
    return {
      showSearchDropdownLabel: false,
    };
  },

  computed: {
    selectedLabels() {
      return this.savedLabels.map(label => label.title);
    },
  },

  methods: {
    addItem(label) {
      this.$emit('add', label);
    },

    removeItem(label) {
      this.$emit('remove', label);
    },

    toggleLabels() {
      this.showSearchDropdownLabel = !this.showSearchDropdownLabel;
    },

    closeDropdownLabel() {
      this.showSearchDropdownLabel = false;
    },
    getKeyboardEvents() {
      return {
        KeyL: {
          action: e => {
            this.toggleLabels();
            e.preventDefault();
          },
        },
        Escape: {
          action: () => this.closeDropdownLabel(),
          allowOnFocusedInput: true,
        },
      };
    },
  },
};
</script>

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
