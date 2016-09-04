import {Component, OnInit} from "@angular/core";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service"
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
    selector: "my-app",
    providers: [UserService],
    //Contenu de la page
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginPage implements OnInit {
    //Déclarations de méthodes utilisés dans le controller
    user: User;
    isLoggingIn = true;

    constructor(private _router: Router, private _userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "dav.josias@dmail.com";
        this.user.password = "test";
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }
    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }
    login() {
        this._userService.login(this.user)
            .subscribe(
            () => this._router.navigate(["/list"]),
            (error) => alert("Unfortunately we could not find your account.")
            );
    }
    signUp() {
        this._userService.register(this.user)
            .subscribe(
            () => {
                alert("Your account was successfully created.");
                this.toggleDisplay();
            },
            () => alert("Unfortunately we were unable to create your account.")
            );
    }
    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
