import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { ListsComponent } from './pages/lists/lists.component';

const ROUTES: Routes = [
  { path: 'lists', component: ListsComponent },
  { path: 'list/:id', component: ListComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'lists' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
