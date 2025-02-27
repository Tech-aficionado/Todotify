import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppConfigurator } from '../../layout/component/app.configurator';
import { AppTopbar } from '../../layout/component/app.topbar';

@Component({
    selector: 'app-access',
    standalone: true,
    imports: [ButtonModule, AppTopbar, RouterModule, RippleModule, AppConfigurator, ButtonModule],
    template: ` <app-configurator />
        <app-topbar></app-topbar>
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] mt-10 overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <div class="gap-4 flex flex-col items-center">
                            <div class="flex justify-center items-center border-2 rounded-full" style="width: 3.2rem; height: 3.2rem ;color: var(--primary-color);">
                                <i class="pi pi-fw pi-lock !text-2xl" style="color: var(--primary-color);"></i>
                            </div>
                            <h1 class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl mb-2">Access Denied</h1>
                            <span class="text-muted-color mb-8">You are not registered to the application. Please SignIn.</span>
                            <img src="https://primefaces.org/cdn/templates/sakai/auth/asset-access.svg" alt="Access denied" class="mb-8" width="80%" />
                            <div class="col-span-12 mt-8 text-center">
                                <p-button label="Go to Login" routerLink="/auth/login" [style]="{'color': 'var(--primary-color);'}"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class Access {}
