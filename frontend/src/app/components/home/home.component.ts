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

import flatpickr from 'flatpickr';

import {
  Instance
} from 'flatpickr/dist/types/instance';
interface Destination {

  name: string;

  desc: string;

}


interface PopularDestination {

  propertyId: number;

  name: string;

  location: string;

  bookingCount: number;

  image: string;

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent
  implements OnInit {


  showDropdown: boolean = false;

  showGuestDropdown: boolean = false;


  selectedDestination: string = '';




  destinations: Destination[] = [];

  popularDestinations:
    PopularDestination[] = [];


  adults: number = 0;

  children: number = 0;

  infants: number = 0;

  pets: number = 0;

showHomeCalendar: boolean = false;

checkInDate: Date | null = null;

checkOutDate: Date | null = null;

private homeCalendar:
  Instance | null = null;
  private bookingApi =
    'https://findstay-backend.onrender.com/bookings';


  private propertyImageApi =
    'https://findstay-backend.onrender.com/property-images';


  constructor(
    private router: Router,
    private http: HttpClient
  ) {}


  ngOnInit(): void {

    this.loadPopularDestinations();

  }

openHomeCalendar(): void {

  this.showHomeCalendar = true;


  setTimeout(() => {

    const calendarElement =
      document.getElementById(
        'home-booking-calendar'
      );


    if (!calendarElement) {

      return;

    }


    /*
     * Destroy previous instance
     * before creating another one.
     */

    if (this.homeCalendar) {

      this.homeCalendar.destroy();

      this.homeCalendar = null;

    }


    this.homeCalendar =
      flatpickr(
        calendarElement,
        {

          inline: true,

          mode: 'range',

          showMonths: 2,

          minDate: 'today',


          defaultDate:

            this.checkInDate &&
            this.checkOutDate

              ? [

                  this.checkInDate,

                  this.checkOutDate

                ]

              : undefined,


          onChange: (
            selectedDates: Date[]
          ) => {


            if (
              selectedDates.length >= 1
            ) {

              this.checkInDate =
                selectedDates[0];

            }


            if (
              selectedDates.length >= 2
            ) {

              this.checkOutDate =
                selectedDates[1];

            } else {

              this.checkOutDate =
                null;

            }

          }

        }
      );

  });

}
closeHomeCalendar(): void {

  this.showHomeCalendar = false;


  if (this.homeCalendar) {

    this.homeCalendar.destroy();

    this.homeCalendar = null;

  }

}

clearHomeDates(): void {

  this.checkInDate = null;

  this.checkOutDate = null;


  if (this.homeCalendar) {

    this.homeCalendar.clear();

  }

}

  get totalGuests(): number {

    return (
      this.adults +
      this.children +
      this.infants +
      this.pets
    );

  }


  getGuestText(): string {

    if (this.totalGuests === 0) {

      return 'Add guests';

    }


    if (this.totalGuests === 1) {

      return '1 Guest';

    }


    return (
      this.totalGuests +
      ' Guests'
    );

  }


searchProperty(): void {

  console.log(
    'Location:',
    this.selectedDestination
  );

  console.log(
    'Check In:',
    this.checkInDate
  );

  console.log(
    'Check Out:',
    this.checkOutDate
  );

  console.log(
    'Guests:',
    this.totalGuests
  );


  this.router.navigate(
    ['/properties'],
    {

      queryParams: {

        location:
          this.selectedDestination,

        guests:
          this.totalGuests,

        checkIn:
          this.checkInDate
            ? this.formatDate(
                this.checkInDate
              )
            : null,

        checkOut:
          this.checkOutDate
            ? this.formatDate(
                this.checkOutDate
              )
            : null

      }

    }
  );

}

formatDate(
  date: Date
): string {

  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      '0'
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      '0'
    );


  return (
    `${year}-${month}-${day}`
  );

}


  selectDestination(
    place: Destination
  ): void {

    this.selectedDestination =
      place.name;

    this.showDropdown = false;

  }


  hideDropdown(): void {

    setTimeout(() => {

      this.showDropdown = false;

    }, 200);

  }


  toggleGuestDropdown(
    event: Event
  ): void {

    event.stopPropagation();

    this.showGuestDropdown =
      !this.showGuestDropdown;

  }


  increase(
    type: string
  ): void {

    switch (type) {

      case 'adults':

        this.adults++;

        break;


      case 'children':

        this.children++;

        break;


      case 'infants':

        this.infants++;

        break;


      case 'pets':

        this.pets++;

        break;

    }

  }


  decrease(
    type: string
  ): void {

    switch (type) {

      case 'adults':

        if (this.adults > 0) {

          this.adults--;

        }

        break;


      case 'children':

        if (this.children > 0) {

          this.children--;

        }

        break;


      case 'infants':

        if (this.infants > 0) {

          this.infants--;

        }

        break;


      case 'pets':

        if (this.pets > 0) {

          this.pets--;

        }

        break;

    }

  }


  loadPopularDestinations(): void {

    this.http
      .get<any[]>(
        `${this.bookingApi}/popular-properties`
      )
      .subscribe({

        next: (response: any[]) => {

          console.log(
            'Popular Properties:',
            response
          );


          this.popularDestinations =
            response.map(item => ({

              propertyId:
                Number(item[0]),

              name:
                item[1],

              location:
                item[2],

              bookingCount:
                Number(item[3]),

              image:
                'assets/property-placeholder.jpg'

            }));


          this.destinations =
            this.popularDestinations.map(
              place => ({

                name:
                  place.location,

                desc:
                  place.bookingCount +
                  ' bookings'

              })
            );


          this.loadPopularPropertyImages();

        },


        error: (error: any) => {

          console.error(
            'Popular Property Error:',
            error
          );

        }

      });

  }


  loadPopularPropertyImages(): void {

    this.popularDestinations.forEach(
      place => {

        this.http
          .get<any[]>(
            `${this.propertyImageApi}/property/${place.propertyId}`
          )
          .subscribe({

            next: (images: any[]) => {

              console.log(
                'Property ID:',
                place.propertyId,
                'Images:',
                images
              );


              if (
                images &&
                images.length > 0
              ) {

                place.image =
                  images[0].imageUrl;

              }

            },


            error: (error: any) => {

              console.error(
                'Popular Property Image Error:',
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

    console.log(
      'Opening Property:',
      propertyId
    );


    this.router.navigate([
      '/property',
      propertyId
    ]);

  }


  searchDestination(
    location: string
  ): void {

    this.selectedDestination =
      location;


    this.router.navigate(
      ['/properties'],
      {

        queryParams: {

          location:
            location

        }

      }
    );

  }


}