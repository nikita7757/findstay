export interface Property {

  id?: number;

  title: string;

  description: string;

  location: string;

  pricePerNight: number;

  bedrooms: number;

  bathrooms: number;

  available: boolean;

  host?: {
    userId: number;
  };

  category?: {
    id: number;
    title?: string;
    description?: string;
  };

}