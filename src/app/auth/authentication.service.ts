import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {

    token: string;

    constructor(private router: Router) { }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => alert(error));
    }

    /* eltároljuk itt is, meg a getTokenben is a tokent,
     mivel csak egy ilyen workaround technikával authentikálunk, így ha már van egy token,
     a getToken tuti tud valamit visszaadni, még akkor is, ha a saját async methodja csak később is végez */
    login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => this.token = token);
            })
            .catch(error => alert(error));
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(token => this.token = token);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

}
