import { ButtonDemo } from './../../uikit/buttondemo';
import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../service/backend.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';

@Component({
    standalone: true,
    selector: 'app-mobile-stats-widget',
    imports: [CommonModule, ButtonModule, ToastModule,BadgeModule ],
    providers: [BackendService, MessageService],
    styles: `.p-badge{
    }`,
    template: ` <div class="grid">
    <!-- First Row: Total and Completed -->
    <div class="col-6 mb-3" *ngIf="loading">
        <p-button 
            size="small"
            styleClass="w-full rounded-2xl"
            severity="secondary">
            <ng-template pTemplate>
                <div style="display: flex; width: 100%; align-items: center;">
                    <i class="pi pi-list" style="flex: 0 0 auto; justify-content: flex-start;"></i>
                    <span style="flex: 1 1 auto; text-align: center; padding: 0 0.5rem;">Total</span>
                    <span class="p-badge" style="flex: 0 0 auto; color:white;background:black;border-radius: 25%;justify-content: flex-end;"><small class=" m-1 " >{{ TotalTodos }}</small></span>
                </div>
            </ng-template>
        </p-button>
    </div>
    <div class="col-6 mb-3" *ngIf="loading">
        <p-button 
            size="small"
            styleClass="w-full rounded-2xl"
            severity="success">
            <ng-template pTemplate>
                <div style="display: flex; width: 100%; align-items: center;">
                    <i class="pi pi-check" style="flex: 0 0 auto; justify-content: flex-start;"></i>
                    <span style="flex: 1 1 auto; text-align: center; padding: 0 0.5rem;">Completed</span>
                    <span class="p-badge" style="flex: 0 0 auto;  color:white;background:black;border-radius: 25%;justify-content: flex-end;"><small class=" m-1 " >{{ CompletedTodos }}</small></span>
                </div>
            </ng-template>
        </p-button>
    </div>

    <!-- Second Row: Pending and Missed -->
    <div class="col-6 mb-3" *ngIf="loading">
        <p-button 
            size="small"
            styleClass="w-full rounded-2xl"
            severity="warn">
            <ng-template pTemplate>
                <div style="display: flex; width: 100%; align-items: center;">
                    <i class="pi pi-clock" style="flex: 0 0 auto; justify-content: flex-start;"></i>
                    <span style="flex: 1 1 auto; text-align: center; padding: 0 0.5rem;">Pending</span>
                    <span class="p-badge" style="flex: 0 0 auto; color:white;background:black;border-radius: 25%; justify-content: flex-end;"><small class=" m-1 " >{{ PendingTodos }}</small></span>
                </div>
            </ng-template>
        </p-button>
    </div>
    <div class="col-6 mb-3" *ngIf="loading">
        <p-button 
            size="small"
            styleClass="w-full rounded-2xl"
            severity="danger">
            <ng-template pTemplate>
                <div style="display: flex; width: 100%; align-items: center;">
                    <i class="pi pi-times" style="flex: 0 0 auto; justify-content: flex-start;"></i>
                    <span style="flex: 1 1 auto; text-align: center; padding: 0 0.5rem;">Missed</span>
                    <span class="p-badge" style="flex: 0 0 auto; color:white;background:black;border-radius: 25%;justify-content: flex-end;"><small class=" m-1 " >{{ MissedTodos }}</small></span>
                </div>
            </ng-template>
        </p-button>
    </div>

    <!-- Loading State -->
    <div class="col-12 mb-3" *ngIf="!loading">
        <p-button 
            size="small"
            styleClass="w-full rounded-2xl"
            label="Fetching Todo Counts"
            [loading]="true">
        </p-button>
    </div>
</div>
        <p-toast />`
})
export class MobileStatsWidget implements OnInit {
    constructor(
        private messageService: MessageService,
        public backend: BackendService,
        public router: Router
    ) {}
    PendingTodos: number = 0;
    MissedTodos: number = 0;
    CompletedTodos: number = 0;
    TotalTodos: number = 0;
    loading: boolean = false;

    ngOnInit() {
        const token = localStorage.getItem('access_token') ?? '';
        this.backend.todo_counts(token).subscribe({
            next: (value: any) => {
                this.loading = true;
                if (value['status_code'] == 404) {
                    this.loading = false;
                    this.messageService.add({
                        summary: 'Unauthorised Access',
                        severity: 'error'
                    });
                    localStorage.removeItem('access_token')
                    this.router.navigate(['auth/access']);
                } else if (value['status_code'] == 200) {
                    this.set_counts(value['todo_counts']);
                } else if (value['status_code'] == 401) {
                    this.loading = false;
                    localStorage.removeItem('access_token')
                    this.messageService.add({
                        summary: 'Session Expired',
                        severity: 'error'
                    });this.router.navigate(['auth/login']);
                }
            }
        });
    }
    alert(){
        alert("lsvlndsv")
    }

    set_counts(todos: any) {
        this.TotalTodos = todos['total'];
        this.MissedTodos = todos['missing'];
        this.PendingTodos = todos['pending'];
        this.CompletedTodos = todos['completed'];
    }
}
