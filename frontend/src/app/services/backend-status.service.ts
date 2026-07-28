import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendStatusService {
  private pingUrl = 'https://findstay-4353.onrender.com/categories/get-all-categories';
  
  public isWakingUp$ = new BehaviorSubject<boolean>(false);
  public isConnected$ = new BehaviorSubject<boolean>(false);
  public hasError$ = new BehaviorSubject<boolean>(false);
  public hasResponded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkStatus();
  }

  public checkStatus(): void {
    const startTime = Date.now();
    let isSlow = true;

    // If the server doesn't respond in 1.2s, mark it as waking up
    const timer = setTimeout(() => {
      if (isSlow && !this.hasResponded$.value) {
        this.isWakingUp$.next(true);
      }
    }, 1200);

    this.http.get<any[]>(this.pingUrl).subscribe({
      next: () => {
        isSlow = false;
        clearTimeout(timer);
        this.isWakingUp$.next(false);
        this.isConnected$.next(true);
        this.hasResponded$.next(true);
        this.hasError$.next(false);
        console.log(`Backend connected. Response time: ${Date.now() - startTime}ms`);
      },
      error: (err) => {
        isSlow = false;
        clearTimeout(timer);
        this.isWakingUp$.next(false);
        this.hasResponded$.next(true);
        
        // If status code is not 0 (connection refused / timeout), it means the backend did respond
        if (err.status !== 0) {
          this.isConnected$.next(true);
          this.hasError$.next(false);
        } else {
          this.hasError$.next(true);
          this.isConnected$.next(false);
          console.error('Backend connection error (CORS or network down):', err);
        }
      }
    });
  }
}
