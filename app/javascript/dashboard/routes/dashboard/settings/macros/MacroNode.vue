<script setup>
import { computed, inject } from 'vue';
import { useMacros } from 'dashboard/composables/useMacros';
import { useI18n } from 'dashboard/composables/useI18n';
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

<script>
import { inject } from 'vue';
import ActionInput from 'dashboard/components/widgets/AutomationActionInput.vue';
import macrosMixin from 'dashboard/mixins/macrosMixin';
import { mapGetters } from 'vuex';

export default {
  components: {
    ActionInput,
  },
  mixins: [macrosMixin],
  props: {
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
    index: {
      type: Number,
      default: 0,
    },
    fileName: {
      type: String,
      default: '',
    },
  },
  setup() {
    const macroActionTypes = inject('macroActionTypes');
    return { macroActionTypes };
  },
  computed: {
    ...mapGetters({
      labels: 'labels/getLabels',
      teams: 'teams/getTeams',
      agents: 'agents/getAgents',
    }),
    actionData: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    errorMessage() {
      if (!this.errorKey) return '';

      return this.$t(`MACROS.ERRORS.${this.errorKey}`);
    },
    showActionInput() {
      if (
        this.actionData.action_name === 'send_email_to_team' ||
        this.actionData.action_name === 'send_message'
      )
        return false;
      const type = this.macroActionTypes.find(
        action => action.key === this.actionData.action_name
      ).inputType;
      return !!type;
    },
  },
  methods: {
    dropdownValues() {
      return this.getDropdownValues(this.value.action_name, this.$store);
    },
  },
};
</script>

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
