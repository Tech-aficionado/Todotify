import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppConfigurator } from '../../layout/component/app.configurator';
import { AppTopbar } from '../../layout/component/app.topbar';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, AppTopbar, AppConfigurator, ButtonModule],
    template: ` <app-configurator />
        <app-topbar></app-topbar>
        <div class="flex items-center mt-6 justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.2rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 mr-2" width="32" height="32" viewBox="0 0 48 48">
                    <path fill="#3f51b5" d="m17.8 18.1l-7.4 7.3l-4.2-4.1L4 23.5l6.4 6.4l9.6-9.6zm0-13l-7.4 7.3l-4.2-4.1L4 10.5l6.4 6.4L20 7.3zm0 26l-7.4 7.3l-4.2-4.1L4 36.5l6.4 6.4l9.6-9.6z" />
                    <path fill="#90caf9" d="M24 22h20v4H24zm0-13h20v4H24zm0 26h20v4H24z" />
                </svg>
                        <span class="text-primary font-bold text-3xl">404</span>
                        <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>
                        <div class="text-surface-600 dark:text-surface-200 mb-8">Requested resource is not available.</div>
                        <img src="https://cdn.ecommerce-merchant.business.hsbc.com.cn/ecommerce/static/404.ec1ccde8.png" alt="Error" width="50%" />
                        <p-button label="Go to Dashboard" routerLink="/" />
                    </div>
                </div>
            </div>
        </div>`
})
export class Notfound {}
