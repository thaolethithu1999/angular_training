import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersWithNgxEzComponent } from './components/users-with-ngx-ez/users-with-ngx-ez.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'ngx-ez/users', component: UsersWithNgxEzComponent },
  { path: 'roles', component: RolesComponent },
  // { path: '', redirectTo: 'users', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
