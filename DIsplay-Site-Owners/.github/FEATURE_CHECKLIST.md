# Feature Implementation Checklist

Use this checklist whenever adding new features to the DisplaySiteOwners web part.

## Pre-Implementation

- [ ] Review current plan in `.github/prompts/plan-displaySiteOwners.prompt.md`
- [ ] Check current version in `config/package-solution.json`
- [ ] Create feature branch (optional, if using Git flow)

## During Implementation

- [ ] Write/modify code in appropriate files
- [ ] Add TypeScript interfaces if needed
- [ ] Update component state/props as required
- [ ] Add appropriate error handling
- [ ] Include loading states for async operations
- [ ] Add CSS styling for new UI elements
- [ ] Follow existing code patterns and conventions

## Testing

- [ ] Run `gulp clean` to clear build artifacts
- [ ] Run `gulp build` to verify compilation
- [ ] Fix any TypeScript errors or linting warnings
- [ ] Test with `gulp serve` in local workbench
- [ ] Test in SharePoint environment (if applicable)
- [ ] Verify all scenarios (success, error, loading, empty states)

## Documentation Updates (REQUIRED)

### 1. Update Plan File
**File**: `.github/prompts/plan-displaySiteOwners.prompt.md`

- [ ] Add new feature to "Implemented Features" section
- [ ] Update version number at top
- [ ] Add any new API endpoints or technical details
- [ ] Update "Technical Architecture" if structure changed
- [ ] Add new configuration requirements if any

### 2. Update README
**File**: `README.md`

- [ ] Update "Summary" section if core functionality changed
- [ ] Add new feature to "Features" list with description
- [ ] Update version history table with new entry
- [ ] Add new prerequisites if required (API permissions, etc.)
- [ ] Update installation steps if deployment changed
- [ ] Update "Applies to" section if platform support changed

### 3. Update Package Version
**File**: `config/package-solution.json`

- [ ] Increment version number following semantic versioning:
  - **Patch** (0.0.X): Bug fixes, minor changes
  - **Minor** (0.X.0): New features, backwards compatible
  - **Major** (X.0.0): Breaking changes

### 4. Update Manifest (if UI changed)
**File**: `src/webparts/dIsplaySiteOwners/DisplaySiteOwnersWebPart.manifest.json`

- [ ] Update title/description if changed
- [ ] Update icon if changed
- [ ] Update preconfigured entry properties if needed

## Additional Updates (as needed)

- [ ] Update `package.json` if new npm packages added
- [ ] Add API permission requests in `package-solution.json`
- [ ] Update localization strings in `loc/` folder
- [ ] Add comments to complex code sections
- [ ] Update inline documentation

## Post-Implementation

- [ ] Final `gulp build` to ensure everything works
- [ ] Commit changes with descriptive message
- [ ] Create pull request (if using PR workflow)
- [ ] Update project board/issues (if applicable)

## Deployment (when ready)

- [ ] Run `gulp bundle --ship`
- [ ] Run `gulp package-solution --ship`
- [ ] Test the .sppkg package
- [ ] Deploy to App Catalog
- [ ] Approve API permissions (if new permissions added)
- [ ] Test in production environment
- [ ] Update deployment documentation if process changed

---

## Quick Reference: Version Numbering

**Format**: MAJOR.MINOR.PATCH.BUILD (e.g., 0.2.0.0)

- **MAJOR**: Incompatible API changes or major redesign
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, small improvements
- **BUILD**: Build number (usually 0 for SPFx)

## Example Feature Implementation Flow

1. User requests: "Add filtering by email domain"
2. Plan the implementation approach
3. Check off items in "During Implementation"
4. Run tests and fix issues
5. **STOP** - Before finishing, complete ALL "Documentation Updates"
6. Final build and verification
7. Commit/deploy

---

**Remember**: Documentation is part of the feature, not an afterthought!
