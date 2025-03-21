import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VTooltip from 'v-tooltip';
import Button from 'dashboard/components/buttons/Button';
import i18n from 'dashboard/i18n';
import FluentIcon from 'shared/components/FluentIcon/DashboardIcon';
import MoreActions from '../MoreActions';

jest.mock('shared/helpers/mitt', () => ({
  emitter: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  },
}));

import { emitter } from 'shared/helpers/mitt';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
localVue.use(VTooltip);

localVue.component('fluent-icon', FluentIcon);
localVue.component('woot-button', Button);

localVue.prototype.$emitter = {
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

const i18nConfig = new VueI18n({ locale: 'en', messages: i18n });

describe('MoveActions', () => {
  let currentChat = { id: 8, muted: false };
  let state = null;
  let muteConversation = null;
  let unmuteConversation = null;
  let modules = null;
  let getters = null;
  let store = null;
  let moreActions = null;

  beforeEach(() => {
    state = {
      authenticated: true,
      currentChat,
    };

    muteConversation = jest.fn(() => Promise.resolve());
    unmuteConversation = jest.fn(() => Promise.resolve());

    modules = {
      conversations: { actions: { muteConversation, unmuteConversation } },
    };

    getters = { getSelectedChat: () => currentChat };

    store = new Vuex.Store({ state, modules, getters });

    moreActions = mount(MoreActions, {
      store,
      localVue,
      i18n: i18nConfig,
      stubs: {
        WootModal: { template: '<div><slot/> </div>' },
        WootModalHeader: { template: '<div><slot/> </div>' },
      },
    });
  });

  describe('muting discussion', () => {
    it('triggers "muteConversation"', async () => {
      await moreActions.find('button:first-child').trigger('click');

      expect(muteConversation).toBeCalledWith(
        expect.any(Object),
        currentChat.id,
        undefined
      );
    });

    it('shows alert', async () => {
      await moreActions.find('button:first-child').trigger('click');

      expect(emitter.emit).toBeCalledWith('newToastMessage', {
        message:
          'This contact is blocked successfully. You will not be notified of any future conversations.',
        action: null,
      });
    });
  });

  describe('unmuting discussion', () => {
    beforeEach(() => {
      currentChat.muted = true;
    });

    it('triggers "unmuteConversation"', async () => {
      await moreActions.find('button:first-child').trigger('click');

      expect(unmuteConversation).toBeCalledWith(
        expect.any(Object),
        currentChat.id,
        undefined
      );
    });

    it('shows alert', async () => {
      await moreActions.find('button:first-child').trigger('click');

      expect(emitter.emit).toBeCalledWith('newToastMessage', {
        message: 'This contact is unblocked successfully.',
        action: null,
      });
    });
  });
});
