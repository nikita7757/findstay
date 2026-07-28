import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Property } from 'src/app/models/property';

import {
  PropertyService
} from 'src/app/services/property.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent
  implements OnInit {


  propertyId: number = 0;


  property?: Property;


  checkIn: Date | null = null;

  checkOut: Date | null = null;


  guests: number = 1;

  nights: number = 0;


  tax: number = 0;


  loading: boolean = true;
  propertyImage: string = '';
formatDate(date: Date): string {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, '0');

  const day =
    String(
      date.getDate()
    ).padStart(2, '0');


  return `${year}-${month}-${day}`;

}

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private propertyService: PropertyService,
  private http: HttpClient
) {}

  ngOnInit(): void {

    this.propertyId = Number(
      this.route.snapshot.paramMap.get('id')
    );


    this.route.queryParams
      .subscribe(params => {

        if (params['checkIn']) {

          this.checkIn =
            new Date(
              params['checkIn']
            );

        }


        if (params['checkOut']) {

          this.checkOut =
            new Date(
              params['checkOut']
            );

        }


        this.guests =
          Number(
            params['guests']
          ) || 1;


        this.nights =
          Number(
            params['nights']
          ) || 0;


        console.log(
          'Booking Details:',
          {
            checkIn: this.checkIn,
            checkOut: this.checkOut,
            guests: this.guests,
            nights: this.nights
          }
        );

      });


    this.loadProperty();

  }


  loadProperty(): void {

    this.propertyService
      .getPropertyById(
        this.propertyId
      )
      .subscribe({

        next: (
          response: Property
        ) => {

          console.log(
            'Booking Property:',
            response
          );


           this.property = response;


           this.calculateTax();


           this.loadPropertyImage();
           this.loading = false;

         },


         error: (error: any) => {

           console.error(
             'Property Load Error:',
             error
           );


           this.loading = false;


           alert(
             'Failed to load property'
           );

         }

       });

   }

   loadPropertyImage(): void {
     this.http.get<any[]>(`https://findstay-4353.onrender.com/property-images/property/${this.propertyId}`)
       .subscribe({
         next: (images: any[]) => {
           if (images && images.length > 0) {
             this.propertyImage = images[0].imageUrl;
           }
         },
         error: (err) => {
           console.error('Error loading property image:', err);
         }
       });
   }


  calculateTax(): void {

    if (!this.property) {

      return;

    }


    const propertyPrice =
      this.property.pricePerNight *
      this.nights;


    this.tax =
      Math.round(
        propertyPrice * 0.05
      );

  }


  get subtotal(): number {

    if (!this.property) {

      return 0;

    }


    return (
      this.property.pricePerNight *
      this.nights
    );

  }


  get total(): number {

    return (
      this.subtotal +
      this.tax
    );

  }


  goBack(): void {

    this.router.navigate([
      '/property',
      this.propertyId
    ]);

  }
confirmBooking(): void {

  const userId =
    localStorage.getItem('userId');


  if (!userId) {

    localStorage.setItem(
      'redirectAfterLogin',
      this.router.url
    );

    alert('Please login to confirm booking');

    this.router.navigate([
      '/login'
    ]);

    return;

  }


  if (
    !this.checkIn ||
    !this.checkOut ||
    !this.property
  ) {

    alert(
      'Booking details are incomplete'
    );

    return;

  }


  const booking = {

    checkInDate:
      this.formatDate(this.checkIn),

    checkOutDate:
      this.formatDate(this.checkOut),

    guests:
      this.guests,

    totalPrice:
      this.total,

    status:
      'CONFIRMED',

    user: {

      userId:
        Number(userId)

    },

    property: {

      id:
        this.propertyId

    }

  };


  console.log(
    'Booking Request:',
    booking
  );


  this.http
    .post(
      
      'https://findstay-4353.onrender.com/bookings/create-booking',
      booking
    )
    .subscribe({

      next: (response: any) => {

        console.log(
          'Booking Saved:',
          response
        );


        if (!response) {

          alert(
            'Booking could not be created'
          );

          return;

        }


        alert(
          'Booking Confirmed Successfully'
        );


        this.router.navigate([
          '/home'
        ]);

      },


      error: (error: any) => {

        console.error(
          'Booking Error:',
          error
        );


        alert(
          'Failed to confirm booking'
        );

      }

    });

}
}
