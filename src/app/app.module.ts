import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StarEventsComponent } from './star-events/star-events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { EvenementsComponent } from './evenements/evenements.component';
import {EventsService} from './events.service';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {FileUploadService} from './file-upload.service';
import { FicheEventComponent } from './evenements/fiche-event/fiche-event.component';
import { EventCreationComponent } from './evenements/event-creation/event-creation.component';
import {CreateEventGuard} from './guards/create-event.guard';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { TruncatePipe } from './pipes/truncate.pipe';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
    MainPageComponent,
    StarEventsComponent,
    ConnexionComponent,
    InscriptionComponent,
    MonCompteComponent,
    EvenementsComponent,
    DateAgoPipe,
    FicheEventComponent,
    EventCreationComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  AuthGuard,
  CreateEventGuard,
  EventsService,
  FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
