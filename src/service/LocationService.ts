import { ApiService } from './ApiService';
import { ILocation } from '../store/models/product.interface';

export interface LocationRequest {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

export class LocationService {
    private apiService = new ApiService();
    public async createLocation(location: LocationRequest): Promise<ILocation> {
        const mutation: string = `
        mutation {
            createLocation(
              latitude: ${location.latitude}
              longitude: ${location.longitude}
              name: "${location.name}"
              description: "${location.description}"
            ) {
              location{
                id
                latitude
                longitude
                name
                description
              }
              errors{
                message
              }
            }
          }
          
      `;

        try {
            const response = await this.apiService.authenticatedGqlQuery(mutation);
            if (response.createLocation.location === null || response.createLocation.errors.length > 0) {
                throw (response.createLocation.errors);
            }
            const location: ILocation = response.createLocation.location;
            return location;
        } catch (error) {
            throw (error);
        }
    }
    public async getLocations(): Promise<ILocation[]> {
        const query: string = `
        query { getLocations(
            input: ""
          ) {
                locations{
                    id
                    latitude
                    longitude
                    name
                    description
                },
                errors{
                    message
                }
            }
        }
      `;

        try {
            const response = await this.apiService.authenticatedGqlQuery(query);
            if (response.getLocations.locations === null || response.getLocations.errors.length > 0) {
                throw (response.getLocations.errors);
            }
            const locations: ILocation[] = response.getLocations.locations;
            return locations;
        } catch (error) {
            throw (error);
        }
    }

}