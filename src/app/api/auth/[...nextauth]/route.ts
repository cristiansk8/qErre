// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Configuración de NextAuth
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};

// Crea el manejador de NextAuth
const handler = NextAuth(authOptions);

// Exporta el manejador para los métodos GET y POST
export { handler as GET, handler as POST };

// Exporta `authOptions` para ser usado en otros archivos si es necesario
export { authOptions };




