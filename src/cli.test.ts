import { describe, it, expect } from 'vitest';

describe('CLI', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should have correct package name', () => {
    const packageJson = require('../package.json');
    expect(packageJson.name).toBe('createforge');
  });

  it('should have correct version format', () => {
    const packageJson = require('../package.json');
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
