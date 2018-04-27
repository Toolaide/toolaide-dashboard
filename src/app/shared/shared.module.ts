import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const modules = [
  CommonModule,
  MatDividerModule,
  MatListModule
];

const components = [
  PageNotFoundComponent
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ],
  declarations: [
    ...components
  ],
  entryComponents: [

  ]
})
export class SharedModule { }
