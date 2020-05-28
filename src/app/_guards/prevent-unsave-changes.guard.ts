import { Directive, Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../members/member-edit/member-edit.component";

@Injectable()
export class PreventUnsaveChangesGuard
  implements CanDeactivate<MemberEditComponent> {
  constructor() {}

  canDeactivate(component: MemberEditComponent): boolean {
    if (component.editForm.dirty)
      return confirm(
        "Are you sure you want to continue? Any unsave changes will be lost."
      );

    return true;
  }
}
