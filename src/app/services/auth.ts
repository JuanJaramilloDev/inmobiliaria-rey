import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientService } from './supabase-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase: SupabaseClient;

  constructor(
    private supabaseService: SupabaseClientService
  ) {
    this.supabase = this.supabaseService.client;
  }

  async iniciarSesion(
    email: string,
    password: string
  ) {

    const { data, error } =
      await this.supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async cerrarSesion(): Promise<void> {

    const { error } =
      await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async estaAutenticado(): Promise<boolean> {

    const { data } =
      await this.supabase.auth.getSession();

    return !!data.session;
  }
}