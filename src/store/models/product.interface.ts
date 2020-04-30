export interface ILocation {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

export enum ProductModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}