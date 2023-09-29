import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/services';
import { FormsModule } from '@angular/forms';
import { AddOrEditUserDialogComponent } from './components/add-edit-user/add-edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
// import {
//   EzCheckboxesModule,
//   EzCheckboxModule,
//   EzFormsModule,
//   EzModalModule,
//   EzPasswordModule,
//   EzRadioModule,
//   EzSelectModule,
//   EzTableModule,
//   EzTabsModule,
//   EzTextModule,
//   EzYesNoModule,
//   SameValidatorModule,
// } from '../app/services/ngx-ez';
import { EzFormsModule, } from '../app/services/ngx-ez/ngx-ez/src/lib/ez-forms/ez-forms.module';
import { EzModalModule } from '../app/services/ngx-ez/ngx-ez/src/lib/ez-modal/ez-modal.module';
import { UsersWithNgxEzComponent } from './components/users-with-ngx-ez/users-with-ngx-ez.component';
import { EzColumnComponent, EzTableComponent, EzTableModule, EzTablePagerComponent, EzTableSearchComponent,  } from './services/ngx-ez/ngx-ez/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    RolesComponent,
    AddOrEditUserDialogComponent,
    UsersWithNgxEzComponent,
    // EzTableComponent,
    // EzTableSearchComponent,
    // EzColumnComponent,
    // EzTablePagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EzFormsModule,
    EzModalModule,
    EzTableModule
  ],
  providers: [
    ApiService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
