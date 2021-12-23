import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AuthFormComponent } from "./auth-form/auth-form.component";

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
<!--      <auth-form (submitted)="createUser($event)">-->
<!--        <h3>Create account</h3>-->
<!--        <button type="submit">-->
<!--          Join us-->
<!--        </button>-->
<!--      </auth-form>-->
<!--      <auth-form (submitted)="loginUser($event)">-->
<!--        <h3>Login</h3>-->
<!--        <auth-remember (checked)="rememberUser($event)"></auth-remember>-->
<!--        <auth-remember (checked)="rememberUser($event)"></auth-remember>-->
<!--        <auth-remember (checked)="rememberUser($event)"></auth-remember>-->
<!--        <button type="submit">-->
<!--          Login-->
<!--        </button>-->
<!--      </auth-form>-->

       <!-- Dynamic components resolver     -->
<!--      <button (click)="destroyComponent()">Destroy</button>-->
<!--      <button (click)="moveComponent()">Move</button>-->
<!--      <div #entry></div>-->
<!--      <template #tmpl>Makson F.: Kaluga City</template>-->
<!--      <template #tmpl let-name let-location="location">-->
<!--        {{ name }}: {{ location }}-->
<!--      </template>-->

<!--      <ng-container *ngTemplateOutlet="tmpl"></ng-container>-->
<!--      <template #tmpl>Makson F.: Kaluga City</template>-->

      <ng-container *ngTemplateOutlet="tmpl; context: ctx"></ng-container>
      <template #tmpl let-name let-location="location">{{ name }}: {{ location }}</template>

    </div>
  `
})
export class AppComponent implements AfterContentInit{

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef
  @ViewChild('tmpl') tmpl: TemplateRef<any>

  rememberMe: boolean = false;
  private component: ComponentRef<AuthFormComponent>;

  ctx = {
    $implicit: 'Makson F.',
    location: 'Kaluga City',
  }

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngAfterContentInit(): void {
    // const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent)
    //
    // this.entry.createComponent(authFormFactory)
    //
    // this.component = this.entry.createComponent(authFormFactory, 0)
    // this.component.instance.title = 'Create account'
    // this.component.instance.submitted.subscribe(this.loginUser)
/*****************************************************************************************/
    // this.entry.createEmbeddedView(this.tmpl)
    // this.entry.createEmbeddedView(this.tmpl, {
    //   $implicit: 'Makson F.',
    //   location: 'Kaluga City'
    // })
  }

  destroyComponent() {
    console.log(this.component)
    this.component.destroy()
  }

  moveComponent() {
    this.entry.move(this.component.hostView, 1)
  }

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    // console.log('Login', user, this.rememberMe);
    console.log('Login', user);
  }
}
