import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (userId) => {
    try {
      // 5-second timeout promise
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Role fetch timed out')), 5000)
      );

      // Supabase query promise
      const query = supabase
        .from('user_roles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      // Race the query against the timeout
      const { data, error } = await Promise.race([query, timeout]);

      if (error) throw error;

      if (data && data.role) {
        console.log(`[Auth] Role found: ${data.role}`);
        setUserRole(data.role);
      } else {
        console.log('[Auth] No role found, defaulting to "user"');
        setUserRole('user');
      }
    } catch (err) {
      console.warn(`[Auth] Role fetch failed or timed out: ${err.message}. Defaulting to "user"`);
      setUserRole('user');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log('[Auth] Initializing authentication...');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          console.log(`[Auth] User session found: ${session.user.email}`);
          setUser(session.user);
          await fetchUserRole(session.user.id);
        } else {
          console.log('[Auth] No active session found.');
        }
      } catch (err) {
        console.error("[Auth] Initialization error:", err.message);
      } finally {
        console.log('[Auth] Setting loading to FALSE (Initialization complete)');
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[Auth] Auth state changed: ${event}`);
      
      try {
        if (session) {
          console.log(`[Auth] Session updated for: ${session.user.email}`);
          setUser(session.user);
          await fetchUserRole(session.user.id);
        } else {
          console.log('[Auth] Session cleared.');
          setUser(null);
          setUserRole(null);
        }
      } catch (err) {
        console.error("[Auth] State change error:", err.message);
      } finally {
        console.log('[Auth] Setting loading to FALSE (State change complete)');
        setLoading(false);
      }
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isAdmin = userRole === 'admin';

  return (
    <AuthContext.Provider value={{ user, userRole, isAdmin, login, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
