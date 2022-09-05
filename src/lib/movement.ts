import type { Database } from './database.types';
import { supabase } from './supabase';

export type Movement_Type = Database['public']['Tables']['movement']['Row'];

export async function getAllMovements(): Promise<Movement_Type[]> {
	const { data, error } = await supabase.from('movement').select('*');
	if (error) throw new Error(error.message);
	return data;
}
