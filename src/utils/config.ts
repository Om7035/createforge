import Conf from 'conf';

interface ProfileConfig {
  name?: string;
  favoriteStack?: string[];
  codeStyle?: string;
  allowedLibs?: string[];
}

interface TemplatesConfig {
  favorites: string[];
  recent: string[];
}

interface StatsConfig {
  projectsCreated: number;
  lastUsed?: string;
  firstSuccess?: string;
}

interface TelemetryConfig {
  enabled: boolean;
}

export interface ForgeConfig {
  profile: ProfileConfig;
  templates: TemplatesConfig;
  stats: StatsConfig;
  telemetry: TelemetryConfig;
}

const defaultConfig: ForgeConfig = {
  profile: {
    favoriteStack: [],
    allowedLibs: [],
  },
  templates: {
    favorites: [],
    recent: [],
  },
  stats: {
    projectsCreated: 0,
  },
  telemetry: {
    enabled: false,
  },
};

export const config = new Conf({
  projectName: 'createforge',
  defaults: defaultConfig,
});

export function updateStats(event: 'project_created' | 'first_success') {
  const currentConfig = config.store;
  
  if (event === 'project_created') {
    const updatedConfig = {
      ...currentConfig,
      stats: {
        ...currentConfig.stats,
        projectsCreated: currentConfig.stats.projectsCreated + 1,
        lastUsed: new Date().toISOString()
      }
    };
    config.store = updatedConfig;
  }
  
  if (event === 'first_success' && !currentConfig.stats.firstSuccess) {
    const updatedConfig = {
      ...currentConfig,
      stats: {
        ...currentConfig.stats,
        firstSuccess: new Date().toISOString()
      }
    };
    config.store = updatedConfig;
  }
}

export function addRecentTemplate(template: string) {
  const currentConfig = config.store;
  const updated = [template, ...currentConfig.templates.recent.filter((t: string) => t !== template)].slice(0, 5);
  const updatedConfig = {
    ...currentConfig,
    templates: {
      ...currentConfig.templates,
      recent: updated
    }
  };
  config.store = updatedConfig;
}

export function getFavoriteStack(): string[] {
  return config.store.profile.favoriteStack || [];
}

export function setFavoriteStack(stack: string[]) {
  const currentConfig = config.store;
  const updatedConfig = {
    ...currentConfig,
    profile: {
      ...currentConfig.profile,
      favoriteStack: stack
    }
  };
  config.store = updatedConfig;
}
