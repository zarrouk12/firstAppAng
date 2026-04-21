import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private AS: AuthService, private router: Router) { }
  email: string = '';
  password: string = '';

  // Keep compatibility with older template bindings using "username"
  get username(): string {
    return this.email;
  }

  set username(value: string) {
    this.email = value;
  }

  login() {
    // Implement your login logic here, e.g., call an authentication service
    console.log('Email:', this.email, "pass", this.password);
    // Call the authentication service
    this.AS.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.router.navigate(['/member']);
    });
  }
  

  // Keep compatibility with older template bindings using "onSubmit"
  onSubmit() {
    this.login();
  }
}