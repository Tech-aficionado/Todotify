import { Component, OnInit } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { Crud } from '../crud/crud';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MobileStatsWidget } from './components/mobilewidget';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, MobileStatsWidget, ContextMenuModule, Crud, ToastModule, CommonModule],
    providers: [MessageService],
    template: `
        <p-toast />
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" *ngIf="!isMobileDevice()" />
        </div>
        <app-mobile-stats-widget *ngIf="isMobileDevice()"></app-mobile-stats-widget>
        <div>
            <app-crud></app-crud>
        </div>
        <p-contextmenu [model]="items"></p-contextmenu>
    `
})
export class Dashboard implements OnInit {
    items!: { label: string; icon: string; items: { label: string }[] }[];
    isMobileDevice(): boolean {
        // Check user agent string for common mobile device keywords
        const userAgent: string = navigator.userAgent.toLowerCase();
        const mobileKeywords: RegExp = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUA: boolean = mobileKeywords.test(userAgent);

        // Check screen width (common mobile threshold is 768px)
        const isMobileWidth: boolean = window.innerWidth <= 768;

        // Return true if either user agent or screen width indicates mobile
        return isMobileUA || isMobileWidth;
    }

    ngOnInit(): void {
        this.items = [
            {
                label: 'Roles',
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Admin'
                    },
                    {
                        label: 'Member'
                    },
                    {
                        label: 'Guest'
                    }
                ]
            }
        ];
    }
}
