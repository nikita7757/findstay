import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyCardComponent } from './components/property/property-card/property-card.component';
import { PropertyDetailsComponent } from './components/property/property-details/property-details.component';
import { PropertySearchComponent } from './components/property/property-search/property-search.component';
import { PropertyFilterComponent } from './components/property/property-filter/property-filter.component';
import { HostDashboardComponent } from './components/host/host-dashboard/host-dashboard.component';
import { AddPropertyComponent } from './components/host/add-property/add-property.component';
import { EditPropertyComponent } from './components/host/edit-property/edit-property.component';
import { MyPropertiesComponent } from './components/host/my-properties/my-properties.component';
import { HostBookingsComponent } from './components/host/host-bookings/host-bookings.component';
import { BookingComponent } from './components/customer/booking/booking.component';
import { MyBookingsComponent } from './components/customer/my-bookings/my-bookings.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { WishlistComponent } from './components/customer/wishlist/wishlist.component';
import { ReviewCardComponent } from './components/review/review-card/review-card.component';
import { ReviewFormComponent } from './components/review/review-form/review-form.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PropertiesComponent } from './components/admin/properties/properties.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({


  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PropertyCardComponent,
    PropertyDetailsComponent,
    PropertySearchComponent,
    PropertyFilterComponent,
    HostDashboardComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    MyPropertiesComponent,
    HostBookingsComponent,
    BookingComponent,
    MyBookingsComponent,
    ProfileComponent,
    WishlistComponent,
    ReviewCardComponent,
    ReviewFormComponent,
    AdminDashboardComponent,
    UsersComponent,
    PropertiesComponent,
    RegisterComponent,
    PropertyListComponent,
    FooterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FlatpickrModule.forRoot(),
      FormsModule,
  HttpClientModule
     
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
