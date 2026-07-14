import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Property
} from '../../../models/property';

import {
  PropertyService
} from '../../../services/property.service';


interface PropertyWithImage
  extends Property {

  imageUrl?: string;

}


@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent
  implements OnInit {


  properties:
    PropertyWithImage[] = [];


  loading: boolean = true;


  private propertyImageApi =
    'http://localhost:8091/property-images';


  constructor(

    private propertyService:
      PropertyService,

    private http:
      HttpClient

  ) {}


  ngOnInit(): void {

    this.loadMyProperties();

  }


  loadMyProperties(): void {


    const hostId =
      localStorage.getItem(
        'userId'
      );


    if (!hostId) {

      console.error(
        'Host ID not found'
      );

      this.loading = false;

      return;

    }


    this.propertyService
      .getPropertiesByHostId(
        Number(hostId)
      )
      .subscribe({


        next: (
          response: Property[]
        ) => {


          console.log(
            'My Properties:',
            response
          );


          this.properties =
            response.map(
              property => ({

                ...property,

                imageUrl:
                  'assets/property-placeholder.jpg'

              })
            );


          this.loading = false;


          this.loadPropertyImages();

        },


        error: (
          error: any
        ) => {


          console.error(
            'Property Load Error:',
            error
          );


          this.loading = false;

        }

      });

  }


  loadPropertyImages(): void {


    this.properties.forEach(
      property => {


        this.http
          .get<any[]>(

            `${this.propertyImageApi}/property/${property.id}`

          )
          .subscribe({


            next: (
              images: any[]
            ) => {


              console.log(

                'Property ID:',

                property.id,

                'Images:',

                images

              );


              if (
                images &&
                images.length > 0
              ) {


                property.imageUrl =
                  images[0].imageUrl;

              }

            },


            error: (
              error: any
            ) => {


              console.error(

                'Property Image Error:',

                property.id,

                error

              );

            }

          });

      }
    );

  }

}