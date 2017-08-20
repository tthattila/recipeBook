import { Component } from '@angular/core';
import { DataStorageService } from "app/shared/data-storage.service";
import { Response } from "@angular/http";
import { AuthenticationService } from "app/auth/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(
        private storeService: DataStorageService,
        private authentication: AuthenticationService,
        private router: Router) { }

    onSaveData() {
        this.storeService.saveRecipes()
            .subscribe(
            (response: Response) => console.log(response)
            );
    }

    onFetchData() {
        this.storeService.fetchRecipes();
    }

    onLogout() {
        this.authentication.logout();
        this.router.navigate(['/'])
    }

    isAuthenticated() {
        return this.authentication.isAuthenticated();
    }

}
