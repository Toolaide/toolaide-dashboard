import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "../shared/page-not-found/page-not-found.component";
import { tools } from "../tool-declarations";
import { NavigationHomeComponent } from "./navigation-home/navigation-home.component";
import { NavigationComponent } from "./navigation.component";
import { NavigationService } from "./navigation.service";


const navigationRoutes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: NavigationHomeComponent
      },
      ...tools
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(navigationRoutes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {
  constructor(private navigationService: NavigationService) {
    this.navigationService.registerTools(tools);
  }
}
