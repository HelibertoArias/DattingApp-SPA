import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/_models/User";
import { AlertifyService } from "src/app/_services/alertify.service";
import { NgForOfContext } from "@angular/common";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/_services/user.service";
import { AuthService } from "src/app/_services/auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"],
})
export class MemberEditComponent implements OnInit {
  //Reference to the form
  @ViewChild("editForm", { static: true }) editForm: NgForm;

  //Avoid close without save
  @HostListener("window:beforeunload", ["$event"]) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  user: User;

  photoUrlSubscribe: Subscription;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.photoUrlSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.photoUrlSubscribe = this.authService.photoUrl$.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );

    this.route.data.subscribe((response) => {
      this.user = response["user"];
    });
  }

  updateUser() : void {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success("Profile update successfully.");
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  // updateMainPhoto(photoUrl) : void {
  //   this.user.photoUrl = photoUrl;
  //   this.authService.changeMemberPhoto(photoUrl);
  // }
}
