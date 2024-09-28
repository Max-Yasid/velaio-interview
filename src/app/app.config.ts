import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore, StoreModule } from '@ngrx/store';
import { MatNativeDateModule } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';
import { TaskReducer } from './state/reducers/task.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    importProvidersFrom([
      MatNativeDateModule,
      StoreModule.forRoot({
        tasks: TaskReducer,
      }),
    ]),
    provideHttpClient(),
  ],
};
