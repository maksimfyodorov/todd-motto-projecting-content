import {
  Component,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ContentChild,
  ViewChild,
  AfterViewInit, ViewChildren, ChangeDetectorRef, ElementRef, Renderer,
} from '@angular/core';
import { User } from './auth-form.interface';
import { AuthRememberComponent } from "./auth-remember.component";
import { AuthMessageComponent } from "./auth-message.component";

@Component({
  selector: 'auth-form',
  styles: [`
    .email { border-color: #9f72e6 }
  `],
  template: `
    <div>
      <form  (ngSubmit)="onSubmit(form.value)" #form="ngForm">
<!--        <ng-content select="h3"></ng-content>-->
        <h3>{{ title }}</h3>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
<!--        <ng-content select="auth-remember"></ng-content>-->
<!--        <div *ngIf="showMessage">-->
<!--          You will be logged in for 30 days-->
<!--        </div>-->
<!--        <auth-message [style.display]="showMessage ? 'inherit' : 'none'"></auth-message>-->
<!--        <auth-message [style.display]="showMessage ? 'inherit' : 'none'"></auth-message>-->
<!--        <auth-message [style.display]="showMessage ? 'inherit' : 'none'"></auth-message>-->

<!--        <ng-content select="button"></ng-content>-->
<!--        <button type="submit" (click)="$event.preventDefault(); onSubmit(form.value)">{{ title }}</button>-->
        <button type="submit">{{ title }}</button>
      </form>
    </div>
  `
})
// export class AuthFormComponent implements AfterContentInit, AfterViewInit {
export class AuthFormComponent {

  showMessage: boolean

  title = 'Login';
  // @ContentChild(AuthRememberComponent) remember: AuthRememberComponent

  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>
  // @ViewChild(AuthMessageComponent) message: AuthMessageComponent

  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>
  // @ViewChild and template #refs

  @ViewChild('email') email: ElementRef
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer,
  ) {
  }

  /*ngAfterContentInit(): void {
    // if (this.message) {
    //   this.message.days = 30  // works only with @ViewChild (single instance)
    // }
    if (this.remember) {
      this.remember.forEach(item => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked)
      })
      // this.remember.checked.subscribe((checked: boolean) => this.showMessage = checked) // when I use @ContentChild
    }
  }*/

  /*ngAfterViewInit() {
    // this.message.days = 30 // wrong way => error occurs: Expression has changed after it was checked, so do this logic in ngAfterContentInit
    //
    // ------------------- @ViewChildren Video ------------------
    if (this.message) {
    //   this.message.forEach(message => { // @ViewChildren QueryList<any> is available only inside ngAfterViewInit instead of @ViewChild
    //     message.days = 30 // this will cause an error => Expression has changed after it was checked
    //   })

          // to avoid an error => Expression has changed after it was checked,
          // but it's not recommended way
      // setTimeout(() => {
      //   this.message.forEach(message => {
      //     message.days = 30
      //   })
      // })

      this.message.forEach(message => {
        message.days = 30
      })
      this.cd.detectChanges()
    }

    // --------------------------- @ViewChild and template #refs -----------------
    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email address')
    // this.email.nativeElement.classList.add('email')
    // this.email.nativeElement.focus()

    // -------------------------- Renderer --------------------------
    this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder', 'Enter your email')
  }*/

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
