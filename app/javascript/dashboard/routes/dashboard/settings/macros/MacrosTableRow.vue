<script>
<<<<<<< HEAD
import { useAccount } from 'dashboard/composables/useAccount';
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
=======
import Thumbnail from 'dashboard/components/widgets/Thumbnail.vue';
import accountMixin from 'dashboard/mixins/account.js';
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
export default {
  components: {
    Thumbnail,
  },
<<<<<<< HEAD
=======
  mixins: [accountMixin],
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
  props: {
    macro: {
      type: Object,
      required: true,
    },
  },
<<<<<<< HEAD
  setup() {
    const { accountScopedUrl } = useAccount();

    return {
      accountScopedUrl,
    };
  },
=======
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
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
</script>

<template>
  <tr>
    <td>{{ macro.name }}</td>
    <td>
      <div v-if="macro.created_by" class="avatar-container">
        <Thumbnail :username="createdByName" size="24px" />
        <span>{{ createdByName }}</span>
      </div>
    </td>
    <td>
      <div v-if="macro.updated_by" class="avatar-container">
        <Thumbnail :username="updatedByName" size="24px" />
        <span>{{ updatedByName }}</span>
      </div>
    </td>
    <td>{{ visibilityLabel }}</td>
    <td class="button-wrapper">
<<<<<<< HEAD
      <router-link :to="accountScopedUrl(`settings/macros/${macro.id}/edit`)">
=======
      <router-link :to="addAccountScoping(`settings/macros/${macro.id}/edit`)">
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
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

<style scoped lang="scss">
.avatar-container {
  display: flex;
  align-items: center;

  span {
    margin-left: var(--space-small);
    margin-right: var(--space-small);
  }
}
</style>
