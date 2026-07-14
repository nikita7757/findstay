import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
  implements OnInit {


  showProfileMenu: boolean = false;

  showLanguageMenu: boolean = false;

  isLoggedIn: boolean = false;


  constructor(
    private router: Router
  ) {}


  ngOnInit(): void {

    this.checkLoginStatus();

  }


  checkLoginStatus(): void {

    const userId =
      localStorage.getItem('userId');


    this.isLoggedIn =
      !!userId;

  }


  toggleProfileMenu(): void {

    this.showProfileMenu =
      !this.showProfileMenu;

    this.showLanguageMenu = false;

  }


  toggleLanguageMenu(): void {

    this.showLanguageMenu =
      !this.showLanguageMenu;

    this.showProfileMenu = false;

  }


  viewProfile(): void {

    this.showProfileMenu = false;


    const userId =
      localStorage.getItem('userId');


    if (!userId) {

      localStorage.setItem(
        'redirectAfterLogin',
        '/profile'
      );

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    this.router.navigate([
      '/profile'
    ]);

  }

viewWishlist(): void {

  if (!this.isLoggedIn) {

    localStorage.setItem(
      'redirectAfterLogin',
      '/wishlist'
    );

    this.router.navigate([
      '/login'
    ]);

    return;
  }

  this.router.navigate([
    '/wishlist'
  ]);

}

  viewMyBookings(): void {

    this.showProfileMenu = false;


    const userId =
      localStorage.getItem('userId');


    if (!userId) {

      localStorage.setItem(
        'redirectAfterLogin',
        '/my-bookings'
      );

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    this.router.navigate([
      '/my-bookings'
    ]);

  }


  becomeHost(): void {

    this.showProfileMenu = false;


    const userId =
      localStorage.getItem('userId');


    if (!userId) {

      localStorage.setItem(
        'redirectAfterLogin',
        '/host-dashboard'
      );

      this.router.navigate([
        '/login'
      ]);

      return;

    }


    this.router.navigate([
      '/host-dashboard'
    ]);

  }


  login(): void {

    this.showProfileMenu = false;


    this.router.navigate([
      '/login'
    ]);

  }


  logout(): void {

    localStorage.removeItem(
      'userId'
    );

    localStorage.removeItem(
      'userName'
    );

    localStorage.removeItem(
      'redirectAfterLogin'
    );


    this.isLoggedIn = false;

    this.showProfileMenu = false;


    this.router.navigate([
      '/login'
    ]);

  }
  

}