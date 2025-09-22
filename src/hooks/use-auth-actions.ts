import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import type { AuthError } from "firebase/auth";

import { useState } from "react";
import { useAuth, useUser } from "reactfire";
import { useUserActions } from "./use-user-actions";

interface AuthActionResponse {
  success: boolean;
  error: AuthError | null;
}

export const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const { createOrUpdateUser } = useUserActions();

  // Esto quiere decir que el login devuelve una promesa del tipo, declarado anteriormente: AuthActionResponse
  const login = async (data: {
    email: string;
    password: string;
  }): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    displayName: string;
  }): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });
        // para guardar el usuario en firestore
        await createOrUpdateUser(currentUser.user);
        // Forzar la recarga del usuario para que los cambios en el perfil se reflejen inmediatamente
        await currentUser.user.reload();
      }
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      await createOrUpdateUser(data.user);

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<AuthActionResponse> => {
    setLoading(true);
    try {
      await signOut(auth);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  };
};
