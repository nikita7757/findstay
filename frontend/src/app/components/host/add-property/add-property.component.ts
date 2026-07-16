import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  Property
} from 'src/app/models/property';

import {
  PropertyService
} from 'src/app/services/property.service';


interface PhotoSection {

  sectionName: string;

  imageUrls: string[];

  newImageUrl: string;

}


interface Category {

  id: number;

  title: string;

  description: string;

}


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent
implements OnInit {


  categories: Category[] = [];

  selectedCategoryId: number | null = null;


  private categoryApi =
    'http://findstay-backend.onrender.com/categories';


  private propertyImageApi =
    'http://findstay-backend.onrender.com/property-images';


  property: Property = {

    title: '',

    description: '',

    location: '',

    pricePerNight: 0,

    bedrooms: 1,

    bathrooms: 1,

    available: true

  };


  photoSections: PhotoSection[] = [

    {
      sectionName: 'Hall',
      imageUrls: [],
      newImageUrl: ''
    },

    {
      sectionName: 'Bedroom',
      imageUrls: [],
      newImageUrl: ''
    },

    {
      sectionName: 'Kitchen',
      imageUrls: [],
      newImageUrl: ''
    },

    {
      sectionName: 'Bathroom',
      imageUrls: [],
      newImageUrl: ''
    }

  ];


  newSectionName: string = '';


  constructor(

    private propertyService: PropertyService,

    private http: HttpClient,

    private router: Router

  ) {}


  ngOnInit(): void {

    this.loadCategories();

  }


  loadCategories(): void {

    this.http
      .get<Category[]>(
        `${this.categoryApi}/get-all-categories`
      )
      .subscribe({

        next: (
          response: Category[]
        ) => {

          console.log(
            'Categories:',
            response
          );

          this.categories = response;

        },


        error: (
          error: any
        ) => {

          console.error(
            'Category Load Error:',
            error
          );

        }

      });

  }


  addImage(
    section: PhotoSection
  ): void {

    const imageUrl =
      section.newImageUrl.trim();


    if (!imageUrl) {

      return;

    }


    section.imageUrls.push(
      imageUrl
    );


    section.newImageUrl = '';

  }


  removeImage(
    section: PhotoSection,
    index: number
  ): void {

    section.imageUrls.splice(
      index,
      1
    );

  }


  addSection(): void {

    const sectionName =
      this.newSectionName.trim();


    if (!sectionName) {

      return;

    }


    const sectionExists =
      this.photoSections.some(

        section =>

          section.sectionName
            .toLowerCase() ===
          sectionName.toLowerCase()

      );


    if (sectionExists) {

      alert('Area already exists');

      return;

    }


    this.photoSections.push({

      sectionName: sectionName,

      imageUrls: [],

      newImageUrl: ''

    });


    this.newSectionName = '';

  }


  removeSection(
    index: number
  ): void {

    this.photoSections.splice(
      index,
      1
    );

  }


  addProperty(): void {


    const userId =
      localStorage.getItem(
        'userId'
      );


    if (!userId) {

      alert(
        'Please login first'
      );


      localStorage.setItem(
        'redirectAfterLogin',
        '/add-property'
      );


      this.router.navigate([
        '/login'
      ]);


      return;

    }


    if (
      !this.property.title.trim() ||
      !this.property.location.trim()
    ) {

      alert(
        'Please enter property title and location'
      );

      return;

    }


    if (
      this.property.pricePerNight <= 0
    ) {

      alert(
        'Price must be greater than 0'
      );

      return;

    }


    if (!this.selectedCategoryId) {

      alert(
        'Please select property category'
      );

      return;

    }


    this.property.host = {

      userId: Number(userId)

    };


    this.property.category = {

      id: this.selectedCategoryId

    };


    console.log(
      'Logged In Host ID:',
      userId
    );


    console.log(
      'Selected Category ID:',
      this.selectedCategoryId
    );


    console.log(
      'Saving Property:',
      this.property
    );


    this.propertyService
      .addProperty(
        this.property
      )
      .subscribe({


        next: (
          savedProperty:
          Property | null
        ) => {


          console.log(
            'Property Saved Response:',
            savedProperty
          );


          if (!savedProperty) {

            console.error(
              'Backend returned null'
            );


            alert(
              'Property was not saved. Backend returned null.'
            );


            return;

          }


          if (!savedProperty.id) {

            console.error(
              'Property ID missing:',
              savedProperty
            );


            alert(
              'Property ID not received'
            );


            return;

          }


          this.savePropertyImages(
            savedProperty
          );

        },


        error: (
          error: any
        ) => {

          console.error(
            'Property Save Error:',
            error
          );


          alert(
            'Failed to Add Property'
          );

        }

      });

  }


  savePropertyImages(
    savedProperty: Property
  ): void {


    const images: any[] = [];


    this.photoSections.forEach(

      section => {


        section.imageUrls.forEach(

          imageUrl => {


            images.push({

              imageUrl: imageUrl,

              sectionName:
                section.sectionName,

              property: {

                id: savedProperty.id

              }

            });

          }

        );

      }

    );


    console.log(
      'Images to Save:',
      images
    );


    if (
      images.length === 0
    ) {

      this.finishPropertyCreation(
        savedProperty.id!
      );


      return;

    }


    let completedImages = 0;

    let failedImages = 0;


    images.forEach(
      image => {


        this.http
          .post(
            this.propertyImageApi,
            image
          )
          .subscribe({


            next: (
              response: any
            ) => {


              console.log(
                'Image Saved:',
                response
              );


              completedImages++;


              this.checkImageCompletion(

                completedImages,

                failedImages,

                images.length,

                savedProperty.id!

              );

            },


            error: (
              error: any
            ) => {


              console.error(
                'Image Save Error:',
                error
              );


              completedImages++;

              failedImages++;


              this.checkImageCompletion(

                completedImages,

                failedImages,

                images.length,

                savedProperty.id!

              );

            }

          });

      }

    );

  }


  checkImageCompletion(

    completedImages: number,

    failedImages: number,

    totalImages: number,

    propertyId: number

  ): void {


    if (
      completedImages !== totalImages
    ) {

      return;

    }


    if (
      failedImages > 0
    ) {

      alert(
        'Property added but some images failed'
      );

    }


    this.finishPropertyCreation(
      propertyId
    );

  }


  finishPropertyCreation(
    propertyId: number
  ): void {


    alert(
      'Property Added Successfully'
    );


    this.router.navigate([

      '/property',

      propertyId

    ]);

  }

}