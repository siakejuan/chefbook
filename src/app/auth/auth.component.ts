import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  isLogin = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost : PlaceholderDirective; 
  private closeSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolve: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

 
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message:string) {
    const alertCmpFactory = this.componentFactoryResolve.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
      if(this.closeSub) {
        this.closeSub.unsubscribe();
      }
  }

}
