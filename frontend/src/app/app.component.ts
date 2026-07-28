import { Component, OnInit } from '@angular/core';
import { BackendStatusService } from './services/backend-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'findstay_app';
  isWakingUp = false;
  isConnected = false;
  hasError = false;
  showBanner = false;
  showSuccess = false;

  constructor(private backendStatus: BackendStatusService) {}

  ngOnInit(): void {
    // Monitor isWakingUp state
    this.backendStatus.isWakingUp$.subscribe(wakingUp => {
      this.isWakingUp = wakingUp;
      if (wakingUp) {
        this.showBanner = true;
      }
    });

    // Monitor isConnected state
    this.backendStatus.isConnected$.subscribe(connected => {
      this.isConnected = connected;
      if (connected && this.showBanner) {
        // Show success briefly, then hide banner
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.showBanner = false;
        }, 2500);
      }
    });

    // Monitor error state
    this.backendStatus.hasError$.subscribe(error => {
      this.hasError = error;
      if (error) {
        this.showBanner = true;
      }
    });
  }

  dismissBanner(): void {
    this.showBanner = false;
  }
}

