export interface Place {
  name: string;
  description: string; // Short description for the card
  fullDescription: string; // Longer editorial introduction
  nycConnectionText: string; // Why it matches the NYC twin
  mustTry: string; // Curiosities or specific recommendations
  nycEquivalent: string;
  location: string;
  vibe: string;
  imageUrl?: string; // Specific image override
}

export interface Category {
  id: string;
  title: string;
  places: Place[];
  imageKeyword: string;
}

export interface CityData {
  cityName: string;
  categories: Category[];
}

export enum AppState {
  INTRO = 'INTRO',
  LOADING = 'LOADING',
  DASHBOARD = 'DASHBOARD',
  ERROR = 'ERROR'
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}