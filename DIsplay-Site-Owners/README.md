# Display Site Owners

## Summary

This SharePoint Framework (SPFx) web part displays the current site owners for a SharePoint site. It fetches owner information from the SharePoint REST API and presents it in a clean, professional interface using Microsoft Fluent UI components.

The web part automatically retrieves users from the site's Associated Owner Group and displays each owner with their profile picture, name, and email address in an intuitive card-based layout.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

- SharePoint Online environment
- Permissions to access site owner information
- Node.js v16 or v18 (for development)

## Solution

| Solution             | Author(s) |
| -------------------- | --------- |
| Display-Site-Owners  | -         |

## Version history

| Version | Date              | Comments        |
| ------- | ----------------- | --------------- |
| 0.0.1   | November 23, 2025 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Installation

- Clone this repository
- Navigate to the solution folder
- In the command line, run:
  - `npm install`
  - `gulp serve`

## Features

This web part provides the following functionality:

- **Automatic Site Owner Retrieval**: Fetches site owners from the SharePoint Associated Owner Group via REST API
- **User-Friendly Display**: Shows owner information with profile pictures, names, and email addresses
- **Fluent UI Integration**: Uses Microsoft Fluent UI components (Persona, Spinner, MessageBar, Stack) for a consistent Microsoft 365 experience
- **Loading States**: Displays a loading spinner while fetching data
- **Error Handling**: Shows user-friendly error messages when issues occur
- **Responsive Design**: Professional card-based layout with hover effects and theme-aware styling
- **Multi-Platform Support**: Works in SharePoint, Microsoft Teams, Outlook, and Office
- **Empty State Handling**: Provides helpful messaging when no owners are found

This web part demonstrates the following SPFx concepts:

- Using SPHttpClient for SharePoint REST API calls
- React component state management and lifecycle methods
- Integration with Fluent UI React components
- Theme-aware styling with CSS variables
- Error handling and user feedback patterns
- TypeScript interfaces and type safety

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
