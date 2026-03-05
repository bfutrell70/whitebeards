import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './nav-bar.component';
import { AccountMenuComponent } from './account-menu.component';

@NgModule({
  declarations: [
    NavBarComponent, 
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent, 
    AccountMenuComponent
  ],
  providers: [
  ]
})
export class CoreModule { }
