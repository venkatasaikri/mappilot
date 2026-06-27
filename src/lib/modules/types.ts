export interface BaseModuleConfig {
  slug: string;
  name: string;
  description: string;
  version: string;
  
  // Defines if this module has a settings page that needs rendering
  hasSettingsPage?: boolean;
  
  // Defines if this module provides dashboard widgets
  hasDashboardWidgets?: boolean;
}

export interface ModuleIntegrationContext {
  tenantId?: string;
  locationId?: string;
  userId?: string;
}

export interface IMapPilotModule {
  // Core Information
  config: BaseModuleConfig;

  // Lifecycle Hooks
  onInstall?: () => Promise<void>;
  onUninstall?: () => Promise<void>;
  onEnable?: (context: ModuleIntegrationContext) => Promise<void>;
  onDisable?: (context: ModuleIntegrationContext) => Promise<void>;

  // Dependency Management
  dependencies?: string[]; // Slugs of other modules required by this module
}
