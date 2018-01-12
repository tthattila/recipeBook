import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authentication.login(email, password);
  }

  onRegister(form: NgForm) {
    this.router.navigate(['/signup']);
  }

}
