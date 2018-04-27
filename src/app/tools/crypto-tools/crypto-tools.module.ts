import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { CryptoToolsRoutingModule } from './crypto-tools-routing.module';
import { CryptoOverviewComponent } from './crypto-overview/crypto-overview.component';

@NgModule({
  imports: [
    SharedModule,
    CryptoToolsRoutingModule
  ],
  declarations: [CryptoOverviewComponent]
})
export class CryptoToolsModule { }
