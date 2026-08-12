import { Routes } from '@angular/router';

export const routes: Routes = [

  // =========================
  // PÁGINAS PÚBLICAS
  // =========================

  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },

  {
    path: 'comprar',
    loadComponent: () =>
      import('./pages/comprar/comprar').then(m => m.Comprar)
  },

  {
    path: 'vender',
    loadComponent: () =>
      import('./pages/vender/vender').then(m => m.Vender)
  },

  {
    path: 'alquilar',
    loadComponent: () =>
      import('./pages/alquilar/alquilar').then(m => m.Alquilar)
  },

  {
    path: 'anticres',
    loadComponent: () =>
      import('./pages/anticres/anticres').then(m => m.Anticres)
  },

  {
    path: 'nosotros',
    loadComponent: () =>
      import('./pages/nosotros/nosotros').then(m => m.Nosotros)
  },

  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contacto/contacto').then(m => m.Contacto)
  },


  // =========================
  // PANEL ADMINISTRATIVO
  // =========================

  {
    path: 'admin',
    children: [

      {
        path: 'login',
        loadComponent: () =>
          import('./pages/admin/login/login').then(m => m.Login)
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
      },

      {
        path: 'propiedades',
        loadComponent: () =>
          import('./pages/admin/propiedades/propiedades').then(m => m.Propiedades)
      },

      {
        path: 'propiedades/nueva',
        loadComponent: () =>
          import('./pages/admin/crear-propiedad/crear-propiedad')
            .then(m => m.CrearPropiedad)
      },

      {
        path: 'propiedades/editar/:id',
        loadComponent: () =>
          import('./pages/admin/editar-propiedad/editar-propiedad')
            .then(m => m.EditarPropiedad)
      }

    ]
  },


  // =========================
  // RUTA NO ENCONTRADA
  // =========================

  {
    path: '**',
    redirectTo: ''
  }

];