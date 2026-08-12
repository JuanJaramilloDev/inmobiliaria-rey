import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  password = '';

  constructor(private router: Router) {}

  iniciarSesion(): void {

    if (
      this.usuario === 'admin' &&
      this.password === '123456'
    ) {

      this.router.navigate(['/admin/dashboard']);

    } else {

      alert('Usuario o contraseña incorrectos');

    }

  }

}