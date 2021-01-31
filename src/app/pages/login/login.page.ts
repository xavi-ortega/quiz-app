import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private navCntrl: NavController) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const credentials = this.loginForm.getRawValue();

      this.authService.login(credentials).subscribe((success) => {
        if (success) {
          this.navCntrl.navigateRoot('home');
        } else {
          // error feedback
        }
      });
    }
  }
}
