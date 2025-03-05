import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusBar, StatusBarStyle } from '@capacitor/status-bar';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    async ngOnInit() {
      // Set status bar style and visibility
      await StatusBar.setStyle({ style: StatusBarStyle.Light }); // Light text on dark background
      await StatusBar.show(); // Ensure status bar is visible
      await StatusBar.setBackgroundColor({ color: '#2c3e50' }); // Match your app’s background color
    }
  }
