import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SPfxKeepAlive1WebPart.module.scss';
import * as strings from 'SPfxKeepAlive1WebPartStrings';

export interface ISPfxKeepAlive1WebPartProps {
  description: string;
}

export default class SPfxKeepAlive1WebPart extends BaseClientSideWebPart<ISPfxKeepAlive1WebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.sPfxKeepAlive1 }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Keep Alive my Dev</span>
              <p class="${ styles.subTitle }">Keeping it alive since the 2010s.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
