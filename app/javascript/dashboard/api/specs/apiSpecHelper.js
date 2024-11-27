import describeWithAPIMock from './apiSpecHelper'; // Import the utility
import IntegrationsAPI from './IntegrationsAPI'; // The file containing your API logic

describeWithAPIMock('IntegrationsAPI', function () {
  it('should call connectDialogflowTest with correct arguments', async function () {
    const dialogflowConfig = { project_id: 'project123', key: 'service-key' };

    await IntegrationsAPI.connectDialogflowTest(dialogflowConfig);

    // Validate that the mock axios POST method was called with the expected URL and data
    expect(this.axiosMock.post).toHaveBeenCalledWith(
      '/integrations/apps/integrations/dialogflow_test',
      dialogflowConfig
    );
  });

  it('should call deleteDialogflowTest with the correct integration ID', async function () {
    const integrationId = 42;

    await IntegrationsAPI.deleteDialogflowTest(integrationId);

    // Validate that the mock axios DELETE method was called with the correct URL
    expect(this.axiosMock.delete).toHaveBeenCalledWith(
      `/integrations/apps/integrations/dialogflow_test/${integrationId}`
    );
  });
});
