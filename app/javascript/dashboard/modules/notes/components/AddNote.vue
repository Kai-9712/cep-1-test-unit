<<<<<<< HEAD
<<<<<<< HEAD
<script setup>
import { ref, computed } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
import WootMessageEditor from 'dashboard/components/widgets/WootWriter/Editor.vue';

const emit = defineEmits(['add']);

const noteContent = ref('');

const buttonDisabled = computed(() => noteContent.value === '');

const onAdd = () => {
  if (noteContent.value !== '') {
    emit('add', noteContent.value);
  }
  noteContent.value = '';
};

const keyboardEvents = {
  '$mod+Enter': {
    action: () => onAdd(),
    allowOnFocusedInput: true,
  },
};
<<<<<<< HEAD
useKeyboardEvents(keyboardEvents, addNoteRef);
=======
<script>
=======
<script setup>
import { ref, computed } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
>>>>>>> 74bbbd25b (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -3) (#9897))
import WootMessageEditor from 'dashboard/components/widgets/WootWriter/Editor.vue';

const emit = defineEmits(['add']);

const addNoteRef = ref(null);
const noteContent = ref('');

const buttonDisabled = computed(() => noteContent.value === '');

const onAdd = () => {
  if (noteContent.value !== '') {
    emit('add', noteContent.value);
  }
  noteContent.value = '';
};

const keyboardEvents = {
  '$mod+Enter': {
    action: () => onAdd(),
    allowOnFocusedInput: true,
  },
};
<<<<<<< HEAD
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
useKeyboardEvents(keyboardEvents, addNoteRef);
>>>>>>> 74bbbd25b (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -3) (#9897))
=======
useKeyboardEvents(keyboardEvents);
>>>>>>> dadd572f9 (refactor: `useKeyboardEvents` composable  (#9959))
</script>

<template>
  <div
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    ref="addNoteRef"
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
    ref="addNoteRef"
>>>>>>> 74bbbd25b (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -3) (#9897))
=======
>>>>>>> dadd572f9 (refactor: `useKeyboardEvents` composable  (#9959))
    class="flex flex-col flex-grow p-4 mb-2 overflow-hidden bg-white border border-solid rounded-md shadow-sm border-slate-75 dark:border-slate-700 dark:bg-slate-900 text-slate-700 dark:text-slate-100"
  >
    <WootMessageEditor
      v-model="noteContent"
      class="input--note"
      :placeholder="$t('NOTES.ADD.PLACEHOLDER')"
      :enable-suggestions="false"
    />
    <div class="flex justify-end w-full">
      <woot-button
        color-scheme="warning"
        :title="$t('NOTES.ADD.TITLE')"
        :is-disabled="buttonDisabled"
        @click="onAdd"
      >
        {{ $t('NOTES.ADD.BUTTON') }} {{ '(⌘⏎)' }}
      </woot-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input--note {
  &::v-deep .ProseMirror-menubar {
    padding: 0;
    margin-top: var(--space-minus-small);
  }

  &::v-deep .ProseMirror-woot-style {
    max-height: 22.5rem;
  }
}
</style>
