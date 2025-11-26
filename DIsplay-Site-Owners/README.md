# Display Site Owners

## Summary

This SharePoint Framework (SPFx) web part displays site owners for SharePoint sites and Microsoft 365 Group owners for group-connected sites. It fetches owner information from both the SharePoint REST API and Microsoft Graph API, presenting it in a clean, professional interface using Microsoft Fluent UI components.

The web part automatically retrieves users from the site's Associated Owner Group and, for group-connected sites, also fetches Microsoft 365 Group owners. Each owner is displayed with their profile picture, name, and clickable email address in an intuitive card-based layout with separate sections for site and group owners.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

- SharePoint Online environment
- Permissions to access site owner information
- Microsoft Graph API permission: `Group.Read.All` (requires tenant admin approval)
- Node.js v16 or v18 (for development)

## Solution

| Solution             | Author(s) |
| -------------------- | --------- |
| Display-Site-Owners  | -         |

## Version history

| Version | Date              | Comments                                                                 |
| ------- | ----------------- | ------------------------------------------------------------------------ |
| 0.2.1.0 | November 26, 2025 | Bug fixes: loading spinner, display logic, and icon rendering            |
| 0.2.0.0 | November 26, 2025 | Added Microsoft 365 Group owners support and clickable email links      |
| 0.0.1   | November 23, 2025 | Initial release with SharePoint site owners display                      |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Installation

1. Clone this repository
2. Navigate to the solution folder
3. In the command line, run:
   - `npm install`
   - `gulp build`
   - `gulp bundle --ship`
   - `gulp package-solution --ship`
4. Deploy the `DisplaySiteOwners.sppkg` file from the `sharepoint/solution` folder to your tenant App Catalog
5. **Important**: A tenant administrator must approve the Microsoft Graph API permissions in SharePoint Admin Center → API access
6. Add the web part to any SharePoint page

### Development

To test locally:
- `gulp serve`

## Features

This web part provides the following functionality:

- **Automatic Site Owner Retrieval**: Fetches site owners from the SharePoint Associated Owner Group via REST API
- **Microsoft 365 Group Owners**: Automatically detects group-connected sites and displays group owners via Microsoft Graph API
- **Dual-Section Display**: Shows SharePoint site owners and Microsoft 365 Group owners in separate, clearly labeled sections
- **Clickable Email Links**: Email addresses are interactive `mailto:` links with theme-aware styling
- **User-Friendly Display**: Shows owner information with profile pictures, names, and email addresses
- **Fluent UI Integration**: Uses Microsoft Fluent UI components (Persona, Spinner, MessageBar, Stack) for a consistent Microsoft 365 experience
- **Loading States**: Displays a loading spinner while fetching data from both APIs
- **Error Handling**: Shows user-friendly error messages when issues occur
- **Responsive Design**: Professional card-based layout with hover effects and theme-aware styling
- **Multi-Platform Support**: Works in SharePoint, Microsoft Teams, Outlook, and Office
- **Empty State Handling**: Provides helpful messaging when no owners are found

This web part demonstrates the following SPFx concepts:

- Using SPHttpClient for SharePoint REST API calls
- Using MSGraphClientV3 for Microsoft Graph API calls
- React component state management and lifecycle methods
- Integration with Fluent UI React components
- Theme-aware styling with CSS variables
- Error handling and user feedback patterns
- TypeScript interfaces and type safety
- API permission requests in SPFx solutions

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
