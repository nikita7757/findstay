import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(): void {

    if (!this.user.email || !this.user.password) {

      alert('Please enter email and password.');

      return;
    }

    this.userService
      .loginUser(this.user)
      .subscribe({

        next: (response: any) => {

          console.log('Login Response:', response);

          if (response && response.userId) {

            // Save logged-in user details

            localStorage.setItem(
              'userId',
              response.userId.toString()
            );

            localStorage.setItem(
              'userName',
              response.name
            );

            console.log(
              'Logged User ID:',
              response.userId
            );

            console.log(
              'Logged User Name:',
              response.name
            );

            alert('Login Successful');

            // Check whether user came from Become a Host

            const redirectUrl =
              localStorage.getItem(
                'redirectAfterLogin'
              );

            if (redirectUrl) {

              localStorage.removeItem(
                'redirectAfterLogin'
              );

              this.router.navigate([
                redirectUrl
              ]);

            } else {

              // Normal login

              this.router.navigate([
                '/home'
              ]);

            }

          } else {

            alert('Invalid Email or Password');

          }

        },

        error: (error: any) => {

          console.error(
            'Login Error:',
            error
          );

          alert('Login Failed');

        }

      });

  }

}