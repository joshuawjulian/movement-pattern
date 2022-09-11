import type { Database } from './database.types';
import { supabase } from './supabase';

export type Pattern_Type = Database['public']['Tables']['pattern']['Row'];

export async function getAllPatterns(): Promise<Pattern_Type[]> {
	const { data, error } = await supabase.from('pattern').select('*');
	if (error) throw new Error(error.message);
	return data;
}

export async function getPatternByName(patternName: string) {
	const { data, error } = await supabase
		.from('pattern')
		.select('*')
		.filter('name', 'eq', patternName);

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data[0];
}
