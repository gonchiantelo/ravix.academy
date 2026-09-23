'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (password !== process.env.DASHBOARD_PASSWORD) {
    return { message: 'Contraseña incorrecta' };
  }

  // Set the cookie securely
  const cookieStore = await cookies();
  cookieStore.set('ravix_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  // Redirect to dashboard
  redirect('/');
}
