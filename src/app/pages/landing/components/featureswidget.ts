import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule],
    template: ` <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="grid grid-cols-12 gap-4 justify-center">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Features</div>
                <span class="text-muted-color text-2xl">Where It Gets Seen</span>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-yellow-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-thumbs-up !text-2xl text-yellow-700"></i>
                        </div>
                        <h5 class="mb-2 text-surface-900 dark:text-surface-0">Easy to Use</h5>
                        <span class=" mb-2 text-surface-600 dark:text-surface-200">Intuitive interface for managing your tasks effortlessly</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(172, 180, 223, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-cyan-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-wrench !text-2xl text-cyan-700"></i>
                        </div>
                        <h5 class="mb-2 text-surface-900 dark:text-surface-0">Fresh Design</h5>
                        <span  class=" mb-2 text-surface-600 dark:text-surface-200">Modern and vibrant design to enhance your productivity.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(172, 180, 223, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(246, 158, 188, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-indigo-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-shield !text-2xl text-indigo-700"></i>
                        </div>
                        <div class="mt-6 mb-2 text-surface-900 dark:text-surface-0 text-xl font-semibold">Better Auth</div>
                        <span class="mb-4 text-surface-600 dark:text-surface-200">Secure and seamless authentication with JWT and OTP, ensuring proper access and privacy.</span>
                    </div>
                </div>
            </div>

            <div
    class="col-span-12 mt-20 mb-20 p-2 md:p-20"
    style="border-radius: 20px; background:radial-gradient(circle, rgb(64 59 138) 23%, rgb(6 3 37) 100%, rgb(255 255 255) 100%);"
>
    <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
        <div class="text-gray-300 mb-2 text-3xl font-semibold">About Creator</div>
        <span class="text-gray-200 text-2xl">Shivansh Goel</span>
        <p class="text-gray-100 sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">
            “I am Shivansh Goel, a passionate technology aficionado and software developer behind Todotify, your ultimate task management solution. With a deep interest in web development, full-stack engineering, and open-source technologies, I leverage tools like Angular, PrimeNG, Node.js, and MySQL to create intuitive, efficient, and modern applications. My journey in tech began with a curiosity for how software works, leading me to explore frameworks, APIs, and databases to build impactful solutions.”
        </p>
        <a href="https://github.com/Tech-aficionado" target="_blank" class="mt-6">
            <img src="https://www.pngall.com/wp-content/uploads/13/Github-Logo.png" style="height: 30px" alt="GitHub Logo" />
        </a>
    </div>
</div>
        </div>
    </div>`
})
export class FeaturesWidget {}
