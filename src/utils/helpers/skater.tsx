// helpers/skate.ts
import prisma from "@/lib/prisma";

export async function preRegister(name: string, email: string) {
  try {
    // Verifica si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { correo: email },
    });

    // Si el usuario no existe, se crea uno nuevo
    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          correo: email,
        },
      });
      console.log("Usuario registrado:", newUser);
    } else {
      console.log("El usuario ya está registrado:", existingUser);
    }
  } catch (error) {
    console.error("Error durante el pre-registro:", error);
  }
}
