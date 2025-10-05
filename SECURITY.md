# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of CreateForge seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do Not

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed

### Please Do

1. **Email**: Send details to the repository owner via GitHub
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Next release cycle

### Security Update Process

1. Vulnerability is reported and confirmed
2. Fix is developed and tested
3. Security advisory is prepared
4. Patch is released
5. Advisory is published
6. Users are notified

## Security Best Practices for Users

### When Using CreateForge

1. **Keep Updated**: Always use the latest version
   ```bash
   npm update -g createforge
   ```

2. **Review Generated Code**: Inspect templates before deploying
3. **Environment Variables**: Never commit `.env` files
4. **API Keys**: Use environment variables, not hardcoded values
5. **Dependencies**: Keep generated project dependencies updated

### For Generated Projects

1. **Regular Updates**:
   ```bash
   npm audit
   npm audit fix
   ```

2. **Security Scanning**:
   - Enable Dependabot on GitHub
   - Use GitHub Security Advisories
   - Run `npm audit` regularly

3. **Environment Security**:
   - Use `.env.local` for secrets
   - Never commit sensitive data
   - Use secret management tools in production

4. **Authentication**:
   - Use recommended auth plugins (Clerk, Auth0)
   - Implement proper session management
   - Enable 2FA where possible

## Known Security Considerations

### Template Sources
- Templates are cloned from GitHub repositories
- Always review template code before using
- Report suspicious templates

### Plugin System
- Plugins install npm packages
- Review plugin code before installation
- Only use trusted plugins

### Environment Variables
- CreateForge creates `.env.local` files
- Ensure these are in `.gitignore`
- Never share or commit these files

## Security Features

### Built-in Protections

1. **Dependency Validation**: Uses npm's security features
2. **Git Initialization**: Automatically adds `.gitignore`
3. **Environment Files**: Creates `.env.local` (gitignored by default)
4. **Template Validation**: Checks template structure

### Recommended Practices

1. **Use Official Templates**: Start with battle-tested templates
2. **Review Changes**: Check what files are created
3. **Audit Dependencies**: Run `npm audit` after creation
4. **Enable Security Features**: Use GitHub security features

## Vulnerability Disclosure Timeline

We aim to:
- Acknowledge reports within 48 hours
- Provide initial assessment within 1 week
- Release patches based on severity
- Publish advisories after fixes are available

## Security Hall of Fame

We appreciate security researchers who help keep CreateForge safe. Responsible disclosures will be acknowledged here (with permission).

## Contact

For security issues, please contact:
- GitHub: [@Om7035](https://github.com/Om7035)
- Repository: [CreateForge Issues](https://github.com/Om7035/createforge/issues) (for non-security bugs)

## Additional Resources

- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [GitHub Security Features](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

---

**Last Updated**: 2025-10-06  
**Version**: 0.1.0
