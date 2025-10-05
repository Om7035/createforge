import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('CLI Package Configuration', () => {
  const packageJson = JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf-8')
  );

  it('should have correct package name', () => {
    expect(packageJson.name).toBe('createforge');
  });

  it('should have correct version format', () => {
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should have binary commands configured', () => {
    expect(packageJson.bin).toBeDefined();
    expect(packageJson.bin.createforge).toBe('./dist/cli.js');
    expect(packageJson.bin.forge).toBe('./dist/cli.js');
  });

  it('should have MIT license', () => {
    expect(packageJson.license).toBe('MIT');
  });

  it('should have repository configured', () => {
    expect(packageJson.repository).toBeDefined();
    expect(packageJson.repository.type).toBe('git');
    expect(packageJson.repository.url).toContain('github.com');
  });

  it('should have required dependencies', () => {
    expect(packageJson.dependencies).toBeDefined();
    expect(packageJson.dependencies['@clack/prompts']).toBeDefined();
    expect(packageJson.dependencies['commander']).toBeDefined();
    expect(packageJson.dependencies['execa']).toBeDefined();
  });

  it('should require Node.js 18+', () => {
    expect(packageJson.engines.node).toBe('>=18.0.0');
  });
});
