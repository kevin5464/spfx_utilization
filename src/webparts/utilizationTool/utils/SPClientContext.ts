import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ISPListItemsResponse } from './ISPListItemsResponse';

export class SPClientContext {

    private _client: SPHttpClient = null;
    private _webUrl: string = "";

    public constructor(client: SPHttpClient, webUrl: string) {
        this._client = client;
        this._webUrl = webUrl;
    }    

    public GetListItems(listName: string): Promise<ISPListItemsResponse> {
        var requestUrl = this._webUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items";
        return this._client.get(requestUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .catch((error: any) => {
                return error;
            });
    } 
}

