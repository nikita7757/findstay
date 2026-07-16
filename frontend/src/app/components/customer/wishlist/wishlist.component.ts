import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  WishlistItem,
  WishlistService
} from '../../../services/wishlist.service';


interface WishlistDisplayItem
  extends WishlistItem {

  imageUrl: string;

}


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent
  implements OnInit {

  wishlistItems:
    WishlistDisplayItem[] = [];

  loading: boolean = true;

  removingPropertyId:
    number | null = null;

  private propertyImageApi =
    'http://findstay-backend.onrender.com/property-images';


  constructor(
    private wishlistService:
      WishlistService,

    private http:
      HttpClient,

    private router:
      Router
  ) {}


  ngOnInit(): void {

    this.loadWishlist();

  }


  loadWishlist(): void {

    const userId =
      localStorage.getItem('userId');

    if (!userId) {

      localStorage.setItem(
        'redirectAfterLogin',
        '/wishlist'
      );

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    this.loading = true;


    this.wishlistService
      .getWishlistByUserId(
        Number(userId)
      )
      .subscribe({

        next: (
          response: WishlistItem[]
        ) => {

          console.log(
            'Wishlist:',
            response
          );

          this.wishlistItems =
            response.map(item => ({

              ...item,

              imageUrl:
                'assets/property-placeholder.jpg'

            }));

          this.loading = false;

          this.loadPropertyImages();

        },


        error: (
          error: any
        ) => {

          console.error(
            'Wishlist Load Error:',
            error
          );

          this.loading = false;

        }

      });

  }


  loadPropertyImages(): void {

    this.wishlistItems.forEach(
      item => {

        this.http
          .get<any[]>(
            `${this.propertyImageApi}/property/${item.property.id}`
          )
          .subscribe({

            next: (
              images: any[]
            ) => {

              if (
                images &&
                images.length > 0
              ) {

                item.imageUrl =
                  images[0].imageUrl;

              }

            },


            error: (
              error: any
            ) => {

              console.error(
                'Wishlist Image Error:',
                error
              );

            }

          });

      }
    );

  }


  viewProperty(
    propertyId: number
  ): void {

    this.router.navigate([
      '/property',
      propertyId
    ]);

  }


  removeFromWishlist(
    event: Event,
    propertyId: number
  ): void {

    event.stopPropagation();


    const userId =
      localStorage.getItem('userId');


    if (!userId) {

      return;

    }


    this.removingPropertyId =
      propertyId;


    this.wishlistService
      .removeFromWishlist(
        Number(userId),
        propertyId
      )
      .subscribe({

        next: () => {

          this.wishlistItems =
            this.wishlistItems.filter(
              item =>
                item.property.id !==
                propertyId
            );

          this.removingPropertyId =
            null;

        },


        error: (
          error: any
        ) => {

          console.error(
            'Wishlist Remove Error:',
            error
          );

          this.removingPropertyId =
            null;

          alert(
            'Failed to remove property'
          );

        }

      });

  }


  exploreProperties(): void {

    this.router.navigate([
      '/properties'
    ]);

  }

}