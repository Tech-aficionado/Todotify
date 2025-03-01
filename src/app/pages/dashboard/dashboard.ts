import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { Crud } from '../crud/crud';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, Crud, ToastModule],
    providers: [MessageService],
    template: `
        <p-toast />
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
        </div>
        <div class="pt-4">
            <app-crud></app-crud>
        </div>
    `
})
export class Dashboard {}
