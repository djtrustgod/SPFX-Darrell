import { Version } from '@microsoft/sp-core-library';
/* 
Darrell:  Added extra property panes field types per
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part
---
These properties can be predefined with default values.  
See https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries
*/
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpfxCssDevWebPart.module.scss';
import * as strings from 'SpfxCssDevWebPartStrings';
/* 

Darrell:  Update the web part properties to include the new properties. This maps the fields to typed objects.r
https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part

*/
export interface ISpfxCssDevWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

export default class SpfxCssDevWebPart extends BaseClientSideWebPart<ISpfxCssDevWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.spfxCssDev}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to My SPFX Playground App!</span>
              <p class="${styles.subTitle}">Edit the web part to display the properties:</p>
              <!-- Darrell: displaying Customized Properties -->
              <p class="${styles.description}">${escape(this.properties.description)}</p>
              <p class="${styles.description}">${escape(this.properties.test)}</p>
              <p class="${styles.description}">${this.properties.test1}</p>
              <p class="${styles.description}">${escape(this.properties.test2)}</p>
              <p class="${styles.description}">${this.properties.test3}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }
  /* Darrell Note: See https://dreamsof.dev/2020-09-21-typescript-upgrade-breaking-dataversion-get-override-spfx11/ */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  /*
  Darrell
  Replace the getPropertyPaneConfiguration() method with the following code, which adds the new property pane fields and maps them to their respective typed objects.
  
  */
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
                  label: 'Description'
                }),
                PropertyPaneTextField('test', {
                  label: 'Multi-line Text Field',
                  multiline: true
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Checkbox'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'One' },
                    { key: '2', text: 'Two' },
                    { key: '3', text: 'Three' },
                    { key: '4', text: 'Four' }
                  ]
                }),
                PropertyPaneToggle('test3', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
