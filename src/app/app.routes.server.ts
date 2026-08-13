import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Estas rutas dependen de un identificador dinámico de Supabase y no deben prerenderizarse.
  {
    path: 'propiedad/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/propiedades/editar/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
