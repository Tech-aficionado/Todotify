import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
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
        <div>
            <app-crud></app-crud>
        </div>
    `
})
export class Dashboard {}
