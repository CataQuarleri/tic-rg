import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      console.log("📡 Attempting to fetch resources from Supabase...");
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("❌ Supabase Fetch Error:", error);
        throw new Error(error.message);
      }
console.log("📥 Resources received:", data?.length);
      return data;
    },
    retry: false,
  });
};
