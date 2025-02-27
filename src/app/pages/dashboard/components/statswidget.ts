import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
    <div class="col-span-12 lg:col-span-6 xl:col-span-3 " >
            <div class="card mb-0 "style="border-radius: 15px;">
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
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0"style="border-radius: 15px;">
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
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0"style="border-radius: 15px;">
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
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0"style="border-radius: 15px;">
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
        </div>`
})
export class StatsWidget {
    PendingTodos: number = 0;
    MissedTodos: number = 0;
    CompletedTodos: number = 0;
    TotalTodos: number = 0;
}
