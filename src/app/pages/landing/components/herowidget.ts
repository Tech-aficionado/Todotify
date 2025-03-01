import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'hero-widget',
    imports: [ButtonModule, CommonModule, RippleModule, RouterModule],
    providers: [AuthService],
    styles: `#hero {
        min-height: 70vh;
        background-color: #2618be; /* Dark fallback for browsers without gradients */
        position: relative;
        overflow: hidden;

        &.wave-bottom, &.curvy-bottom {
            // Base clip-path for wave on desktop, curvy on mobile
        }

        .flex-1 {
            flex: 1;
        }

        h1 {
            line-height: 1.2;
        }

        p {
            max-width: 500px;
        }

        // Button container for centering on mobile
        .button-container {
            display: flex;
            justify-content: flex-start; /* Left-aligned on desktop */
        }

        // Responsive adjustments for mobile (≤768px)
        @media (max-width: 768px) {
            padding: 1.5rem;

            .flex-col {
                align-items: center;
                text-align: center;
            }

            h1 {
                font-size: 2.5rem; /* Smaller title on mobile to match image */
                text-align: center;
            }

            .font-light {
                font-size: 1.5rem; /* Smaller "Life" on mobile */
            }

            p {
                text-align: center;
                font-size: 1rem; /* Smaller paragraph on mobile */
                max-width: 100%;
                margin-top: 1rem; /* Space below title */
            }

            .button-container {
                justify-content: center; /* Center buttons on mobile */
                width: 100%;
                margin-top: 2rem;
            }

            button {
                width: 100%;
                max-width: 250px; /* Larger button on mobile for touch */
                margin: 0 auto;
                font-size: 1.25rem; /* Larger button text on mobile */
            }

            img {
                max-width: 90%; /* Larger illustration on mobile to match image */
                margin-top: 1rem; /* Adjusted for better spacing */
                margin-bottom: -2rem; /* Overlap with curvy bottom for visual continuity */
                position: relative; /* Ensure it stays above the clip */
                z-index: 10; /* Ensure illustration stays above curvy bottom */
            }

            &.wave-bottom, &.curvy-bottom {
                clip-path: polygon(
                    0 0, // Top-left
                    100% 0, // Top-right
                    100% 85%, // Straight top edge
                    90% 100%, // Right curve point
                    50% 95%, // Bottom center (inverted semi-circle peak)
                    10% 100%, // Left curve point
                    0 85% // Bottom-left
                ); /* Inverted semi-circle on mobile */
            }
        }

        // Desktop adjustments (>768px)
        @media (min-width: 769px) {
            .flex-row {
                align-items: center;
                gap: 4rem; /* More spacing between text and image */
            }

            img {
                max-width: 100%;
                position: relative; /* Ensure it stays above the wave */
                z-index: 10; /* Ensure illustration stays above wave */
            }

            .button-container {
                justify-content: flex-start; /* Left-aligned on desktop */
            }

            button {
                font-size: 1.5rem; /* Larger button text on desktop */
            }

            &.wave-bottom, &.curvy-bottom {
                clip-path: polygon(
                    0 0, // Top-left
                    100% 0, // Top-right
                    100% calc(100% - 120px), // Deeper wave start for ocean effect
                    calc(100% - 100px) calc(100% - 40px), // First wave peak
                    90% calc(100% - 20px), // Second wave peak (gentler)
                    75% calc(100% - 60px), // Wave valley
                    60% calc(100% - 30px), // Third wave peak
                    45% calc(100% - 80px), // Deeper valley
                    30% calc(100% - 20px), // Fourth wave peak
                    15% calc(100% - 100px), // Final wave valley
                    0 calc(100% - 120px) // Bottom-left (end of wave)
                );

                // Animation for smooth, fluent ocean-like wave motion
                animation: oceanWave 8s ease-in-out infinite;
            }
        }

        // Animation keyframes for ocean wave motion (desktop only)
        @keyframes oceanWave {
            0%, 100% {
                clip-path: polygon(
                    0 0,
                    100% 0,
                    100% calc(100% - 120px),
                    calc(100% - 100px) calc(100% - 40px),
                    90% calc(100% - 20px),
                    75% calc(100% - 60px),
                    60% calc(100% - 30px),
                    45% calc(100% - 80px),
                    30% calc(100% - 20px),
                    15% calc(100% - 100px),
                    0 calc(100% - 120px)
                );
            }
            50% {
                clip-path: polygon(
                    0 0,
                    100% 0,
                    100% calc(100% - 120px),
                    calc(100% - 100px) calc(100% - 50px),
                    90% calc(100% - 10px),
                    75% calc(100% - 70px),
                    60% calc(100% - 20px),
                    45% calc(100% - 90px),
                    30% calc(100% - 10px),
                    15% calc(100% - 110px),
                    0 calc(100% - 120px)
                );
            }
        }
    }`,
    template: `
        <div
            id="hero"
            class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden min-h-screen curvy-bottom"
            style="background: radial-gradient(circle, rgb(100, 97, 146) 23%, rgb(38, 24, 190) 100%, rgba(0, 212, 255, 1) 100%);"
        >
            <div class="mx-auto max-w-7xl w-full">
                <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                    <!-- Text Content -->
                    <div class="flex-1 text-left mb-8 md:mb-0">
                        <h1 class="text-5xl md:text-6xl font-bold text-white leading-tight">
                            <span class="font-light block">Thrive</span>
                            Elevate Your Productivity, Simplify Your Life
                        </h1>
                        <p class="font-normal text-xl md:text-2xl leading-normal mt-4 md:mt-6 text-gray-300">
                            Transform Tasks into Triumphs
                        </p>
                        <div class="button-container mt-8">
                            <p-button
                                *ngIf="!access" 
                                routerLink="/auth/login"
                                [rounded]="true"
                                label="Get Started"
                                pRipple
                                icon="pi pi-cloud"
                            />
                            <p-button *ngIf="access" pRipple label="Dashboard" routerLink="/dashboard" [rounded]="true" icon="pi pi-external-link" />
                        </div>
                    </div>

                    <!-- Illustration Section -->
                    <div class="flex-1 flex justify-center md:justify-end">
                        <img
                            src="https://cdni.iconscout.com/illustration/premium/thumb/business-to-do-list-5718709-4780834.png"
                            alt="Hero Image"
                            class="w-full md:w-auto max-w-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HeroWidget implements OnInit {
    constructor(
        public router: Router,
        public authService: AuthService
    ) {}
    access!: boolean;

    ngOnInit(): void {
        this.access = this.authService.isAuthenticated();
    }
}