import * as React from 'react';
import styles from './DisplaySiteOwners.module.scss';
import type { IDisplaySiteOwnersProps, ISiteOwner } from './IDisplaySiteOwnersProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack } from '@fluentui/react/lib/Stack';

interface IGraphOwner {
  id: string;
  displayName: string;
  mail?: string;
  userPrincipalName: string;
}

export interface IDisplaySiteOwnersState {
  siteOwners: ISiteOwner[];
  groupOwners: ISiteOwner[];
  loading: boolean;
  error: string | undefined;
  isGroupConnected: boolean;
}

export default class DisplaySiteOwners extends React.Component<IDisplaySiteOwnersProps, IDisplaySiteOwnersState> {
  constructor(props: IDisplaySiteOwnersProps) {
    super(props);
    this.state = {
      siteOwners: [],
      groupOwners: [],
      loading: true,
      error: undefined,
      isGroupConnected: !!props.groupId
    };
  }

  public componentDidMount(): void {
    this._loadOwners().catch((error) => {
      console.error('Error loading owners:', error);
    });
  }

  private async _loadOwners(): Promise<void> {
    try {
      await this._loadSiteOwners();
      if (this.state.isGroupConnected && this.props.groupId && this.props.graphClient) {
        await this._loadGroupOwners();
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message || 'An error occurred while loading owners.'
      });
    }
  }

  private async _loadSiteOwners(): Promise<void> {
    const { spHttpClient, siteUrl } = this.props;

    const response: SPHttpClientResponse = await spHttpClient.get(
      `${siteUrl}/_api/web/AssociatedOwnerGroup/Users?$select=Id,Title,Email,LoginName`,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch site owners: ${response.statusText}`);
    }

    const data = await response.json();
    const owners: ISiteOwner[] = data.value;

    this.setState({
      siteOwners: owners,
      loading: this.state.isGroupConnected,
      error: undefined
    });
  }

  private async _loadGroupOwners(): Promise<void> {
    const { graphClient, groupId } = this.props;

    if (!graphClient || !groupId) {
      this.setState({ loading: false });
      return;
    }

    try {
      const response = await graphClient
        .api(`/groups/${groupId}/owners`)
        .select('id,displayName,mail,userPrincipalName')
        .get();

      const groupOwners: ISiteOwner[] = response.value.map((owner: IGraphOwner) => ({
        Id: owner.id,
        Title: owner.displayName,
        Email: owner.mail || owner.userPrincipalName,
        LoginName: owner.userPrincipalName
      }));

      this.setState({
        groupOwners,
        loading: false,
        error: undefined
      });
    } catch (error) {
      console.error('Error loading group owners:', error);
      this.setState({
        loading: false
      });
    }
  }

  private _renderOwnerCard(owner: ISiteOwner): JSX.Element {
    return (
      <div key={owner.Id} className={styles.ownerCard}>
        <Persona
          text={owner.Title}
          secondaryText={owner.Email}
          size={PersonaSize.size48}
          imageUrl={`${this.props.siteUrl}/_layouts/15/userphoto.aspx?size=M&username=${owner.Email}`}
          className={styles.persona}
          onRenderSecondaryText={() => (
            <a href={`mailto:${owner.Email}`} className={styles.emailLink}>
              {owner.Email}
            </a>
          )}
        />
      </div>
    );
  }

  public render(): React.ReactElement<IDisplaySiteOwnersProps> {
    const { hasTeamsContext } = this.props;
    const { siteOwners, groupOwners, loading, error, isGroupConnected } = this.state;

    return (
      <section className={`${styles.displaySiteOwners} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.header}>
          <h2>Site Owners</h2>
        </div>

        {loading && (
          <div className={styles.loading}>
            <Spinner size={SpinnerSize.large} label="Loading owners..." />
          </div>
        )}

        {error && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {error}
          </MessageBar>
        )}

        {!loading && !error && siteOwners.length === 0 && groupOwners.length === 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            No owners found.
          </MessageBar>
        )}

        {!loading && !error && !isGroupConnected && siteOwners.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>SharePoint Site Owners</h3>
            <Stack tokens={{ childrenGap: 15 }} className={styles.ownersContainer}>
              {siteOwners.map((owner) => this._renderOwnerCard(owner))}
            </Stack>
          </div>
        )}

        {!loading && !error && isGroupConnected && groupOwners.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Microsoft 365 Group Owners</h3>
            <Stack tokens={{ childrenGap: 15 }} className={styles.ownersContainer}>
              {groupOwners.map((owner) => this._renderOwnerCard(owner))}
            </Stack>
          </div>
        )}
      </section>
    );
  }
}
