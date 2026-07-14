import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


export interface WishlistProperty {

  id: number;

  title: string;

  description: string;

  location: string;

  pricePerNight: number;

  bedrooms: number;

  bathrooms: number;

  available: boolean;

}


export interface WishlistUser {

  userId: number;

  name: string;

  email: string;

}


export interface WishlistItem {

  id: number;

  user: WishlistUser;

  property: WishlistProperty;

}


@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  private apiUrl =
    'http://localhost:8091/wishlist';


  constructor(
    private http: HttpClient
  ) {}


  addToWishlist(
    userId: number,
    propertyId: number
  ): Observable<WishlistItem> {

    return this.http.post<WishlistItem>(

      `${this.apiUrl}/add/${userId}/${propertyId}`,

      {}

    );

  }


  getWishlistByUserId(
    userId: number
  ): Observable<WishlistItem[]> {

    return this.http.get<WishlistItem[]>(

      `${this.apiUrl}/user/${userId}`

    );

  }


  checkWishlist(
    userId: number,
    propertyId: number
  ): Observable<boolean> {

    return this.http.get<boolean>(

      `${this.apiUrl}/check/${userId}/${propertyId}`

    );

  }


  removeFromWishlist(
    userId: number,
    propertyId: number
  ): Observable<string> {

    return this.http.delete(

      `${this.apiUrl}/remove/${userId}/${propertyId}`,

      {
        responseType: 'text'
      }

    );

  }

}