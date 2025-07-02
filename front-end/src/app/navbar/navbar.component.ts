import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css']

})

export class NavbarComponent {

  menuOpen = false;
  bank ='SVDK Gramin Bank'
  onLogin: boolean = false;
  sessionCheckInterval: any;
  hasSession: boolean = false;
  dynamicRoute: String = "/login";
 constructor(private router: Router,private sessionService: SessionService){

 }

 ngOnInit(): void {
  this.router.events.subscribe((event) => {
    if(event instanceof NavigationEnd){
      this.onLogin = event.url === '/login';
    }
  })
  this.setDynamicSession();
  this.checkSession();
    this.sessionCheckInterval = setInterval(() => {
      this.checkSession();
      this.setDynamicSession();
    }, 2000);
 }
  setDynamicSession() : void{
    const customer = this.sessionService.getDecodedSession('loggedInCustomer');
    const employee = this.sessionService.getDecodedSession('loggedInEmployee');
    const admin = this.sessionService.getDecodedSession('loggedInAdmin');
    const manager = this.sessionService.getDecodedSession('loggedInManager');

    if(customer){
      this.dynamicRoute = '/customer'
    }else if(employee){
      this.dynamicRoute = '/employee/profile'
    }else if(admin){
      this.dynamicRoute = '/admin'
    }else if(manager){
      this.dynamicRoute = '/manager'
    }
  }

 ngOnDestroy(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }
  }

 checkSession(): void {
    const emp = this.sessionService.getDecodedSession('loggedInEmployee');
    const cust = this.sessionService.getDecodedSession('loggedInCustomer');
    const admin = this.sessionService.getDecodedSession('loggedInAdmin');
    const manager = this.sessionService.getDecodedSession('loggedInManager');
    this.hasSession = !!(emp || cust || admin || manager);
  }
  toggleMenu() {

    this.menuOpen = !this.menuOpen;

  }

  logout(): void {
    this.sessionService.removeSessionKeyIfExists('loggedInEmployee');
    this.sessionService.removeSessionKeyIfExists('loggedInCustomer');
    this.sessionService.removeSessionKeyIfExists('loggedInAdmin');
    this.sessionService.removeSessionKeyIfExists('loggedInManager');
    this.hasSession = false;
    this.router.navigate(['/']);  // or wherever you want
  }

}