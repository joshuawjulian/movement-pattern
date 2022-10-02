import type { Database } from './database.types';
import { supabase } from './supabase';

export type PatternType = Database['public']['Tables']['pattern']['Row'];

async function getAll(): Promise<PatternType[]> {
	const { data, error } = await supabase.from('pattern').select('*');
	if (error) throw new Error(error.message);
	return data;
}

async function getByName(patternName: string) {
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

export const Pattern = {
	getAll,
	getByName,
};
