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


interface HostBooking {

  id: number;

  checkInDate: string;

  checkOutDate: string;

  guests: number;

  totalPrice: number;

  status: string;


  user: {

    userId: number;

    name: string;

    email: string;

  };


  property: {

    id: number;

    title: string;

    location: string;

    pricePerNight: number;

    host: {

      userId: number;

      name: string;

      email: string;

    };

  };


  imageUrl?: string;

}


@Component({
  selector: 'app-host-bookings',
  templateUrl: './host-bookings.component.html',
  styleUrls: ['./host-bookings.component.css']
})
export class HostBookingsComponent
  implements OnInit {


  bookings:
    HostBooking[] = [];


  loading: boolean = true;


  private bookingApi =
    'http://findstay-backend.onrender.com/bookings';


  private propertyImageApi =
    'http://findstay-backend.onrender.com/property-images';


  constructor(

    private http:
      HttpClient,

    private router:
      Router

  ) {}


  ngOnInit(): void {

    this.loadHostBookings();

  }


  loadHostBookings(): void {


    const hostId =
      localStorage.getItem(
        'userId'
      );


    if (!hostId) {

      console.error(
        'Host ID not found'
      );


      this.loading = false;


      this.router.navigate([
        '/login'
      ]);


      return;

    }


    this.loading = true;


    this.http
      .get<HostBooking[]>(

        `${this.bookingApi}/get-all-bookings`

      )
      .subscribe({


        next: (
          response:
            HostBooking[]
        ) => {


          console.log(
            'All Bookings:',
            response
          );


          const loggedInHostId =
            Number(hostId);


          /*
           * Show only bookings where
           * the booked property belongs
           * to the logged-in host.
           */

          this.bookings =
            response

              .filter(
                booking =>

                  booking.property &&

                  booking.property.host &&

                  booking.property.host.userId ===
                    loggedInHostId
              )

              .map(
                booking => ({

                  ...booking,

                  imageUrl:
                    'assets/property-placeholder.jpg'

                })
              );


          console.log(
            'Host Bookings:',
            this.bookings
          );


          this.loading = false;


          this.loadBookingImages();

        },


        error: (
          error: any
        ) => {


          console.error(
            'Host Bookings Error:',
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

                'Property ID:',

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

                'Property Image Error:',

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


  getGuestInitial(
    name: string
  ): string {


    if (
      !name ||
      name.trim() === ''
    ) {

      return 'G';

    }


    return name
      .trim()
      .charAt(0)
      .toUpperCase();

  }

}