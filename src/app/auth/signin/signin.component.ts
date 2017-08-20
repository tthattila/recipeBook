import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/authentication.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authentication.login(email, password);
  }

}
