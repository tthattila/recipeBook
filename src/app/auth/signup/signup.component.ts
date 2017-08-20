import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// tslint:disable-next-line:quotemark
import { AuthenticationService } from "app/auth/authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authentication.register(email, password);
  }

}
