import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private navCntrl: NavController) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        password_confirmation: new FormControl('', Validators.required),
      },
      {
        validators: this.passwordsMustMatchValidator(),
      }
    );
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirmation() {
    return this.registerForm.get('password_confirmation');
  }

  submit() {
    this.registerForm.markAllAsTouched();

    console.log(
      this.registerForm.valid,
      this.registerForm.errors,
      this.registerForm.get('password_confirmation').errors
    );

    if (this.registerForm.valid) {
      const data = this.registerForm.getRawValue();

      this.authService.register(data).subscribe((success) => {
        if (success) {
          this.navCntrl.navigateRoot('login');
        } else {
          // error feedback
        }
      });
    }
  }

  passwordsMustMatchValidator(): ValidatorFn {
    return (form: FormGroup): ValidationErrors | null => {
      const password = form.get('password');
      const passwordConfirmation = form.get('password_confirmation');

      if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
        return { passwordMissmatch: true };
      } else {
        return null;
      }
    };
  }
}
