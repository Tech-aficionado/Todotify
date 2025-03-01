import { ButtonDemo } from './../../uikit/buttondemo';
import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../service/backend.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, ButtonModule, ToastModule],
    providers: [BackendService, MessageService],
    template: ` <div *ngIf="loading" class="col-span-12 lg:col-span-6 xl:col-span-3 ">
            <div class="card mb-0 " style="border-radius: 15px;">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Todos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ TotalTodos }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi pi-list text-blue-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div *ngIf="loading" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0" style="border-radius: 15px;">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Completed Todos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ CompletedTodos }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-check text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div *ngIf="loading" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0" style="border-radius: 15px;">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Pending Todos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ PendingTodos }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-clock text-cyan-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div *ngIf="loading" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0" style="border-radius: 15px;">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Missed Todos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ MissedTodos }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-times text-purple-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div *ngIf="!loading" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card " style="border-radius: 15px;">
                <div class="flex justify-center align-items-center ">
                    <p-button [loading]="true" label="Fetching Todo Counts" />
                </div>
            </div>
        </div>
        <p-toast />`
})
export class StatsWidget implements OnInit {
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

    set_counts(todos: any) {
        this.TotalTodos = todos['total'];
        this.MissedTodos = todos['missing'];
        this.PendingTodos = todos['pending'];
        this.CompletedTodos = todos['completed'];
    }
}
