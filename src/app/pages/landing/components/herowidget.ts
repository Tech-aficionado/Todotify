import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'hero-widget',
    imports: [ButtonModule, RippleModule, RouterModule],
    template: `
        <div
            id="hero"
            class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
            style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(140% 81% at 100% 16%)"
        >
            <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span class="font-light block">Thrive</span>Elevate Your Productivity, Simplify Your Life</h1>
                <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Transform Tasks into Triumphs</p>
                <p-button routerLink="/auth/login" [rounded]="true" label="Get Started" class="!text-xl mt-8 !px-4" />
            </div>
            <div class="flex justify-center md:justify-end">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-2839461-2371075.png" alt="Hero Image" class="w-8/11 md:w-auto" />
            </div>
        </div>
    `
})
export class HeroWidget {}
