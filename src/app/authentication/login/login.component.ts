import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { patterns } from 'src/app/types/entity-types';
import { Credentials, UserAuthService } from '../../services/user-auth.service';
import { PasswordValidators } from '../sign-up/password.validators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginWith')
  public loginWith: ElementRef;

  constructor(
    private auth: UserAuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  public form = new FormGroup({
    username: new FormControl('', [
      Validators.pattern(patterns.username),
    ]),
    email: new FormControl('', [
      Validators.pattern(patterns.email),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(patterns.password),
    ]),
  }, [ PasswordValidators.emailOrUsernameRequired ]);
  processing = false;

  public get email() { return this.form.get('email'); }
  public get password() { return this.form.get('password'); }
  public get username() { return this.form.get('username'); }

  public async login() {
    const user: Credentials = this.form.value;    
    if (this.form.invalid) return;

    try {
      this.processing = true;
      const res = await this.auth.login(user);
      if (res.verify)        
        return this.router.navigate([`/auth/verify`]); 

      const redirect = this.route.snapshot.queryParamMap.get('redirect');
      this.router.navigate([ redirect || '/' ]);
    } catch {
      this.processing = false;
      this.form.setErrors({ invalidLogin: true });
    }
  }

  toggleLoginWith() {
    const value = this.loginWith.nativeElement.value;
    const email = this.form.get('email');
    const username = this.form.get('username');

    if (value === 'email') {
      username.setValue(email.value);
      email.reset();
    }
    else {
      email.setValue(username.value);
      username.reset();
    }
    
    this.loginWith.nativeElement.value = (value === 'email')
      ? 'username'
      : 'email';
  }
}
