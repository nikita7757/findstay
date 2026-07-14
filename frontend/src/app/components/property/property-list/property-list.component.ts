import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import {
  Property
} from '../../../models/property';

import {
  PropertyService
} from '../../../services/property.service';

import {
  PropertyFilter
} from '../property-filter/property-filter.component';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent
  implements OnInit {


  location: string = '';

  guests: number = 0;


  properties: Property[] = [];

  allProperties: Property[] = [];


  constructor(

    private propertyService:
      PropertyService,

    private route:
      ActivatedRoute

  ) {}


  ngOnInit(): void {

    this.route.queryParamMap
      .subscribe(params => {


        this.location =
          params.get('location')
            ?.trim() || '';


        this.guests =
          Number(
            params.get('guests')
          ) || 0;


        console.log(
          'LOCATION FROM URL:',
          this.location
        );


        console.log(
          'GUESTS FROM URL:',
          this.guests
        );


        /*
         * IMPORTANT:
         *
         * If location exists,
         * search only that location.
         *
         * Do NOT call loadProperties().
         */

        if (this.location) {

          this.searchProperties();

        } else {

          this.loadProperties();

        }

      });

  }


  /*
   * LOAD ALL PROPERTIES
   *
   * This runs only when there is
   * no location in the URL.
   */

  loadProperties(): void {

    console.log(
      'LOADING ALL PROPERTIES'
    );


    this.propertyService
      .getAllProperties()
      .subscribe({

        next: (
          response: Property[]
        ) => {

          console.log(
            'ALL PROPERTIES RESPONSE:',
            response
          );


          this.allProperties =
            response || [];


          this.properties = [
            ...this.allProperties
          ];

        },


        error: (
          error: any
        ) => {

          console.error(
            'Property Load Error:',
            error
          );


          this.allProperties = [];

          this.properties = [];

        }

      });

  }


  /*
   * SEARCH BY LOCATION
   */

  searchProperties(): void {


    console.log(
      'SEARCHING LOCATION:',
      this.location
    );


    this.propertyService
      .searchProperties(
        this.location
      )
      .subscribe({

        next: (
          response: Property[]
        ) => {

          console.log(
            'SEARCH RESULT:',
            response
          );


          /*
           * Backend response becomes
           * the only available property list.
           */

          this.allProperties =
            response || [];


          this.properties = [
            ...this.allProperties
          ];


          console.log(
            'PROPERTIES DISPLAYED:',
            this.properties
          );

        },


        error: (
          error: any
        ) => {

          console.error(
            'Search Error:',
            error
          );


          this.allProperties = [];

          this.properties = [];

        }

      });

  }


  /*
   * APPLY FILTERS
   */

  applyPropertyFilters(
    filters: PropertyFilter
  ): void {


    this.properties =
      this.allProperties.filter(
        (property: Property) => {


          /*
           * PRICE
           */

          let priceMatch = true;


          if (
            filters.priceRange ===
            'BELOW_2000'
          ) {

            priceMatch =
              property.pricePerNight <
              2000;

          }


          if (
            filters.priceRange ===
            '2000_5000'
          ) {

            priceMatch =

              property.pricePerNight >=
              2000

              &&

              property.pricePerNight <=
              5000;

          }


          if (
            filters.priceRange ===
            'ABOVE_5000'
          ) {

            priceMatch =
              property.pricePerNight >
              5000;

          }


          /*
           * BEDROOMS
           */

          let bedroomMatch = true;


          if (
            filters.bedrooms !==
            'ANY'
          ) {

            const bedrooms =
              Number(
                filters.bedrooms
              );


            if (bedrooms === 4) {

              bedroomMatch =
                property.bedrooms >= 4;

            } else {

              bedroomMatch =
                property.bedrooms ===
                bedrooms;

            }

          }


          /*
           * BATHROOMS
           */

          let bathroomMatch = true;


          if (
            filters.bathrooms !==
            'ANY'
          ) {

            const bathrooms =
              Number(
                filters.bathrooms
              );


            if (bathrooms === 3) {

              bathroomMatch =
                property.bathrooms >= 3;

            } else {

              bathroomMatch =
                property.bathrooms ===
                bathrooms;

            }

          }


          /*
           * AVAILABILITY
           */

          let availabilityMatch = true;


          if (
            filters.availability ===
            'AVAILABLE'
          ) {

            availabilityMatch =
              property.available ===
              true;

          }


          if (
            filters.availability ===
            'UNAVAILABLE'
          ) {

            availabilityMatch =
              property.available ===
              false;

          }


          return (

            priceMatch &&

            bedroomMatch &&

            bathroomMatch &&

            availabilityMatch

          );

        }
      );


    console.log(
      'FILTERED PROPERTIES:',
      this.properties
    );

  }

}