<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3558878ae (feat: Replace the use of `macroMixin` with a composable (#9912))
<script setup>
import { computed, inject } from 'vue';
import { useMacros } from 'dashboard/composables/useMacros';
import { useI18n } from 'dashboard/composables/useI18n';
<<<<<<< HEAD
import ActionInput from 'dashboard/components/widgets/AutomationActionInput.vue';

const props = defineProps({
  singleNode: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  errorKey: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['input', 'resetAction', 'deleteNode']);

const { t } = useI18n();

const macroActionTypes = inject('macroActionTypes');

const { getMacroDropdownValues } = useMacros();

const actionData = computed({
  get: () => props.value,
  set: value => emit('input', value),
});

const errorMessage = computed(() => {
  if (!props.errorKey) return '';
  return t(`MACROS.ERRORS.${props.errorKey}`);
});

const showActionInput = computed(() => {
  if (
    actionData.value.action_name === 'send_email_to_team' ||
    actionData.value.action_name === 'send_message'
  )
    return false;
  const type = macroActionTypes.find(
    action => action.key === actionData.value.action_name
  ).inputType;
  return !!type;
});

const dropdownValues = () => {
  return getMacroDropdownValues(props.value.action_name);
};
</script>

<template>
  <div class="relative flex items-center w-full min-w-0 basis-full">
    <woot-button
      v-if="!singleNode"
      size="small"
      variant="clear"
      color-scheme="secondary"
      icon="navigation"
      class="absolute cursor-move -left-8 macros__node-drag-handle"
    />
    <div
<<<<<<< HEAD
      class="flex-grow p-2 mr-2 rounded-md shadow-sm"
      :class="
        errorKey
          ? 'bg-red-50 animate-shake dark:bg-red-800'
          : 'bg-white dark:bg-slate-700'
      "
=======
      class="macro__node-action-item"
      :class="{
        'has-error': errorKey,
      }"
>>>>>>> ce8e1ec93 (chore: Migrate all instances of old vuelidate to new v2 syntax [CW-3274] (#9623))
    >
      <ActionInput
        v-model="actionData"
        :action-types="macroActionTypes"
        :dropdown-values="dropdownValues()"
        :show-action-input="showActionInput"
        :show-remove-button="false"
<<<<<<< HEAD
        is-macro
=======
        :is-macro="true"
>>>>>>> ce8e1ec93 (chore: Migrate all instances of old vuelidate to new v2 syntax [CW-3274] (#9623))
        :error-message="errorMessage"
        :initial-file-name="fileName"
        @resetAction="$emit('resetAction')"
      />
    </div>
    <woot-button
      v-if="!singleNode"
      v-tooltip="$t('MACROS.EDITOR.DELETE_BTN_TOOLTIP')"
      icon="delete"
      size="small"
      variant="smooth"
      color-scheme="alert"
      @click="$emit('deleteNode')"
    />
  </div>
</template>
<<<<<<< HEAD
=======

=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
<script>
import { inject } from 'vue';
=======
>>>>>>> 3558878ae (feat: Replace the use of `macroMixin` with a composable (#9912))
import ActionInput from 'dashboard/components/widgets/AutomationActionInput.vue';

const props = defineProps({
  singleNode: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  errorKey: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['input', 'resetAction', 'deleteNode']);

const { t } = useI18n();

const macroActionTypes = inject('macroActionTypes');

const { getMacroDropdownValues } = useMacros();

const actionData = computed({
  get: () => props.value,
  set: value => emit('input', value),
});

const errorMessage = computed(() => {
  if (!props.errorKey) return '';
  return t(`MACROS.ERRORS.${props.errorKey}`);
});

const showActionInput = computed(() => {
  if (
    actionData.value.action_name === 'send_email_to_team' ||
    actionData.value.action_name === 'send_message'
  )
    return false;
  const type = macroActionTypes.find(
    action => action.key === actionData.value.action_name
  ).inputType;
  return !!type;
});

const dropdownValues = () => {
  return getMacroDropdownValues(props.value.action_name);
};
</script>

<template>
  <div class="relative flex items-center w-full min-w-0 basis-full">
    <woot-button
      v-if="!singleNode"
      size="small"
      variant="clear"
      color-scheme="secondary"
      icon="navigation"
      class="absolute cursor-move -left-8 macros__node-drag-handle"
    />
    <div
      class="flex-grow p-2 mr-2 rounded-md shadow-sm"
      :class="
        errorKey
          ? 'bg-red-50 animate-shake dark:bg-red-800'
          : 'bg-white dark:bg-slate-700'
      "
    >
      <ActionInput
        v-model="actionData"
        :action-types="macroActionTypes"
        :dropdown-values="dropdownValues()"
        :show-action-input="showActionInput"
        :show-remove-button="false"
        is-macro
        :error-message="errorMessage"
        :initial-file-name="fileName"
        @resetAction="$emit('resetAction')"
      />
    </div>
    <woot-button
      v-if="!singleNode"
      v-tooltip="$t('MACROS.EDITOR.DELETE_BTN_TOOLTIP')"
      icon="delete"
      size="small"
      variant="smooth"
      color-scheme="alert"
      @click="$emit('deleteNode')"
    />
  </div>
</template>
<<<<<<< HEAD

<style scoped lang="scss">
.macros__node-drag-handle {
  @apply cursor-move -left-8 absolute;
}
.macro__node-action-container {
  @apply w-full min-w-0 basis-full items-center flex relative;

  .macro__node-action-item {
    @apply flex-grow bg-white dark:bg-slate-700 p-2 mr-2 rounded-md shadow-sm;

    &.has-error {
      animation: shake 0.3s ease-in-out 0s 2;
      @apply bg-red-50 dark:bg-red-800;
    }
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(0.234375rem);
  }
  50% {
    transform: translateX(-0.234375rem);
  }
  75% {
    transform: translateX(0.234375rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
>>>>>>> ce8e1ec93 (chore: Migrate all instances of old vuelidate to new v2 syntax [CW-3274] (#9623))
=======
>>>>>>> 3558878ae (feat: Replace the use of `macroMixin` with a composable (#9912))
