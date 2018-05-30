import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClosableTabComponent } from './closable-tab/closable-tab.component';

const modules = [
  CommonModule,
  MatDividerModule,
  MatListModule,
  MatTabsModule,
  MatIconModule
];

const components = [
  PageNotFoundComponent,
  ClosableTabComponent
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
