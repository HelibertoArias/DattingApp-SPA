import { Component, OnInit, OnDestroy } from "@angular/core";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit, OnDestroy {
  model: any = {};
  photoUrl: string;

  photoUrlSubscribe: Subscription;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.photoUrlSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.photoUrlSubscribe = this.authService.photoUrl$.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success("Logged");
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message("Logged out");
    this.router.navigate(["/home"]);
  }
}
