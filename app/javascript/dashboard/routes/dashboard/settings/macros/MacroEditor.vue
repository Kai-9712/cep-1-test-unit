<script setup>
import { ref, computed, watch, provide } from 'vue';
import { useRoute, useRouter } from 'dashboard/composables/route';
import { useI18n } from 'dashboard/composables/useI18n';
import { useStore, useStoreGetters } from 'dashboard/composables/store';
import MacroForm from './MacroForm.vue';
import { MACRO_ACTION_TYPES } from './constants';
import { useAlert } from 'dashboard/composables';
import actionQueryGenerator from 'dashboard/helper/actionQueryGenerator.js';
import { useMacros } from 'dashboard/composables/useMacros';

const store = useStore();
const getters = useStoreGetters();

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const { getMacroDropdownValues } = useMacros();

const macro = ref(null);
const mode = ref('CREATE');
const macroActionTypes = MACRO_ACTION_TYPES;

provide('macroActionTypes', macroActionTypes);

const uiFlags = computed(() => getters['macros/getUIFlags'].value);
const macroId = computed(() => route.params.macroId);

const fetchDropdownData = () => {
  store.dispatch('agents/get');
  store.dispatch('teams/get');
  store.dispatch('labels/get');
};

const formatMacro = macroData => {
  const formattedActions = macroData.actions.map(action => {
    let actionParams = [];
    if (action.action_params.length) {
      const inputType = macroActionTypes.find(
        item => item.key === action.action_name
      ).inputType;
      if (inputType === 'multi_select' || inputType === 'search_select') {
        actionParams = getMacroDropdownValues(action.action_name).filter(item =>
          [...action.action_params].includes(item.id)
        );
      } else if (inputType === 'team_message') {
        actionParams = {
          team_ids: getMacroDropdownValues(action.action_name).filter(item =>
            [...action.action_params[0].team_ids].includes(item.id)
          ),
          message: action.action_params[0].message,
        };
      } else actionParams = [...action.action_params];
    }
    return {
      ...action,
      action_params: actionParams,
    };
  });
  return {
    ...macroData,
    actions: formattedActions,
  };
};

const manifestMacro = async () => {
  await store.dispatch('macros/getSingleMacro', macroId.value);
  const singleMacro = store.getters['macros/getMacro'](macroId.value);
  macro.value = formatMacro(singleMacro);
};

const fetchMacro = () => {
  mode.value = 'EDIT';
  manifestMacro();
};

const initNewMacro = () => {
  mode.value = 'CREATE';
  macro.value = {
    name: '',
    actions: [
      {
        action_name: 'assign_team',
        action_params: [],
      },
    ],
    visibility: 'global',
  };
};

watch(
  () => route,
  () => {
    fetchDropdownData();
    if (route.params.macroId) {
      fetchMacro();
    } else {
      initNewMacro();
    }
  },
  { immediate: true, deep: true }
);

const saveMacro = async macroData => {
  try {
    const action = mode.value === 'EDIT' ? 'macros/update' : 'macros/create';
    const successMessage =
      mode.value === 'EDIT'
        ? t('MACROS.EDIT.API.SUCCESS_MESSAGE')
        : t('MACROS.ADD.API.SUCCESS_MESSAGE');
    let serializedMacro = JSON.parse(JSON.stringify(macroData));
    serializedMacro.actions = actionQueryGenerator(serializedMacro.actions);
    await store.dispatch(action, serializedMacro);
    useAlert(successMessage);
    router.push({ name: 'macros_wrapper' });
  } catch (error) {
    useAlert(t('MACROS.ERROR'));
  }
};
</script>

<template>
  <div class="flex flex-col flex-1 h-full overflow-auto">
    <woot-loading-state
      v-if="uiFlags.isFetchingItem"
      :message="t('MACROS.EDITOR.LOADING')"
    />
    <MacroForm
      v-if="macro && !uiFlags.isFetchingItem"
      :macro-data="macro"
      @update:macro-data="macro = $event"
      @submit="saveMacro"
    />
  </div>
</template>
<<<<<<< HEAD
=======

<script>
import MacroForm from './MacroForm.vue';
import { MACRO_ACTION_TYPES } from './constants';
import { mapGetters } from 'vuex';
import { useAlert } from 'dashboard/composables';
import actionQueryGenerator from 'dashboard/helper/actionQueryGenerator.js';
import macrosMixin from 'dashboard/mixins/macrosMixin';

export default {
  components: {
    MacroForm,
  },
  mixins: [macrosMixin],
  provide() {
    return {
      macroActionTypes: this.macroActionTypes,
    };
  },
  data() {
    return {
      macro: null,
      mode: 'CREATE',
      macroActionTypes: MACRO_ACTION_TYPES,
    };
  },
  computed: {
    ...mapGetters({
      uiFlags: 'macros/getUIFlags',
      labels: 'labels/getLabels',
      agents: 'agents/getAgents',
      teams: 'teams/getTeams',
    }),
    macroId() {
      return this.$route.params.macroId;
    },
  },
  watch: {
    $route: {
      handler() {
        this.fetchDropdownData();
        if (this.$route.params.macroId) {
          this.fetchMacro();
        } else {
          this.initNewMacro();
        }
      },
      immediate: true,
    },
  },
  methods: {
    fetchDropdownData() {
      this.$store.dispatch('agents/get');
      this.$store.dispatch('teams/get');
      this.$store.dispatch('labels/get');
    },
    fetchMacro() {
      this.mode = 'EDIT';
      this.manifestMacro();
    },
    async manifestMacro() {
      await this.$store.dispatch('macros/getSingleMacro', this.macroId);
      const singleMacro = this.$store.getters['macros/getMacro'](this.macroId);
      this.macro = this.formatMacro(singleMacro);
    },
    formatMacro(macro) {
      const formattedActions = macro.actions.map(action => {
        let actionParams = [];
        if (action.action_params.length) {
          const inputType = this.macroActionTypes.find(
            item => item.key === action.action_name
          ).inputType;
          if (inputType === 'multi_select' || inputType === 'search_select') {
            actionParams = [
              ...this.getDropdownValues(action.action_name, this.$store),
            ].filter(item => [...action.action_params].includes(item.id));
          } else if (inputType === 'team_message') {
            actionParams = {
              team_ids: [
                ...this.getDropdownValues(action.action_name, this.$store),
              ].filter(item =>
                [...action.action_params[0].team_ids].includes(item.id)
              ),
              message: action.action_params[0].message,
            };
          } else actionParams = [...action.action_params];
        }
        return {
          ...action,
          action_params: actionParams,
        };
      });
      return {
        ...macro,
        actions: formattedActions,
      };
    },
    initNewMacro() {
      this.mode = 'CREATE';
      this.macro = {
        name: '',
        actions: [
          {
            action_name: 'assign_team',
            action_params: [],
          },
        ],
        visibility: 'global',
      };
    },
    async saveMacro(macro) {
      try {
        const action = this.mode === 'EDIT' ? 'macros/update' : 'macros/create';
        let successMessage =
          this.mode === 'EDIT'
            ? this.$t('MACROS.EDIT.API.SUCCESS_MESSAGE')
            : this.$t('MACROS.ADD.API.SUCCESS_MESSAGE');
        let serializedMacro = JSON.parse(JSON.stringify(macro));
        serializedMacro.actions = actionQueryGenerator(serializedMacro.actions);
        await this.$store.dispatch(action, serializedMacro);
        useAlert(successMessage);
        this.$router.push({ name: 'macros_wrapper' });
      } catch (error) {
        useAlert(this.$t('MACROS.ERROR'));
      }
    },
  },
};
</script>
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
