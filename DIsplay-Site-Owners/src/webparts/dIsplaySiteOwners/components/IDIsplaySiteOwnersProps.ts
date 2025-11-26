import { SPHttpClient, MSGraphClientV3 } from '@microsoft/sp-http';

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
  graphClient: MSGraphClientV3 | undefined;
  groupId: string | undefined;
}
