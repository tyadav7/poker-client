import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

import { ClientComponent } from './client/client.component';
import { DeckComponent } from './deck/deck.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { Service } from './services/main/service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ClientComponent,
    DeckComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    OverlayModule,
  ],
  providers: [
    { provide: Service, useFactory: getService, deps: [HttpClient] },
    {
      provide: APP_INITIALIZER,
      deps: [Service],
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getService(http: HttpClient) {
  const shell = new Service(http);
  return shell;
}

export function initializeApp(service: Service) {
  const fn = () => {
    return service
      .loadAppSettings()
      .pipe(
        take(1),
        map((settings) => {
          return settings;
        })
      )
      .toPromise();
  };
  return fn;
}
