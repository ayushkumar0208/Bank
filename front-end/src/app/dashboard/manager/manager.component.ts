import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-manager',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
hasSession: boolean = false;
  showNav: boolean = true;  // default: navbar visible

  private sessionCheckInterval: any;
  user = this.sessionService.getDecodedSession('loggedInManager');
  constructor(private router:Router, private sessionService: SessionService) {}

  navigateTo(path: string) {
    this.router.navigate([`/manager/${path}`]);
  }

  checkSession(): void{
    const cus = this.sessionService.getDecodedSession('loggedInManager');
    // console.log(cus);
    this.hasSession = !!(cus);
  }

  ngOnInit(): void {
    this.checkSession();
    this.sessionCheckInterval = setInterval(()=> {
      this.checkSession();
    }, 2000)
  }

  ngOnDestroy(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }
  }
}
