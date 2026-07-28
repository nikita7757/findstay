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

  propertyImage: string = '';
  imageLoading: boolean = true;

  private propertyImageApi =
    'https://findstay-4353.onrender.com/property-images';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadPropertyImage();

  }
  loadPropertyImage(): void {
    this.imageLoading = true;
    this.http.get<any[]>(`${this.propertyImageApi}/property/${this.property.id}`)
      .subscribe({
        next: (images: any[]) => {
          if (images && images.length > 0) {
            this.propertyImage = images[0].imageUrl;
          } else {
            this.propertyImage = '';
          }
          this.imageLoading = false;
        },
        error: (err) => {
          console.error('Error loading property image:', err);
          this.propertyImage = '';
          this.imageLoading = false;
        }
      });
  }

}

