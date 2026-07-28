import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import flatpickr from 'flatpickr';

import {
  Instance
} from 'flatpickr/dist/types/instance';

import {
  Property
} from 'src/app/models/property';

import {
  PropertyService
} from 'src/app/services/property.service';

import {
  WishlistService
} from '../../../services/wishlist.service';


interface PropertyImage {

  id: number;

  imageUrl: string;

  sectionName: string;

  property: {
    id: number;
  };

}


interface ImageSection {

  sectionName: string;

  images: PropertyImage[];

}


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent
implements OnInit {



  isWishlisted: boolean = false;

wishlistLoading: boolean = false;
propertyId!: number;

property?: Property;



  propertyImages: PropertyImage[] = [];


  imageSections: ImageSection[] = [];


  showPhotoTour: boolean = false;


  showCalendar: boolean = false;


  checkIn: Date | null = null;


  checkOut: Date | null = null;


  guests: number = 1;


  numberOfNights: number = 0;


  totalPrice: number = 0;


  private calendarInstance?: Instance;


  private propertyImageApi =
    'https://findstay-4353.onrender.com/property-images';


  constructor(

    private route: ActivatedRoute,

    private propertyService: PropertyService,

    private http: HttpClient,

    private router: Router,
      private wishlistService: WishlistService

  ) {}


 ngOnInit(): void {

  this.propertyId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  if (!this.propertyId) {

    console.error(
      'Invalid Property ID'
    );

    return;

  }

  this.loadProperty(
    this.propertyId
  );

  this.loadPropertyImages(
    this.propertyId
  );

  this.checkWishlistStatus();

}


  /* ================================
     LOAD PROPERTY
  ================================= */


  loadProperty(id: number): void {

    this.propertyService
      .getPropertyById(id)
      .subscribe({

        next: (
          response: Property
        ) => {

          console.log(
            'Property:',
            response
          );


          this.property = response;

        },


        error: (
          error: any
        ) => {

          console.error(
            'Property Error:',
            error
          );

        }

      });

  }


  /* ================================
     LOAD PROPERTY IMAGES
  ================================= */


  loadPropertyImages(
    propertyId: number
  ): void {

    this.http
      .get<PropertyImage[]>(
        `${this.propertyImageApi}/property/${propertyId}`
      )
      .subscribe({

        next: (
          images: PropertyImage[]
        ) => {


          this.propertyImages = images || [];


          console.log(
            'Property Images:',
            this.propertyImages
          );


          this.groupImages(
            this.propertyImages
          );

        },


        error: (
          error: any
        ) => {

          console.error(
            'Image Error:',
            error
          );

        }

      });

  }


  /* ================================
     GROUP IMAGES BY SECTION
  ================================= */


  groupImages(
    images: PropertyImage[]
  ): void {


    const grouped: {
      [key: string]: PropertyImage[];
    } = {};


    images.forEach(image => {


      const section =

        image.sectionName ||

        'Property Photos';


      if (!grouped[section]) {

        grouped[section] = [];

      }


      grouped[section].push(
        image
      );

    });


    this.imageSections =

      Object.keys(grouped).map(

        sectionName => ({

          sectionName:
            sectionName,

          images:
            grouped[sectionName]

        })

      );

  }


  /* ================================
     PHOTO TOUR
  ================================= */


  openPhotoTour(): void {

    this.showPhotoTour = true;


    document.body.style.overflow =
      'hidden';

  }


  closePhotoTour(): void {

    this.showPhotoTour = false;


    document.body.style.overflow =
      'auto';

  }


  /* ================================
     OPEN CALENDAR
  ================================= */


  openCalendar(): void {


    if (this.showCalendar) {

      return;

    }


    this.showCalendar = true;


    setTimeout(() => {


      const calendarElement =

        document.getElementById(
          'booking-calendar'
        );


      if (!calendarElement) {

        console.error(
          'Booking calendar element not found'
        );

        return;

      }


      this.calendarInstance?.destroy();


      this.calendarInstance = flatpickr(

        calendarElement,

        {

          mode: 'range',


          inline: true,


          showMonths: 2,


          minDate: 'today',


          dateFormat: 'Y-m-d',


          defaultDate:

            this.checkIn &&
            this.checkOut

              ? [

                  this.checkIn,

                  this.checkOut

                ]

              : undefined,


          onChange: (
            selectedDates: Date[]
          ) => {


            if (
              selectedDates.length === 1
            ) {


              this.checkIn =
                selectedDates[0];


              this.checkOut =
                null;


              this.numberOfNights =
                0;


              this.totalPrice =
                0;

            }


            if (
              selectedDates.length === 2
            ) {


              this.checkIn =
                selectedDates[0];


              this.checkOut =
                selectedDates[1];


              this.calculatePrice();

            }

          }

        }

      );

    }, 0);

  }


  /* ================================
     CLOSE CALENDAR
  ================================= */


  closeCalendar(): void {


    this.showCalendar = false;


    if (
      this.calendarInstance
    ) {


      this.calendarInstance.destroy();


      this.calendarInstance =
        undefined;

    }

  }


  /* ================================
     CLEAR DATES
  ================================= */


  clearDates(): void {


    this.checkIn = null;


    this.checkOut = null;


    this.numberOfNights = 0;


    this.totalPrice = 0;


    this.calendarInstance?.clear();

  }


  /* ================================
     CALCULATE PRICE
  ================================= */


  calculatePrice(): void {


    if (

      !this.checkIn ||

      !this.checkOut ||

      !this.property

    ) {


      this.numberOfNights = 0;


      this.totalPrice = 0;


      return;

    }


    const difference =

      this.checkOut.getTime() -

      this.checkIn.getTime();


    this.numberOfNights =

      Math.ceil(

        difference /

        (
          1000 *
          60 *
          60 *
          24
        )

      );


    if (
      this.numberOfNights <= 0
    ) {


      this.numberOfNights = 0;


      this.totalPrice = 0;


      return;

    }


    this.totalPrice =

      this.numberOfNights *

      this.property.pricePerNight;

  }


  /* ================================
     RESERVE PROPERTY
  ================================= */

reserveProperty(): void {

  if (
    !this.property ||
    !this.checkIn ||
    !this.checkOut
  ) {

    alert('Please select check-in and checkout dates');

    return;
  }

  this.router.navigate(
    [
      '/booking',
      this.property.id
    ],
    {
      queryParams: {

        checkIn:
          this.checkIn.toISOString(),

        checkOut:
          this.checkOut.toISOString(),

        guests:
          this.guests,

        nights:
          this.numberOfNights

      }
    }
  );

}


  /* ================================
     FORMAT DATE
  ================================= */


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
      year +
      '-' +
      month +
      '-' +
      day
    );

  }

