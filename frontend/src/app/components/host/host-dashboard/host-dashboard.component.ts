import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  PropertyService
} from '../../../services/property.service';

import {
  Property
} from '../../../models/property';


interface HostBooking {

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

    host: {

      userId: number;

    };

  };

}


@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent
  implements OnInit {


  totalProperties: number = 0;

  totalBookings: number = 0;

  totalEarnings: number = 0;


  private bookingApi =
    'https://findstay-backend.onrender.com/bookings';


  constructor(

    private propertyService:
      PropertyService,

    private http:
      HttpClient

  ) {}


  ngOnInit(): void {

    this.loadDashboardData();

  }


  loadDashboardData(): void {


    const hostId =
      localStorage.getItem(
        'userId'
      );


    if (!hostId) {

      console.error(
        'Host ID not found'
      );

      return;

    }


    const loggedInHostId =
      Number(hostId);


    /*
     * LOAD TOTAL PROPERTIES
     */

    this.propertyService
      .getPropertiesByHostId(
        loggedInHostId
      )
      .subscribe({


        next: (
          properties: Property[]
        ) => {


          this.totalProperties =
            properties.length;


          console.log(
            'Total Host Properties:',
            this.totalProperties
          );

        },


        error: (
          error: any
        ) => {


          console.error(
            'Property Count Error:',
            error
          );

        }

      });


    /*
     * LOAD BOOKINGS
     */

    this.http
      .get<HostBooking[]>(

        `${this.bookingApi}/get-all-bookings`

      )
      .subscribe({


        next: (
          bookings:
            HostBooking[]
        ) => {


          /*
           * Keep only bookings for
           * properties owned by this host.
           */

          const hostBookings =
            bookings.filter(
              booking =>

                booking.property &&

                booking.property.host &&

                booking.property.host.userId ===
                  loggedInHostId
            );


          /*
           * TOTAL BOOKINGS
           */

          this.totalBookings =
            hostBookings.length;


          /*
           * TOTAL EARNINGS
           *
           * Only confirmed bookings
           * contribute to earnings.
           */

          this.totalEarnings =
            hostBookings

              .filter(
                booking =>

                  booking.status ===
                    'CONFIRMED'
              )

              .reduce(
                (
                  total: number,
                  booking: HostBooking
                ) =>

                  total +
                  Number(
                    booking.totalPrice
                  ),

                0
              );


          console.log(
            'Host Bookings:',
            hostBookings
          );


          console.log(
            'Total Bookings:',
            this.totalBookings
          );


          console.log(
            'Total Earnings:',
            this.totalEarnings
          );

        },


        error: (
          error: any
        ) => {


          console.error(
            'Dashboard Booking Error:',
            error
          );

        }

      });

  }

}