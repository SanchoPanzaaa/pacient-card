
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";

export enum AuthTypeEnum {
  Login = 'login',
  SignUp = 'signup',
  Reset = 'reset',
}

export const AuthType = {
  [AuthTypeEnum.Login]: 'login',
  [AuthTypeEnum.SignUp]: 'signup',
  [AuthTypeEnum.Reset]: 'reset',
}

@Component({
  selector: 'pcard-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent {
  protected form: FormGroup;

  protected authType = AuthTypeEnum;
  protected type: AuthTypeEnum;
  loading = false;

  protected serverMessage: unknown = null;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });

    this.type = AuthTypeEnum.Login;
  }

  changeType(val: AuthTypeEnum) {
    this.type = val;
  }

  get isLogin() {
    return this.type === AuthTypeEnum.Login;
  }

  get isSignup() {
    return this.type === AuthTypeEnum.SignUp;
  }

  get isPasswordReset() {
    return this.type === AuthTypeEnum.Reset;
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
