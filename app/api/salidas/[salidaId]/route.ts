import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { salidaId: string } }
) {
  try {
    if (!params.salidaId) {
      return new NextResponse('Id de la salida es necesario', { status: 400 });
    }

    const salida = await prismadb.salida.findUnique({
      where: {
        id: params.salidaId,
      },
    });

    return NextResponse.json(salida);
  } catch (error) {
    console.log('[SALIDA_GET]', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { salidaId: string } }
) {
  try {
    const body = await req.json();

    const {name, lugar, fecha, descripcion} = body;

    if (name || !lugar || !fecha || !descripcion) {
      return new NextResponse('Todos los campos son necesarios', {
        status: 400,
      });
    }

    if (!params.salidaId) {
      return new NextResponse('Id de la salida es necesario', { status: 400 });
    }

    const salida = await prismadb.salida.updateMany({
      where: {
        id: params.salidaId,
      },
      data: {
        name,
        lugar,
        fecha,
        descripcion,
      },
    });

    return NextResponse.json(salida);
  } catch (error) {
    console.log('[SALIDA_PATCH]', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { salidaId: string } }
) {
  try {
    if (!params.salidaId) {
      return new NextResponse('Id de la salida es necesario', { status: 400 });
    }

    const salida = await prismadb.salida.deleteMany({
      where: {
        id: params.salidaId,
      },
    });

    return NextResponse.json(salida);
  } catch (error) {
    console.log('SALIDA_DELETE', error);
    return new NextResponse('Error interno', { status: 500 });
  }
}
