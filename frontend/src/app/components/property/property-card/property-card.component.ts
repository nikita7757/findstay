import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Property } from '../../../models/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input()
  property!: Property;

  propertyImage: string =
    'assets/property-placeholder.jpg';

  private propertyImageApi =
    'https://findstay-4353.onrender.com/property-images';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadPropertyImage();

  }

  loadPropertyImage(): void {

    this.http
      .get<any[]>(this.propertyImageApi)
      .subscribe({

        next: (images: any[]) => {

          const propertyImages =
            images.filter(image =>
              image.property &&
              image.property.id === this.property.id
            );

          console.log(
            'Property ID:',
            this.property.id,
            'Images:',
            propertyImages
          );

          if (propertyImages.length > 0) {

            this.propertyImage =
              propertyImages[0].imageUrl;

          }

        },

        error: (error: any) => {

          console.error(
            'Property Image Error:',
            error
          );

        }

      });

  }

}
