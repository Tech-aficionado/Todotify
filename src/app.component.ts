import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwPush } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>
    <button (click)="subscribeToNotifications()">Enable Reminders</button>`
})
export class AppComponent {
    constructor(private swPush: SwPush) {}

  async subscribeToNotifications() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: 'BLzP5EtY1gOzEXLcn4BYhYkQd-WXRnYW_GF3_jWDOi-ndcn8JTACHm-OMFnG-yPEDr1fWwQ3Wj6svusO3pNSOSc' // Replace with your VAPID public key
      });
      console.log('Subscription:', sub);
      console.log('Subscription endpoint:', sub.endpoint);
      // Send `sub` to your backend to store for later use
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  }

  ngOnInit() {
    this.swPush.messages.subscribe((message) => {
      console.log('Received push message:', message);
      // Display notification or handle task reminder logic here
    });

    this.swPush.notificationClicks.subscribe((event) => {
      console.log('Notification clicked:', event);
      // Navigate to task details or open the app
    });
  }
}
