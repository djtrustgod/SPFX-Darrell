import * as React from 'react';
import styles from './DisplaySiteOwners.module.scss';
import type { IDisplaySiteOwnersProps, ISiteOwner } from './IDisplaySiteOwnersProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack } from '@fluentui/react/lib/Stack';

export interface IDisplaySiteOwnersState {
  siteOwners: ISiteOwner[];
  loading: boolean;
  error: string | undefined;
}

export default class DisplaySiteOwners extends React.Component<IDisplaySiteOwnersProps, IDisplaySiteOwnersState> {
  constructor(props: IDisplaySiteOwnersProps) {
    super(props);
    this.state = {
      siteOwners: [],
      loading: true,
      error: undefined
    };
  }

  public componentDidMount(): void {
    this._loadSiteOwners().catch((error) => {
      console.error('Error loading site owners:', error);
    });
  }

  private async _loadSiteOwners(): Promise<void> {
    const { spHttpClient, siteUrl } = this.props;

    try {
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
        loading: false,
        error: undefined
      });
    } catch (error) {
      this.setState({
        siteOwners: [],
        loading: false,
        error: error.message || 'An error occurred while loading site owners.'
      });
    }
  }

  public render(): React.ReactElement<IDisplaySiteOwnersProps> {
    const { hasTeamsContext } = this.props;
    const { siteOwners, loading, error } = this.state;

    return (
      <section className={`${styles.displaySiteOwners} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.header}>
          <h2>Site Owners</h2>
        </div>

        {loading && (
          <div className={styles.loading}>
            <Spinner size={SpinnerSize.large} label="Loading site owners..." />
          </div>
        )}

        {error && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {error}
          </MessageBar>
        )}

        {!loading && !error && siteOwners.length === 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            No site owners found.
          </MessageBar>
        )}

        {!loading && !error && siteOwners.length > 0 && (
          <Stack tokens={{ childrenGap: 15 }} className={styles.ownersContainer}>
            {siteOwners.map((owner) => (
              <div key={owner.Id} className={styles.ownerCard}>
                <Persona
                  text={owner.Title}
                  secondaryText={owner.Email}
                  size={PersonaSize.size48}
                  imageUrl={`${this.props.siteUrl}/_layouts/15/userphoto.aspx?size=M&username=${owner.Email}`}
                  className={styles.persona}
                />
              </div>
            ))}
          </Stack>
        )}
      </section>
    );
  }
}
