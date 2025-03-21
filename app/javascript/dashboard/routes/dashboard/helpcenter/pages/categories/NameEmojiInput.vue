<script>
const EmojiInput = () => import('shared/components/emoji/EmojiInput');

export default {
  components: { EmojiInput },
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    helpText: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    existingName: {
      type: String,
      default: '',
    },
    savedIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      name: '',
      icon: '',
      showEmojiPicker: false,
    };
  },
  computed: {
    nameErrorMessage() {
      if (this.hasError) {
        return this.errorMessage;
      }
      return '';
    },
  },
  mounted() {
    this.updateDataFromStore();
  },
  methods: {
    updateDataFromStore() {
      this.name = this.existingName;
      this.icon = this.savedIcon;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    onClickInsertEmoji(emoji = '') {
      this.icon = emoji;
      this.$emit('iconChange', emoji);
      this.showEmojiPicker = false;
    },
    onNameChange() {
      this.$emit('nameChange', this.name);
    },
    hideEmojiPicker() {
      if (this.showEmojiPicker) {
        this.showEmojiPicker = false;
      }
    },
  },
};
</script>

<template>
  <div class="relative flex items-center">
    <woot-button
      variant="hollow"
      class="absolute [&>span]:flex [&>span]:items-center [&>span]:justify-center z-10 top-[28px] h-[2.5rem] w-[2.45rem] !text-slate-400 dark:!text-slate-600 dark:!bg-slate-900 !p-0"
      color-scheme="secondary"
      @click="toggleEmojiPicker"
    >
      <span v-if="icon" v-dompurify-html="icon" class="text-lg" />
      <fluent-icon
        v-else
        size="18"
        icon="emoji-add"
        type="outline"
        class="text-slate-400 dark:text-slate-600"
      />
    </woot-button>
    <woot-input
      v-model="name"
      :class="{ error: hasError }"
      class="!mt-0 !mb-4 !mx-0 [&>input]:!mb-0 ltr:[&>input]:ml-12 rtl:[&>input]:mr-12 relative w-[calc(100%-3rem)] [&>p]:w-max"
      :error="nameErrorMessage"
      :label="label"
      :placeholder="placeholder"
      :help-text="helpText"
      @input="onNameChange"
    />
    <EmojiInput
      v-if="showEmojiPicker"
      v-on-clickaway="hideEmojiPicker"
      class="left-0 top-16"
      show-remove-button
      :on-click="onClickInsertEmoji"
    />
  </div>
</template>

<style scoped lang="scss">
.emoji-dialog::before {
  @apply hidden;
}
</style>
