import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PropertyDetailsComponent } from './components/property/property-details/property-details.component';
import { PropertySearchComponent } from './components/property/property-search/property-search.component';
import { BookingComponent } from './components/customer/booking/booking.component';
import { WishlistComponent } from './components/customer/wishlist/wishlist.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { HostDashboardComponent } from './components/host/host-dashboard/host-dashboard.component';
import {HostBookingsComponent} from './components/host/host-bookings/host-bookings.component';
import { AddPropertyComponent } from './components/host/add-property/add-property.component';
import { EditPropertyComponent } from './components/host/edit-property/edit-property.component';
import { MyPropertiesComponent } from './components/host/my-properties/my-properties.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { MyBookingsComponent } from './components/customer/my-bookings/my-bookings.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {path: 'navbar', component: NavbarComponent},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'properties', component: PropertyListComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'search', component: PropertySearchComponent },

{ path: 'booking/:id', component: BookingComponent },
{ path: 'my-bookings', component: MyBookingsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'host-dashboard', component: HostDashboardComponent },
  { path: 'host-bookings',component: HostBookingsComponent
},
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'edit-property/:id', component: EditPropertyComponent },
  { path: 'my-properties', component: MyPropertiesComponent },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }