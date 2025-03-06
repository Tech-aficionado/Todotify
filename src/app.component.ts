import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusBar, StatusBarStyle } from '@capacitor/status-bar';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
