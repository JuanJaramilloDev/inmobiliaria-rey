import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

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

  cargando = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async iniciarSesion(): Promise<void> {

    if (!this.usuario.trim() || !this.password.trim()) {
      alert('Ingrese el correo y la contraseña.');
      return;
    }

    this.cargando = true;

    try {

      await this.authService.iniciarSesion(
        this.usuario,
        this.password
      );

      await this.router.navigate(['/admin/dashboard']);

    } catch (error: any) {

      console.error('Error iniciando sesión:', error);

      alert(
        error?.message ||
        'Correo o contraseña incorrectos.'
      );

    } finally {

      this.cargando = false;

    }
  }

}