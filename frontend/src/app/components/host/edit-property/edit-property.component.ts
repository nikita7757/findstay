import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Property } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';


interface PropertyImage {

  id?: number;

  imageUrl: string;

  sectionName: string;

  property: {
    id: number;
  };

  editing?: boolean;

  editedImageUrl?: string;
}


interface ImageSection {

  sectionName: string;

  images: PropertyImage[];

  newImageUrl: string;

}
interface Category {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  private propertyImageApi =
    'https://findstay-4353.onrender.com/property-images';

categories: Category[] = [];

selectedCategoryId: number | null = null;

private categoryApi =
  'https://findstay-4353.onrender.com/categories';

  property?: Property;

  propertyId: number = 0;

  loading: boolean = true;

  updating: boolean = false;

  imageSections: ImageSection[] = [];
  newSectionName: string = '';

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

  if (!this.propertyId) {

    alert('Invalid Property ID');

    this.router.navigate([
      '/my-properties'
    ]);

    return;
  }

  this.loadCategories();

  this.loadProperty();

  this.loadPropertyImages();
}
loadCategories(): void {

  this.http
    .get<Category[]>(
      `${this.categoryApi}/get-all-categories`
    )
    .subscribe({

      next: (response: Category[]) => {

        console.log(
          'Categories:',
          response
        );

        this.categories = response;

      },

      error: (error: any) => {

        console.error(
          'Category Load Error:',
          error
        );

      }

    });
}

  loadProperty(): void {

    const userId =
      localStorage.getItem('userId');


    if (!userId) {

      localStorage.setItem(
        'redirectAfterLogin',
        '/edit-property/' + this.propertyId
      );

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe({

        next: (response: Property) => {

          console.log(
            'Property To Edit:',
            response
          );


          if (
            response.host &&
            response.host.userId !== Number(userId)
          ) {

            alert(
              'You cannot edit this property'
            );

            this.router.navigate([
              '/my-properties'
            ]);

            return;

          }


          this.property = response;
            this.selectedCategoryId =
            response.category?.id || null;
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


  loadPropertyImages(): void {

    this.http
      .get<PropertyImage[]>(
        `${this.propertyImageApi}/property/${this.propertyId}`
      )
      .subscribe({

        next: (images: PropertyImage[]) => {

          console.log(
            'Edit Property Images:',
            images
          );

          this.groupImages(
            images || []
          );

        },


        error: (error: any) => {

          console.error(
            'Image Load Error:',
            error
          );

        }

      });

  }


  groupImages(
    images: PropertyImage[]
  ): void {

    const grouped: {
      [key: string]: PropertyImage[]
    } = {};


    images.forEach(image => {

      const sectionName =
        image.sectionName ||
        'Property Photos';


      if (!grouped[sectionName]) {

        grouped[sectionName] = [];

      }


      grouped[sectionName].push(
        image
      );

    });


    this.imageSections =
      Object.keys(grouped).map(
        sectionName => ({

          sectionName: sectionName,

          images:
            grouped[sectionName],

          newImageUrl: ''

        })
      );

  }


  startEditImage(
    image: PropertyImage
  ): void {

    image.editing = true;

    image.editedImageUrl =
      image.imageUrl;

  }


  cancelEditImage(
    image: PropertyImage
  ): void {

    image.editing = false;

    image.editedImageUrl = '';

  }


  updateImage(
    image: PropertyImage
  ): void {

    if (
      !image.id ||
      !image.editedImageUrl?.trim()
    ) {

      return;

    }


    const updatedImage = {

      imageUrl:
        image.editedImageUrl.trim(),

      sectionName:
        image.sectionName,

      property: {
        id: this.propertyId
      }

    };


    this.http
      .put<PropertyImage>(
        `${this.propertyImageApi}/${image.id}`,
        updatedImage
      )
      .subscribe({

        next: (
          response: PropertyImage
        ) => {

          console.log(
            'Image Updated:',
            response
          );


          image.imageUrl =
            response.imageUrl;

          image.editing = false;

          image.editedImageUrl = '';


          alert(
            'Image Updated Successfully'
          );

        },


        error: (error: any) => {

          console.error(
            'Image Update Error:',
            error
          );

          alert(
            'Failed to update image'
          );

        }

      });

  }


  updateProperty(): void {

    if (!this.property) {

      return;

    }


    if (
      !this.property.title ||
      !this.property.location
    ) {

      alert(
        'Please enter title and location'
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

this.property.category = {

  id: this.selectedCategoryId

};
    this.updating = true;


    this.propertyService
      .updateProperty(
        this.propertyId,
        this.property
      )
      .subscribe({

        next: (response: Property) => {

          console.log(
            'Updated Property:',
            response
          );


          this.updating = false;


          alert(
            'Property Updated Successfully'
          );


          this.router.navigate([
            '/my-properties'
          ]);

        },


        error: (error: any) => {

          console.error(
            'Property Update Error:',
            error
          );


          this.updating = false;


          alert(
            'Failed to update property'
          );

        }

      });

  }


  cancelEdit(): void {

    this.router.navigate([
      '/my-properties'
    ]);

  }
  addImage(section: ImageSection): void {

  const imageUrl =
    section.newImageUrl.trim();

  if (!imageUrl) {
    return;
  }


  const newImage: PropertyImage = {

    imageUrl: imageUrl,

    sectionName:
      section.sectionName,

    property: {
      id: this.propertyId
    }

  };


  this.http
    .post<PropertyImage>(
      this.propertyImageApi,
      newImage
    )
    .subscribe({

      next: (
        savedImage: PropertyImage
      ) => {

        console.log(
          'Image Added:',
          savedImage
        );

        section.images.push(
          savedImage
        );

        section.newImageUrl = '';

      },

      error: (error: any) => {

        console.error(
          'Image Add Error:',
          error
        );

        alert(
          'Failed to add image'
        );

      }

    });

}
deleteImage(
  section: ImageSection,
  image: PropertyImage
): void {

  if (!image.id) {
    return;
  }


  if (!confirm('Remove this photo?')) {
    return;
  }


  this.http
    .delete(
      `${this.propertyImageApi}/${image.id}`,
      {
        responseType: 'text'
      }
    )
    .subscribe({

      next: () => {

        section.images =
          section.images.filter(
            currentImage =>
              currentImage.id !== image.id
          );

      },

      error: (error: any) => {

        console.error(
          'Image Delete Error:',
          error
        );

        alert(
          'Failed to remove image'
        );

      }

    });

}addSection(): void {

  const sectionName =
    this.newSectionName.trim();

  if (!sectionName) {
    return;
  }


  const exists =
    this.imageSections.some(
      section =>
        section.sectionName
          .toLowerCase() ===
        sectionName.toLowerCase()
    );


  if (exists) {

    alert('Area already exists');

    return;

  }


  this.imageSections.push({

    sectionName: sectionName,

    images: [],

    newImageUrl: ''

  });


  this.newSectionName = '';

}removeSection(
  section: ImageSection,
  sectionIndex: number
): void {

  if (section.images.length > 0) {

    alert(
      'Remove all photos before removing this section'
    );

    return;

  }


  this.imageSections.splice(
    sectionIndex,
    1
  );

}

}
