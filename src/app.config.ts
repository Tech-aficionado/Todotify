import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

const firebaseConfig = {
    apiKey: "AIzaSyDZFlu9jfUvJkkz-q6NJuBNFtsZSu-JWsc",
    authDomain: "todotify-912e9.firebaseapp.com",
    projectId: "todotify-912e9",
    storageBucket: "todotify-912e9.firebasestorage.app",
    messagingSenderId: "103380668582",
    appId: "1:103380668582:web:0ec88dceca5235f90aa467",
    measurementId: "G-7HGTDKTF6C"
  };

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideMessaging(() => getMessaging())
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }), provideServiceWorker('ngsw-worker.js', {
            enabled: true,
            registrationStrategy: 'registerWhenStable:30000'
          })
    ]
};
