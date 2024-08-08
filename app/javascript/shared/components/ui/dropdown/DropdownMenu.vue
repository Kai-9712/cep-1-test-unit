<<<<<<< HEAD
<<<<<<< HEAD
<script setup>
import { ref } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';

defineProps({
  placement: {
    type: String,
    default: 'top',
  },
});

const dropdownMenuRef = ref(null);

const dropdownMenuButtons = () => {
  return dropdownMenuRef.value.querySelectorAll(
    'ul.dropdown li.dropdown-menu__item .button'
  );
};

const getActiveButtonIndex = menuButtons => {
  const focusedButton = dropdownMenuRef.value.querySelector(
    'ul.dropdown li.dropdown-menu__item .button:focus'
  );
  return Array.from(menuButtons).indexOf(focusedButton);
};

const focusButton = (menuButtons, newIndex) => {
  if (menuButtons.length === 0) return;
  menuButtons[newIndex].focus();
};

const focusPreviousButton = menuButtons => {
  const activeIndex = getActiveButtonIndex(menuButtons);
  const newIndex = activeIndex >= 1 ? activeIndex - 1 : menuButtons.length - 1;
  focusButton(menuButtons, newIndex);
};

const focusNextButton = menuButtons => {
  const activeIndex = getActiveButtonIndex(menuButtons);
  const newIndex = activeIndex === menuButtons.length - 1 ? 0 : activeIndex + 1;
  focusButton(menuButtons, newIndex);
};

const keyboardEvents = {
  ArrowUp: {
    action: () => focusPreviousButton(dropdownMenuButtons()),
    allowOnFocusedInput: true,
  },
  ArrowDown: {
    action: () => focusNextButton(dropdownMenuButtons()),
    allowOnFocusedInput: true,
  },
};

useKeyboardEvents(keyboardEvents, dropdownMenuRef);
=======
<script>
import keyboardEventListenerMixins from 'shared/mixins/keyboardEventListenerMixins';
export default {
  name: 'WootDropdownMenu',
  componentName: 'WootDropdownMenu',
=======
<script setup>
import { ref } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
>>>>>>> 74bbbd25b (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -3) (#9897))

defineProps({
  placement: {
    type: String,
    default: 'top',
  },
});

const dropdownMenuRef = ref(null);

const dropdownMenuButtons = () => {
  return dropdownMenuRef.value.querySelectorAll(
    'ul.dropdown li.dropdown-menu__item .button'
  );
};

const getActiveButtonIndex = menuButtons => {
  const focusedButton = dropdownMenuRef.value.querySelector(
    'ul.dropdown li.dropdown-menu__item .button:focus'
  );
  return Array.from(menuButtons).indexOf(focusedButton);
};

const focusButton = (menuButtons, newIndex) => {
  if (menuButtons.length === 0) return;
  menuButtons[newIndex].focus();
};

const focusPreviousButton = menuButtons => {
  const activeIndex = getActiveButtonIndex(menuButtons);
  const newIndex = activeIndex >= 1 ? activeIndex - 1 : menuButtons.length - 1;
  focusButton(menuButtons, newIndex);
};

const focusNextButton = menuButtons => {
  const activeIndex = getActiveButtonIndex(menuButtons);
  const newIndex = activeIndex === menuButtons.length - 1 ? 0 : activeIndex + 1;
  focusButton(menuButtons, newIndex);
};

const keyboardEvents = {
  ArrowUp: {
    action: () => focusPreviousButton(dropdownMenuButtons()),
    allowOnFocusedInput: true,
  },
  ArrowDown: {
    action: () => focusNextButton(dropdownMenuButtons()),
    allowOnFocusedInput: true,
  },
};
<<<<<<< HEAD
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======

useKeyboardEvents(keyboardEvents, dropdownMenuRef);
>>>>>>> 74bbbd25b (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -3) (#9897))
</script>

<template>
  <ul
<<<<<<< HEAD
<<<<<<< HEAD
    ref="dropdownMenuRef"
=======
    ref="dropdownMenu"
>>>>>>> b4b308336 (feat: Eslint rules (#9839))
=======
    ref="dropdownMenuRef"
>>>>>>> 74bbbd25b (feat: Replace the use of `keyboardEventListener` mixin to a composable (Part -3) (#9897))
    class="dropdown menu vertical"
    :class="[placement && `dropdown--${placement}`]"
  >
    <slot />
  </ul>
</template>
