import { AuthGuard } from "./_guards/auth.guard";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./list/list.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { Routes } from "@angular/router";
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { ListMemberResolver } from './_resolvers/list-member.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users : ListMemberResolver},
        canActivate: [AuthGuard]
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user : MemberDetailResolver},
        canActivate: [AuthGuard]
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver}
      },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
