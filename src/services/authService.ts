import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This function creates the Supabase client. It now returns null if keys are missing.
const createSupabaseClient = (): SupabaseClient | null => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set. Authentication will fall back to local dev mode. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

export interface AdminUser {
  id: string;
  email?: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  async signIn(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    if (!supabase) {
      return { user: null, error: 'خدمة Supabase غير مكونة. يرجى مراجعة إعدادات البيئة.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide more specific, user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          return { user: null, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.' };
        }
        return { user: null, error: 'حدث خطأ أثناء تسجيل الدخول. يرجى التحقق من بياناتك.' };
      }

      if (data.user) {
        // Get user profile with role from the database
        const { data: profile, error: profileError } = await supabase
          .from('admin_users') // Ensure this table name matches your Supabase schema
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          // Sign out the user if their profile is missing to prevent unauthorized access
          await supabase.auth.signOut();
          return { user: null, error: 'ملف المستخدم الإداري غير موجود أو لا يمكن الوصول إليه.' };
        }

        const adminUser: AdminUser = {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          created_at: profile.created_at,
        };

        return { user: adminUser, error: null };
      }

      return { user: null, error: 'فشل المصادقة. يرجى المحاولة مرة أخرى.' };
    } catch (err) {
      return { user: null, error: 'خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت.' };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    if (supabase) {
      try {
        const { error } = await supabase.auth.signOut();
        return { error: error?.message || null };
      } catch (err) {
        return { error: 'فشل في تسجيل الخروج.' };
      }
    }
    // If supabase is not configured, there's nothing to sign out from on the server side.
    return { error: null };
  }

  async getCurrentUser(): Promise<AdminUser | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return null;

      const { data: profile } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!profile) return null;

      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        created_at: profile.created_at,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async resetPassword(email: string): Promise<{ error: string | null }> {
    if (!supabase) {
      return { error: 'Supabase غير مكونة. لا يمكن إعادة تعيين كلمة المرور.' };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error: error?.message || null };
    } catch (err) {
      return { error: 'فشل في إرسال رابط إعادة تعيين كلمة المرور.' };
    }
  }
}

export const authService = new AuthService();