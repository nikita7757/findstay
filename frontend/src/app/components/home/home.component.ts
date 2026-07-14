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

  selectedDates: Date[] | null = null;


  destinations: Destination[] = [];

  popularDestinations:
    PopularDestination[] = [];


  adults: number = 0;

  children: number = 0;

  infants: number = 0;

  pets: number = 0;


  private bookingApi =
    'http://localhost:8091/bookings';


  private propertyImageApi =
    'http://localhost:8091/property-images';


  constructor(
    private router: Router,
    private http: HttpClient
  ) {}


  ngOnInit(): void {

    this.loadPopularDestinations();

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
      'Dates:',
      this.selectedDates
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
            this.totalGuests

        }

      }
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