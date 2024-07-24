class Integrations::App
  attr_accessor :params

  def initialize(params)
    @params = params
  end

  def id
    params[:id]
  end

  def name
    I18n.t("integration_apps.#{params[:i18n_key]}.name")
  end

  def description
    I18n.t("integration_apps.#{params[:i18n_key]}.description")
  end

  def logo
    params[:logo]
  end

  def fields
    params[:fields]
  end

  def action
    case params[:id]
    when 'slack'
      "#{params[:action]}&client_id=#{ENV.fetch('SLACK_CLIENT_ID', nil)}&redirect_uri=#{self.class.slack_integration_url}"
    else
      params[:action]
    end
  end

  def active?(account)
    case params[:id]
    when 'slack'
      ENV['SLACK_CLIENT_SECRET'].present?
    when 'linear'
<<<<<<< HEAD
      account.feature_enabled?('linear_integration')
    when 'captain'
      account.feature_enabled?('captain_integration') && ENV['CAPTAIN_API_URL'].present?
=======
      Current.account.feature_enabled?('linear_integration')
>>>>>>> 39d20b197 (chore: Update the integration icons, logic for enabled/active attributes for the integration (#9828))
    else
      true
    end
  end

  def enabled?(account)
    case params[:id]
    when 'webhook'
      account.webhooks.exists?
<<<<<<< HEAD
<<<<<<< HEAD
    when 'dashboard_apps'
      account.dashboard_apps.exists?
=======
>>>>>>> 39d20b197 (chore: Update the integration icons, logic for enabled/active attributes for the integration (#9828))
=======
    when 'dashboard_apps'
      account.dashboard_apps.exists?
>>>>>>> 8b1d98af5 (feat: Update the design for integration page (#9825))
    else
      account.hooks.exists?(app_id: id)
    end
  end

  def hooks
    Current.account.hooks.where(app_id: id)
  end

  def self.slack_integration_url
    "#{ENV.fetch('FRONTEND_URL', nil)}/app/accounts/#{Current.account.id}/settings/integrations/slack"
  end

  class << self
    def apps
      Hashie::Mash.new(APPS_CONFIG)
    end

    def all
      apps.values.each_with_object([]) do |app, result|
        result << new(app)
      end
    end

    def find(params)
      all.detect { |app| app.id == params[:id] }
    end
  end
end
