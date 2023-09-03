import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    {params}: {params: {userId: string}},
  ) {
    try {
        if(!params.userId){
            return new NextResponse("Id del usuario es necesario", {status: 400});
        }

      const users = await prismadb.user.findMany({
        where: {
            id: params.userId,
        },
        include: {
          grupo: true
        }
  
      }); 
    
      return NextResponse.json(users);
    } catch (error) {
      console.log('[USUARIOS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
  

export async function PATCH(
    req: Request,
    {params}: {params: {userId: string}},
){
    try {
        const body = await req.json();

        const { name, email, password, userRole, grupoId } = body;

        if (!name) {
            return new NextResponse("Nombre del usuario es necesario", { status: 400 });
          }
          if (!email) {
            return new NextResponse("El email del usuario es necesario", { status: 400 });
          }
          if (!password) {
            return new NextResponse("La contraseña es necesaria", { status: 400 });
          }
          if (!userRole) {
            return new NextResponse("El rol del usuario es necesario", { status: 400 });
          }
          if (!grupoId) {
            return new NextResponse("Grupo id es necesario", { status: 400 });
          }

        if(!params.userId){
            return new NextResponse("User Id is required", {status: 400})
        }

        const user = await prismadb.user.updateMany({
            where: {
                id: params.userId,
            }, 
            data: {
                name, 
                email,
                password,
                userRole,
                grupoId
            }
        })

        return NextResponse.json(user); 

    } catch (error) {
        console.log('[USER_PATCH]', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {userId: string}}
){
    try{
        if(!params.userId){
            return new NextResponse("Id del grupo es necesario", {status: 400});
        }

        const user = await prismadb.user.deleteMany({
            where: {
                id: params.userId, 
            }
        });

        return NextResponse.json(user);

    }catch(error){
        console.log("USER_DELETE", error);
        return new NextResponse("Internal error", {status: 500});
    }
}
