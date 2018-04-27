import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from "../shared/shared.module";

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationHomeComponent } from './navigation-home/navigation-home.component';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

@NgModule({
  imports: [
    SharedModule,
    NavigationRoutingModule,
    MatToolbarModule
  ],
  declarations: [
    NavigationHomeComponent,
    NavigationComponent],
  providers: [ NavigationService ]
})
export class NavigationModule { }
