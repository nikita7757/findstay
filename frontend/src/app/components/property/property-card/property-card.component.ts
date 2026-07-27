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
    ' ';

  private propertyImageApi =
    'https://findstay-4353.onrender.com/property-images';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.loadPropertyImage();

  }
loadPropertyImage(): void {

  this.propertyImage =
    `${this.propertyImageApi}/property/${this.property.id}`;

}

}
