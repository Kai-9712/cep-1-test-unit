<<<<<<< HEAD
<script>
<<<<<<< HEAD
<<<<<<< HEAD
import { useAccount } from 'dashboard/composables/useAccount';
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
=======
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
import accountMixin from 'dashboard/mixins/account.js';
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
import { useAccount } from 'dashboard/composables/useAccount';
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
export default {
  components: {
    Thumbnail,
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  mixins: [accountMixin],
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
  props: {
    macro: {
      type: Object,
      required: true,
    },
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
  setup() {
    const { accountScopedUrl } = useAccount();
=======
<script setup>
import { computed } from 'vue';
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
import { useI18n } from 'dashboard/composables/useI18n';
>>>>>>> 44227de97 (feat: Update the design for macros design page (#9999))

const props = defineProps({
  macro: {
    type: Object,
    required: true,
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
  computed: {
    createdByName() {
      const createdBy = this.macro.created_by;
      return createdBy.available_name ?? createdBy.email ?? '';
    },
    updatedByName() {
      const updatedBy = this.macro.updated_by;
      return updatedBy.available_name ?? updatedBy.email ?? '';
    },
    visibilityLabel() {
      return this.macro.visibility === 'global'
        ? this.$t('MACROS.EDITOR.VISIBILITY.GLOBAL.LABEL')
        : this.$t('MACROS.EDITOR.VISIBILITY.PERSONAL.LABEL');
    },
  },
};
=======
});
defineEmits(['delete']);
const { t } = useI18n();

const createdByName = computed(() => {
  const createdBy = props.macro.created_by;
  return createdBy.available_name ?? createdBy.email ?? '';
});

const updatedByName = computed(() => {
  const updatedBy = props.macro.updated_by;
  return updatedBy.available_name ?? updatedBy.email ?? '';
});

const visibilityLabel = computed(() => {
  const i18nKey =
    props.macro.visibility === 'global'
      ? 'MACROS.EDITOR.VISIBILITY.GLOBAL.LABEL'
      : 'MACROS.EDITOR.VISIBILITY.PERSONAL.LABEL';
  return t(i18nKey);
});
>>>>>>> 44227de97 (feat: Update the design for macros design page (#9999))
</script>

<template>
  <tr>
    <td class="py-4 ltr:pr-4 rtl:pl-4 truncate">{{ macro.name }}</td>
    <td class="py-4 ltr:pr-4 rtl:pl-4">
      <div v-if="macro.created_by" class="flex items-center">
        <Thumbnail :username="createdByName" size="24px" />
        <span class="mx-2">{{ createdByName }}</span>
      </div>
      <div v-else>--</div>
    </td>
    <td class="py-4 ltr:pr-4 rtl:pl-4">
      <div v-if="macro.updated_by" class="flex items-center">
        <Thumbnail :username="updatedByName" size="24px" />
        <span class="mx-2">{{ updatedByName }}</span>
      </div>
      <div v-else>--</div>
    </td>
<<<<<<< HEAD
    <td>{{ visibilityLabel }}</td>
    <td class="button-wrapper">
<<<<<<< HEAD
<<<<<<< HEAD
      <router-link :to="accountScopedUrl(`settings/macros/${macro.id}/edit`)">
=======
      <router-link :to="addAccountScoping(`settings/macros/${macro.id}/edit`)">
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
      <router-link :to="accountScopedUrl(`settings/macros/${macro.id}/edit`)">
>>>>>>> 66db9a0cc (feat: Rewrite `accountMixin` to a composable (#9914))
=======
    <td class="py-4 ltr:pr-4 rtl:pl-4">{{ visibilityLabel }}</td>
    <td class="py-4 flex justify-end gap-1">
      <router-link :to="{ name: 'macros_edit', params: { macroId: macro.id } }">
>>>>>>> 44227de97 (feat: Update the design for macros design page (#9999))
        <woot-button
          v-tooltip.top="$t('MACROS.EDIT.TOOLTIP')"
          variant="smooth"
          size="tiny"
          color-scheme="secondary"
          class-names="grey-btn"
          icon="edit"
        />
      </router-link>
      <woot-button
        v-tooltip.top="$t('MACROS.DELETE.TOOLTIP')"
        variant="smooth"
        color-scheme="alert"
        size="tiny"
        icon="dismiss-circle"
        class-names="grey-btn"
        @click="$emit('delete')"
      />
    </td>
  </tr>
</template>
