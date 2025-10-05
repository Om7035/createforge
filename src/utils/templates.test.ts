import { describe, it, expect } from 'vitest';
import { templates, getTemplate, getFeaturedTemplates } from './templates.js';

describe('Templates Utility', () => {
  it('should have templates defined', () => {
    expect(templates).toBeDefined();
    expect(Array.isArray(templates)).toBe(true);
    expect(templates.length).toBeGreaterThan(0);
  });

  it('should have valid template structure', () => {
    templates.forEach(template => {
      expect(template.id).toBeDefined();
      expect(template.name).toBeDefined();
      expect(template.description).toBeDefined();
      expect(template.repo).toBeDefined();
      expect(typeof template.id).toBe('string');
      expect(typeof template.name).toBe('string');
    });
  });

  it('should get template by id', () => {
    const firstTemplate = templates[0];
    const found = getTemplate(firstTemplate.id);
    expect(found).toBeDefined();
    expect(found?.id).toBe(firstTemplate.id);
  });

  it('should return null or undefined for non-existent template', () => {
    const found = getTemplate('non-existent-template-id-12345');
    expect(found).toBeFalsy();
  });

  it('should get featured templates', () => {
    const featured = getFeaturedTemplates();
    expect(Array.isArray(featured)).toBe(true);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(templates.length);
  });

  it('featured templates should be marked as featured', () => {
    const featured = getFeaturedTemplates();
    featured.forEach(template => {
      expect(template.featured).toBe(true);
    });
  });
});
