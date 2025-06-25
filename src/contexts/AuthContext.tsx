import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthState, AdminUser, supabase } from '@/services/authService';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ user: AdminUser | null; error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // This effect runs once on mount to determine the initial auth state.
  useEffect(() => {
    const initializeAuth = async () => {
      // If supabase is configured, check for an active session.
      if (supabase) {
        const user = await authService.getCurrentUser();
        setAuthState({ user, isAuthenticated: !!user, isLoading: false });

        // Listen for auth state changes from Supabase.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const freshUser = await authService.getCurrentUser();
            setAuthState({ user: freshUser, isAuthenticated: !!freshUser, isLoading: false });
          } else if (event === 'SIGNED_OUT') {
            setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          }
        });
        
        return () => subscription.unsubscribe();
      } 
      // If Supabase is NOT configured, check for a local development admin session.
      else if (import.meta.env.DEV) {
        try {
          const localAdmin = localStorage.getItem('local_admin');
          if (localAdmin) {
            const adminData = JSON.parse(localAdmin);
            setAuthState({ user: adminData, isAuthenticated: true, isLoading: false });
          } else {
            setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          }
        } catch {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
      // If not dev mode and no supabase, user is not authenticated.
      else {
         setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Local dev mode fallback if Supabase is not configured
    if (!supabase && import.meta.env.DEV && email === 'admin@top-cleaners.net' && password === 'admin123') {
      const localAdminUser: AdminUser = {
        id: 'local-admin',
        email: 'admin@top-cleaners.net',
        role: 'admin',
        created_at: new Date().toISOString()
      };
      localStorage.setItem('local_admin', JSON.stringify(localAdminUser));
      setAuthState({ user: localAdminUser, isAuthenticated: true, isLoading: false });
      return { user: localAdminUser, error: null };
    }

    // Default to Supabase auth service
    const result = await authService.signIn(email, password);
    
    if (result.user) {
      setAuthState({ user: result.user, isAuthenticated: true, isLoading: false });
    } else {
      setAuthState(prev => ({ ...prev, isAuthenticated: false, isLoading: false }));
    }
    
    return result;
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Always clear local session regardless of mode
    localStorage.removeItem('local_admin');
    
    // Sign out from Supabase if it's configured
    if (supabase) {
      await authService.signOut();
    }
    
    // Update state after operations are complete
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  const value: AuthContextType = {
    ...authState,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};