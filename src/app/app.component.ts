import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  siteLoaded = 'recipes';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyA7LKXTIlDkg4Tg0554OO-QQYp9TtR7Tss',
      authDomain: 'shopping-app-55933.firebaseapp.com',
    });
  }

  loadSelected(site: string) {
    this.siteLoaded = site;
  }

}
