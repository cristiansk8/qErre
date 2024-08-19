'use client'
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { createUser } from '@/actions/user-actions';
import Link from 'next/link';

const SigninButton = () => {
  const { data: session } = useSession();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    if (session?.user && !isUserRegistered) {
      const registerUser = async () => {
        const formData = new FormData();
        formData.append('name', session.user?.name || '');
        formData.append('email', session.user?.email || '');

        try {
          await createUser(formData);
          console.log("Usuario registrado con éxito");
          setIsUserRegistered(true); // Marca al usuario como registrado
        } catch (error) {
          console.error("Error al registrar el usuario:", error);
        }
      };

      registerUser();
    }
  }, [session, isUserRegistered]); // Añade isUserRegistered para evitar bucles

  return (
    <div>
      {session && session.user ? (
        <div className="flex gap-4 ml-auto">
          <Link href="/dashboard/users/profile">
            <button
              type='button'
              className='h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900'
              onClick={() => console.log("ver perfil")}
            >ver perfil</button>
          </Link>
          <p className="text-sky-600">{session.user.name}</p>
          <button onClick={() => signOut()} className="text-red-600">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={() => signIn()} className="text-green-600 ml-auto">
          Sign In
        </button>
      )}
    </div>
  );
};

export default SigninButton;
