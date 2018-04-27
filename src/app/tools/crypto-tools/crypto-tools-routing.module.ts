import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptoOverviewComponent } from "./crypto-overview/crypto-overview.component";

const routes: Routes = [
  {
    path: '',
    component: CryptoOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoToolsRoutingModule { }
