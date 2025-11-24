## Plan: Display SharePoint Site Owners in SPFx Web Part

Build functionality to fetch and display the current SharePoint Site Owners using the SharePoint REST API. The existing project is a fresh scaffold with boilerplate code that needs to be replaced with site owner display logic. Ensure the UI is clean and professional, leveraging Fluent UI components.

### Steps

1. **Create data model interface** for site owners with properties like id, title, email, and loginName in `src/webparts/dIsplaySiteOwners/components/` or inline in component file

2. **Add API service method** in `DisplaySiteOwnersWebPart.ts` to fetch site owners using `this.context.spHttpClient` with REST endpoint `/_api/web/AssociatedOwnerGroup/Users`

3. **Update props interface** in `IDisplaySiteOwnersProps.ts` to pass `spHttpClient` and `siteUrl` (or pass fetched data directly)

4. **Implement UI in React component** in `DisplaySiteOwners.tsx` - add state management, fetch data in lifecycle/effect, replace boilerplate content with Fluent UI components (like `DetailsList` or `Persona`) to display owners with loading and error states

5. **Update styling** in `DisplaySiteOwners.module.scss` to remove welcome screen styles and add professional styling for the site owners list/cards

### Further Considerations

1. **Data fetching approach**: Option A - Fetch in `DisplaySiteOwnersWebPart.ts` and pass data as props (cleaner separation) / Option B - Pass `spHttpClient` context to component for direct API calls (more flexible)

2. **UI component choice**: Use Fluent UI `Persona` components for rich user cards with avatars / Use `DetailsList` for tabular display / Use custom cards for minimalist design
