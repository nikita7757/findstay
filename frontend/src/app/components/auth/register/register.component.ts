import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
       private userService: UserService,
    private router: Router
  ) { }
register(): void {

    // Check empty fields
    if (
      !this.user.fullName ||
      !this.user.email ||
      !this.user.password ||
      !this.user.confirmPassword
    ) {
      alert('Please fill all fields.');
      return;
    }

    // Check password match
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Data to send to backend
    const userData = {
      name: this.user.fullName,
      email: this.user.email,
      password: this.user.password,
    };

    this.userService.registerUser(userData).subscribe({

      next: (response) => {
        alert('Registration Successful');
        console.log(response);

        // Clear form
        this.user = {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        };

        // Navigate to login page
        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.error(error);
        alert('Registration Failed');
      }

    });

  }


}
