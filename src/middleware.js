import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Rutas públicas donde no debe ejecutarse el middleware
const publicRoutes = ["/login", "/inicio", "/registro", "/"] 

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  // Verifica si la ruta está protegida (si no está en publicRoutes)
  const isProtectedRoute = !publicRoutes.includes(path);
  
  // Obtén la cookie 'user'
  const cookie = (await cookies()).get('user')?.value;

  // Si es una ruta protegida y no hay cookie, redirige a login
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Si la cookie está presente o la ruta no es protegida, deja pasar la solicitud
  return NextResponse.next();
}

// Configuración de rutas donde el middleware debe ejecutarse
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',  // Excluir rutas estáticas y de API
    '/eventos/'  // Permite rutas dinámicas como /eventos/{id}
  ],
}
