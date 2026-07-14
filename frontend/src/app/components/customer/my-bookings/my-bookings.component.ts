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


interface BookingDisplayItem {

  id: number;

  checkInDate: string;

  checkOutDate: string;

  guests: number;

  totalPrice: number;

  status: string;

  property: {

    id: number;

    title: string;

    location: string;

    pricePerNight: number;

  };

  imageUrl: string;

}


@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent
  implements OnInit {


  bookings:
    BookingDisplayItem[] = [];


  loading: boolean = true;


  private bookingApi =
    'http://localhost:8091/bookings';


  private propertyImageApi =
    'http://localhost:8091/property-images';


  constructor(

    private http:
      HttpClient,

    private router:
      Router

  ) {}


  ngOnInit(): void {

    this.loadMyBookings();

  }


  loadMyBookings(): void {


    const userId =
      localStorage.getItem(
        'userId'
      );


    if (!userId) {

      this.loading = false;

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    this.loading = true;


    this.http
      .get<BookingDisplayItem[]>(

        `${this.bookingApi}/user/${userId}`

      )
      .subscribe({


        next: (
          response:
            BookingDisplayItem[]
        ) => {


          console.log(
            'My Bookings:',
            response
          );


          this.bookings =
            response.map(
              booking => ({

                ...booking,

                imageUrl:
                  'assets/property-placeholder.jpg'

              })
            );


          this.loading = false;


          this.loadBookingImages();

        },


        error: (
          error: any
        ) => {


          console.error(
            'My Bookings Error:',
            error
          );


          this.loading = false;

        }

      });

  }


  loadBookingImages(): void {


    this.bookings.forEach(
      booking => {


        if (
          !booking.property ||
          !booking.property.id
        ) {

          return;

        }


        this.http
          .get<any[]>(

            `${this.propertyImageApi}/property/${booking.property.id}`

          )
          .subscribe({


            next: (
              images: any[]
            ) => {


              console.log(

                'Booking Property ID:',

                booking.property.id,

                'Images:',

                images

              );


              if (
                images &&
                images.length > 0
              ) {


                booking.imageUrl =
                  images[0].imageUrl;

              }

            },


            error: (
              error: any
            ) => {


              console.error(

                'Booking Property Image Error:',

                booking.property.id,

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


  cancelBooking(
    bookingId: number
  ): void {


    const confirmed =
      confirm(
        'Are you sure you want to cancel this booking?'
      );


    if (!confirmed) {

      return;

    }


    this.http
      .put<any>(

        `${this.bookingApi}/update-status/${bookingId}`,

        {
          status:
            'CANCELLED'
        }

      )
      .subscribe({


        next: () => {


          const booking =
            this.bookings.find(
              item =>
                item.id === bookingId
            );


          if (booking) {

            booking.status =
              'CANCELLED';

          }

        },


        error: (
          error: any
        ) => {


          console.error(
            'Cancel Booking Error:',
            error
          );


          alert(
            'Failed to cancel booking'
          );

        }

      });

  }

}