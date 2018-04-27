import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

import { RandomGeneratorRoutingModule } from './random-generator-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RandomGeneratorRoutingModule
  ],
  declarations: []
})
export class RandomGeneratorModule { }
