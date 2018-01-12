import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/authentication.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.component.html',
  styleUrls: ['./recipes-start.component.css']
})
export class RecipesStartComponent implements OnInit {

  constructor(private auth: AuthenticationService, private store: DataStorageService) { }

  ngOnInit() {

    if (this.auth.isAuthenticated) {
      this.store.fetchRecipes();
    }
  }

}
