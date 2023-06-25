import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent {
  public username = '';
  public password = '';
  public loginError = '';

  constructor(private http: HttpClient, private router: Router) {}

  public onLogin(): void {
    console.log(`Username: ${this.username}, Password: ${this.password}`);
    const url = 'http://localhost:3000/login'; // replace with your API endpoint
    const body = {
      username: this.username,
      password: this.password,
    };
    console.log(body);

    this.http.post<any>(url, body).subscribe(
      (response) => {
        console.log('sucess');
        console.log(response); // log response for debugging purposes
        if (response.success) {
          this.loginError = ''; // clear any previous error message
          alert('Login successful!'); // show success message

          // Store user information in localStorage
          console.log('store');
          localStorage.setItem('currentUser', JSON.stringify(response.user));

          // Redirect to the homepage on successful login
          console.log('navigate now');
          this.router.navigate(['/admindashboard']);
        } else {
          this.loginError = response.message; // show error message returned by API
        }
      },
      (error) => {
        console.error(error); // log error for debugging purposes
        this.loginError = 'An error occurred during login. Please try again.'; // show generic error message
        alert('Incorrect Username or Password'); // show success message
      }
    );
  }
}
