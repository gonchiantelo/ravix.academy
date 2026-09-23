import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.RAVIX_API_URL;
const API_KEY = process.env.RAVIX_API_KEY;

/**
 * GET /api/tareas
 * GET /api/tareas?tag=TEC-PAC&nivel=3&bloque_sesion=TECNICA
 *
 * Proxy transparente hacia RAVIX_API_URL/tareas.
 * Reenvía todos los query params originales.
 * El navegador NUNCA ve la RAVIX_API_KEY — se agrega aquí, del lado del servidor.
 */
export async function GET(request: NextRequest) {
  try {
    // Reenviar todos los query params tal como llegaron (tag, nivel, bloque_sesion, etc.)
    const search = request.nextUrl.searchParams.toString();
    const upstreamUrl = `${API_BASE}/tareas${search ? `?${search}` : ''}`;

    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY!,
        'Content-Type': 'application/json',
      },
      // No cachear en el edge — siempre datos frescos desde Supabase
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[/api/tareas GET]', error);
    return NextResponse.json(
      { error: 'Error al conectarse con ravix-api' },
      { status: 502 }
    );
  }
}

/**
 * POST /api/tareas
 *
 * Proxy transparente hacia RAVIX_API_URL/tareas.
 * Reenvía el body JSON tal como llega del navegador.
 * Los errores de validación (400, 409) se pasan directamente al cliente para
 * que el formulario los muestre — la API ya tiene todas las validaciones.
 * El navegador NUNCA ve la RAVIX_API_KEY.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const upstreamUrl = `${API_BASE}/tareas`;

    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[/api/tareas POST]', error);
    return NextResponse.json(
      { error: 'Error al conectarse con ravix-api' },
      { status: 502 }
    );
  }
}
