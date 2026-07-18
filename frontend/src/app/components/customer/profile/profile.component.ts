import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';


interface User {

  userId: number;

  name: string;

  email: string;

  password: string;

}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent
  implements OnInit {


  user?: User;

  loading: boolean = true;

  editing: boolean = false;

  updating: boolean = false;

  showPassword: boolean = false;


  private userApi =
    'https://findstay-4353.onrender.com/users';


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadProfile();

  }


  loadProfile(): void {

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


    this.http
      .get<User>(
        `${this.userApi}/${userId}`
      )
      .subscribe({

        next: (response: User) => {

          console.log(
            'Profile User:',
            response
          );

          this.user = response;

          this.loading = false;

        },


        error: (error: any) => {

          console.error(
            'Profile Load Error:',
            error
          );

          this.loading = false;

          alert(
            'Failed to load profile'
          );

        }

      });

  }


  getInitials(): string {

    if (
      !this.user ||
      !this.user.name
    ) {

      return 'U';

    }


    const names =
      this.user.name
        .trim()
        .split(' ');


    if (names.length === 1) {

      return names[0]
        .charAt(0)
        .toUpperCase();

    }


    return (
      names[0].charAt(0) +
      names[names.length - 1].charAt(0)
    ).toUpperCase();

  }


  enableEdit(): void {

    this.editing = true;

  }


  cancelEdit(): void {

    this.editing = false;

    this.showPassword = false;

    this.loadProfile();

  }


  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }


  updateProfile(): void {

    if (!this.user) {

      return;

    }


    if (
      !this.user.name.trim() ||
      !this.user.email.trim()
    ) {

      alert(
        'Name and email are required'
      );

      return;

    }


    if (!this.user.password) {

      alert(
        'Password is required'
      );

      return;

    }


    this.updating = true;


    this.http
      .put<User>(
        `${this.userApi}/${this.user.userId}`,
        this.user
      )
      .subscribe({

        next: (response: User) => {

          console.log(
            'Profile Updated:',
            response
          );


          this.user = response;

          this.updating = false;

          this.editing = false;

          this.showPassword = false;


          localStorage.setItem(
            'userName',
            response.name
          );


          alert(
            'Profile Updated Successfully'
          );

        },


        error: (error: any) => {

          console.error(
            'Profile Update Error:',
            error
          );

          this.updating = false;

          alert(
            'Failed to update profile'
          );

        }

      });

  }


  viewMyBookings(): void {

    this.router.navigate([
      '/my-bookings'
    ]);

  }


  viewMyProperties(): void {

    this.router.navigate([
      '/my-properties'
    ]);

  }

}
