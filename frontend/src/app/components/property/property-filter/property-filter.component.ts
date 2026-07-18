import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';


export interface PropertyFilter {

  priceRange: string;

  bedrooms: string;

  bathrooms: string;

  availability: string;

}


@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.css']
})
export class PropertyFilterComponent {


  @Output()
  filtersChanged =
    new EventEmitter<PropertyFilter>();


  filters: PropertyFilter = {

    priceRange: 'ANY',

    bedrooms: 'ANY',

    bathrooms: 'ANY',

    availability: 'ALL'

  };


  applyFilters(): void {

    console.log(
      'Filters Emitted:',
      this.filters
    );


    this.filtersChanged.emit({

      priceRange:
        this.filters.priceRange,

      bedrooms:
        this.filters.bedrooms,

      bathrooms:
        this.filters.bathrooms,

      availability:
        this.filters.availability

    });

  }

}
