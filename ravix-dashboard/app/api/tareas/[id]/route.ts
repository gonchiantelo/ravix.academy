import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.RAVIX_API_URL;
const API_KEY = process.env.RAVIX_API_KEY;

/**
 * GET /api/tareas/[id]
 *
 * Proxy hacia RAVIX_API_URL/tareas/:id
 * Devuelve la tarea completa con tarea_subpilares y modificadores_avanzados expandidos.
 * El navegador NUNCA ve la RAVIX_API_KEY — se agrega aquí, del lado del servidor.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const upstreamUrl = `${API_BASE}/tareas/${id}`;

    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY!,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Si la tarea no existe, el 404 de Render se reenvía tal cual
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[/api/tareas/[id] GET]', error);
    return NextResponse.json(
      { error: 'Error al conectarse con ravix-api' },
      { status: 502 }
    );
  }
}

/**
 * PATCH /api/tareas/[id]
 *
 * Proxy hacia RAVIX_API_URL/tareas/:id
 * Reenvía el body JSON con los campos a actualizar.
 * Los errores de validación se pasan directamente al cliente — la API ya valida todo.
 * El navegador NUNCA ve la RAVIX_API_KEY.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const upstreamUrl = `${API_BASE}/tareas/${id}`;

    const response = await fetch(upstreamUrl, {
      method: 'PATCH',
      headers: {
        'x-api-key': API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[/api/tareas/[id] PATCH]', error);
    return NextResponse.json(
      { error: 'Error al conectarse con ravix-api' },
      { status: 502 }
    );
  }
}

/**
 * DELETE /api/tareas/[id]
 *
 * Proxy hacia RAVIX_API_URL/tareas/:id
 * Sin body — solo reenvía el método DELETE con la API key del servidor.
 * El navegador NUNCA ve la RAVIX_API_KEY.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const upstreamUrl = `${API_BASE}/tareas/${id}`;

    const response = await fetch(upstreamUrl, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY!,
      },
    });

    // DELETE devuelve 200 con el objeto eliminado — lo reenviamos igual
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[/api/tareas/[id] DELETE]', error);
    return NextResponse.json(
      { error: 'Error al conectarse con ravix-api' },
      { status: 502 }
    );
  }
}
