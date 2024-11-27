import integrationAPI from '../integrations';
import ApiClient from '../ApiClient';

describe('#integrationAPI', () => {
  it('creates correct instance', () => {
    expect(integrationAPI).toBeInstanceOf(ApiClient);
    expect(integrationAPI).toHaveProperty('get');
    expect(integrationAPI).toHaveProperty('show');
    expect(integrationAPI).toHaveProperty('create');
    expect(integrationAPI).toHaveProperty('update');
    expect(integrationAPI).toHaveProperty('delete');
    expect(integrationAPI).toHaveProperty('connectSlack');
    expect(integrationAPI).toHaveProperty('updateSlack');
    expect(integrationAPI).toHaveProperty('listAllSlackChannels');
    expect(integrationAPI).toHaveProperty('deleteHook');
    expect(integrationAPI).toHaveProperty('connectDialogflowTest'); // New method
  });

  describe('API calls', () => {
    const originalAxios = window.axios;
    const axiosMock = {
      post: jest.fn(() => Promise.resolve()),
      get: jest.fn(() => Promise.resolve()),
      patch: jest.fn(() => Promise.resolve()),
      delete: jest.fn(() => Promise.resolve()),
    };

    beforeEach(() => {
      window.axios = axiosMock;
    });

    afterEach(() => {
      window.axios = originalAxios;
    });

    it('#connectSlack', () => {
      const payload = { code: 'SDNFJNSDFNDSJN', workspaceId: '12345' }; // Updated payload
      integrationAPI.connectSlack(payload);
      expect(axiosMock.post).toHaveBeenCalledWith(
        '/api/v1/integrations/slack',
        payload
      );
    });

    it('#updateSlack', () => {
      const updateObj = { referenceId: 'SDFSDGSVE' };
      integrationAPI.updateSlack(updateObj);
      expect(axiosMock.patch).toHaveBeenCalledWith(
        '/api/v1/integrations/slack',
        {
          reference_id: updateObj.referenceId,
        }
      );
    });

    it('#listAllSlackChannels', () => {
      integrationAPI.listAllSlackChannels();
      expect(axiosMock.get).toHaveBeenCalledWith(
        '/api/v1/integrations/slack/list_all_channels'
      );
    });

    it('#delete', () => {
      integrationAPI.delete(2);
      expect(axiosMock.delete).toHaveBeenCalledWith('/api/v1/integrations/2');
    });

    it('#createHook', () => {
      const hookData = {
        app_id: 'fullcontact',
        settings: { api_key: 'SDFSDGSVE' },
      };
      integrationAPI.createHook(hookData);
      expect(axiosMock.post).toHaveBeenCalledWith(
        '/api/v1/integrations/hooks',
        hookData
      );
    });

    it('#deleteHook', () => {
      integrationAPI.deleteHook(2);
      expect(axiosMock.delete).toHaveBeenCalledWith(
        '/api/v1/integrations/hooks/2'
      );
    });

    // New test case for connectDialogflowTest
    it('#connectDialogflowTest', () => {
      const payload = { token: 'testToken' };
      integrationAPI.connectDialogflowTest(payload);
      expect(axiosMock.post).toHaveBeenCalledWith(
        '/api/v1/integrations/dialogflow_test',
        payload
      );
    });

    // Additional test for error handling in connectSlack
    it('#connectSlack - handles error', async () => {
      axiosMock.post.mockImplementationOnce(() =>
        Promise.reject(new Error('Network Error'))
      );
      await expect(
        integrationAPI.connectSlack({ code: 'invalid_code', workspaceId: '12345' })
      ).rejects.toThrow('Network Error');
    });

    // Additional test for error handling in connectDialogflowTest
    it('#connectDialogflowTest - handles error', async () => {
      axiosMock.post.mockImplementationOnce(() =>
        Promise.reject(new Error('Invalid Token'))
      );
      await expect(
        integrationAPI.connectDialogflowTest({ token: 'invalidToken' })
      ).rejects.toThrow('Invalid Token');
    });
  });
});
