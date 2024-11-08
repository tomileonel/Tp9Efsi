import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const publicRoutes = ["/login", "/register", "/", '/contacto'];

export default async function middleware(req) {
  console.log("Middleware ejecutado para la ruta:", req.nextUrl.pathname);

  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path); // Verifica si la ruta es protegida

  // Obtén la cookie 'user'
  const cookie = (await cookies()).get('user')?.value;
  console.log('Cookie `user` obtenida:', cookie);  // Verifica si se obtuvo la cookie correctamente

  // Si es una ruta protegida y no hay cookie, redirige a login
  if (isProtectedRoute && !cookie) {
    console.log('Redirigiendo a /login');
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Si la cookie está presente o la ruta no es protegida, deja pasar la solicitud
  return NextResponse.next();
}

// Configuración de rutas donde el middleware debe ejecutarse
export const config = {
  matcher: ['/((?!login|register|contacto).*)'],  // Regla que excluye las rutas públicas
};
