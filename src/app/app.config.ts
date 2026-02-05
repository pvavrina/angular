
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimized change detection for better performance on Ragnar
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Required to perform HTTP calls to Strapi
    provideHttpClient()
  ]
};