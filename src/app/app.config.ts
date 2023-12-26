import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TaskStorageService } from './task-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,
      autoDismiss: true,
      timeOut: 10000,
      progressBar: true,
      closeButton: true,
      progressAnimation: 'decreasing'
    }
    ),
    TaskStorageService
  ]
};
