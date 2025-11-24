import { SPHttpClient } from '@microsoft/sp-http';

export interface ISiteOwner {
  Id: number;
  Title: string;
  Email: string;
  LoginName: string;
}

export interface IDisplaySiteOwnersProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
