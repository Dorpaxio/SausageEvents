import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {AuthGuard} from './auth.guard';
import {MonCompteComponent} from "./mon-compte/mon-compte.component";
import {EvenementsComponent} from "./evenements/evenements.component";
import {EventCreationComponent} from "./evenements/event-creation/event-creation.component";

// penser authguard
const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'moncompte', component: MonCompteComponent, canActivate: [AuthGuard]},
  {path: 'evenements', component: EvenementsComponent},
  {path: 'evenements/creation', component: EventCreationComponent, canActivate: [AuthGuard, ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
