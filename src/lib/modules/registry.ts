import { IMapPilotModule, BaseModuleConfig } from "./types";

class ModuleRegistryService {
  private modules: Map<string, IMapPilotModule>;

  constructor() {
    this.modules = new Map();
  }

  /**
   * Register a new module in the core system.
   * This should typically be called during the application boot phase.
   */
  public register(module: IMapPilotModule): void {
    if (this.modules.has(module.config.slug)) {
      console.warn(`Module with slug ${module.config.slug} is already registered.`);
      return;
    }

    this.validateDependencies(module);
    this.modules.set(module.config.slug, module);
    console.log(`[ModuleRegistry] Successfully registered module: ${module.config.name} (v${module.config.version})`);
  }

  /**
   * Retrieve a specific module by its slug.
   */
  public getModule(slug: string): IMapPilotModule | undefined {
    return this.modules.get(slug);
  }

  /**
   * Get all registered module configurations.
   */
  public getAllModules(): BaseModuleConfig[] {
    return Array.from(this.modules.values()).map(m => m.config);
  }

  /**
   * Ensure that the module's dependencies are met.
   */
  private validateDependencies(module: IMapPilotModule): void {
    if (!module.dependencies || module.dependencies.length === 0) return;

    for (const depSlug of module.dependencies) {
      if (!this.modules.has(depSlug)) {
        throw new Error(
          `Module ${module.config.slug} requires dependency ${depSlug}, which is not registered. Please ensure correct initialization order.`
        );
      }
    }
  }
}

// Export as a singleton
export const ModuleRegistry = new ModuleRegistryService();
