import Vue from 'vue';
import { useAlert } from 'dashboard/composables';
import fileUploadMixin from 'dashboard/mixins/fileUploadMixin';

jest.mock('shared/helpers/FileHelper', () => ({
  checkFileSizeLimit: jest.fn(),
}));

jest.mock('activestorage', () => ({
  DirectUpload: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
  })),
}));

vi.mock('dashboard/composables', () => ({
  useAlert: vi.fn(),
}));

describe('FileUploadMixin', () => {
  let vm;

  beforeEach(() => {
    vm = new Vue(fileUploadMixin);
    vm.isATwilioSMSChannel = false;
    vm.globalConfig = {
      directUploadsEnabled: true,
    };
    vm.accountId = 123;
    vm.currentChat = {
      id: 456,
    };
    vm.currentUser = {
      access_token: 'token',
    };
    vm.$t = jest.fn(message => message);
    vm.showAlert = jest.fn();
    vm.attachFile = jest.fn();
  });

  it('should call onDirectFileUpload when direct uploads are enabled', () => {
    vm.onDirectFileUpload = jest.fn();
    vm.onFileUpload({});
    expect(vm.onDirectFileUpload).toHaveBeenCalledWith({});
  });

  it('should call onIndirectFileUpload when direct uploads are disabled', () => {
    vm.globalConfig.directUploadsEnabled = false;
    vm.onIndirectFileUpload = jest.fn();
    vm.onFileUpload({});
    expect(vm.onIndirectFileUpload).toHaveBeenCalledWith({});
  });

  describe('onDirectFileUpload', () => {
    it('returns early if no file is provided', () => {
      const returnValue = vm.onDirectFileUpload(null);
      expect(returnValue).toBeUndefined();
    });

    it('shows an alert if the file size exceeds the maximum limit', () => {
      const fakeFile = { size: 999999999 };
<<<<<<< HEAD
      vm.showAlert = jest.fn();
=======
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
      vm.onDirectFileUpload(fakeFile);
      expect(useAlert).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('onIndirectFileUpload', () => {
    it('returns early if no file is provided', () => {
      const returnValue = vm.onIndirectFileUpload(null);
      expect(returnValue).toBeUndefined();
    });

    it('shows an alert if the file size exceeds the maximum limit', () => {
      const fakeFile = { size: 999999999 };
<<<<<<< HEAD
      vm.showAlert = jest.fn();
=======
>>>>>>> 79aa5a5d7 (feat: Replace `alertMixin` usage with `useAlert` (#9793))
      vm.onIndirectFileUpload(fakeFile);
      expect(useAlert).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
