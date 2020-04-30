import { GraphQLClient } from 'graphql-request';

import { environment } from '../config/environment';
export class ApiService {
    protected basePath: string = environment.apiBase;
    private graphQLClient = new GraphQLClient(this.basePath);

    public async authenticatedGqlQuery(query: string): Promise<any> {

        const headers = {
            'Content-Type': 'application/json',
        };

        this.graphQLClient.setHeaders(headers);

        const response = await this.graphQLClient.request(query);
        return response;
    }

}
