import { Routes } from '@angular/router';
import { HeroisTableComponent } from './components/herois-table/herois-table.component';
import { HeroisFormComponent } from './components/herois-form/herois-form.component';

export const routes: Routes = [
     { path: 'heroi', component: HeroisTableComponent },
     { path: 'cadastrar', component: HeroisFormComponent},
     { path: 'cadastrar/:id', component: HeroisFormComponent},
     { path: '', redirectTo: 'heroi', pathMatch: 'full' }

];