checkWishlistStatus(): void {

  const userId =
    localStorage.getItem('userId');


  if (
    !userId ||
    !this.propertyId
  ) {

    this.isWishlisted = false;

    return;

  }


  this.wishlistService
    .checkWishlist(
      Number(userId),
      this.propertyId
    )
    .subscribe({

      next: (
        response: boolean
      ) => {

        console.log(
          'Wishlist Status:',
          response
        );

        this.isWishlisted =
          response;

      },

      error: (
        error: any
      ) => {

        console.error(
          'Wishlist Check Error:',
          error
        );

      }

    });

}


toggleWishlist(): void {

  const userId =
    localStorage.getItem('userId');


  if (!userId) {

    alert(
      'Please login to save properties'
    );

    localStorage.setItem(

      'redirectAfterLogin',

      '/property/' +
      this.propertyId

    );

    this.router.navigate([
      '/login'
    ]);

    return;

  }


  if (!this.propertyId) {

    return;

  }


  if (this.wishlistLoading) {

    return;

  }


  this.wishlistLoading = true;


  if (this.isWishlisted) {

    this.removeFromWishlist(
      Number(userId)
    );

  } else {

    this.addToWishlist(
      Number(userId)
    );

  }

}


addToWishlist(
  userId: number
): void {

  this.wishlistService
    .addToWishlist(
      userId,
      this.propertyId
    )
    .subscribe({

      next: (
        response: any
      ) => {

        console.log(
          'Added To Wishlist:',
          response
        );

        this.isWishlisted = true;

        this.wishlistLoading = false;

      },

      error: (
        error: any
      ) => {

        console.error(
          'Add Wishlist Error:',
          error
        );

        this.wishlistLoading = false;

        alert(
          'Failed to save property'
        );

      }

    });

}


removeFromWishlist(
  userId: number
): void {

  this.wishlistService
    .removeFromWishlist(
      userId,
      this.propertyId
    )
    .subscribe({

      next: (
        response: string
      ) => {

        console.log(
          'Removed From Wishlist:',
          response
        );

        this.isWishlisted = false;

        this.wishlistLoading = false;

      },

      error: (
        error: any
      ) => {

        console.error(
          'Remove Wishlist Error:',
          error
        );

        this.wishlistLoading = false;

        alert(
          'Failed to remove property'
        );

      }

    });

}

}
