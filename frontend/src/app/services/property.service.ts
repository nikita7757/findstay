import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Property
} from '../models/property';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {


private apiUrl = "https://findstay-4353.onrender.com/properties";


  constructor(
    private http: HttpClient
  ) {}


  /* ADD PROPERTY */

  addProperty(
    property: Property
  ): Observable<Property> {

    return this.http.post<Property>(
      `${this.apiUrl}/add-property`,
      property
    );

  }


  /* GET ALL PROPERTIES */

  getAllProperties():
    Observable<Property[]> {

    return this.http.get<Property[]>(
      `${this.apiUrl}/all`
    );

  }


  /* GET PROPERTY BY ID */

  getPropertyById(
    id: number
  ): Observable<Property> {

    return this.http.get<Property>(
      `${this.apiUrl}/${id}`
    );

  }


  /* SEARCH PROPERTY BY LOCATION */

  searchProperties(
    location: string
  ): Observable<Property[]> {

    const params =
      new HttpParams()
        .set(
          'location',
          location.trim()
        );


    console.log(
      'Property Service Search Location:',
      location
    );


    return this.http.get<Property[]>(
      `${this.apiUrl}/search/location`,
      {
        params: params
      }
    );

  }


  /* GET PROPERTIES BY HOST */

  getPropertiesByHostId(
    hostId: number
  ): Observable<Property[]> {

    return this.http.get<Property[]>(
      `${this.apiUrl}/host/${hostId}`
    );

  }


  /* UPDATE PROPERTY */

  updateProperty(
    id: number,
    property: Property
  ): Observable<Property> {

    return this.http.put<Property>(
      `${this.apiUrl}/${id}`,
      property
    );

  }

}
