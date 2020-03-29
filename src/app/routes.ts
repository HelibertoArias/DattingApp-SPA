import { AuthGuard } from "./_guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./list/list.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "members", component: MemberListComponent, canActivate: [AuthGuard] },
  { path: "messages", component: MessagesComponent },
  { path: "lists", component: ListComponent },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
