import type { Database } from './database.types';
import { supabase } from './supabase';

export type Movement_Type = Database['public']['Tables']['movement']['Row'];

export async function getAllMovements(): Promise<Movement_Type[]> {
	const { data, error } = await supabase.from('movement').select('*');
	if (error) throw new Error(error.message);
	return data;
}

export async function getMovementByName(movementName: string) {
	const { data, error } = await supabase
		.from('movement')
		.select('*')
		.filter('name', 'eq', movementName);

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data[0];
}

export async function addMovement(name: string) {
	const { error } = await supabase.from('movement').insert({ name });

	if (error) throw new Error(error.message);
}

export async function deleteMovement(id: string) {
	const { error } = await supabase.from('movement').delete().match({ id });
	if (error) throw new Error(error.message);
}

export async function deleteMovementByName(name: string) {
	const { error } = await supabase.from('movement').delete().match({ name });
	if (error) throw new Error(error.message);
}
