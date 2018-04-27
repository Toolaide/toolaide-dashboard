import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const toolRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/navigation/navigation.module#NavigationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(toolRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
