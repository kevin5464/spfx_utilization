import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'utilizationToolStrings';
import UtilizationTool from './components/UtilizationTool';
import { IUtilizationToolProps } from './components/IUtilizationToolProps';
import { IUtilizationToolWebPartProps } from './IUtilizationToolWebPartProps';

export default class UtilizationToolWebPart extends BaseClientSideWebPart<IUtilizationToolWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IUtilizationToolProps > = React.createElement(
      UtilizationTool,
      {
          description: this.properties.description,
          context: this.context          
      }
    );

    ReactDom.render(element, this.domElement);
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
