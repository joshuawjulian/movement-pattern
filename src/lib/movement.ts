import type { Database } from './database.types';
import { supabase } from './supabase';

export type MovementType = Database['public']['Tables']['movement']['Row'];

async function getAll(): Promise<MovementType[]> {
	const { data, error } = await supabase
		.from('movement')
		.select('*')
		.order('name');
	if (error) throw new Error(error.message);
	return data;
}

export async function getMovementById(id: string) {
	const { data, error } = await supabase
		.from('movement')
		.select('*, names:movement_name(name)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data;
}

async function upsert(movement: MovementType) {
	const { data, error } = await supabase
		.from('movement')
		.upsert({ id: movement.id, name: movement.name })
		.select()
		.single();
	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	let names: string[] = [];
	if (movement.names) {
		movement.names.forEach((name) => {
			if (name.name) names.push(name?.name);
		});
	}

	if (data.hasOwnProperty('id')) await updateNames(data.id, names);
	else throw new Error('Movement needs an id');
}

async function updateNames(id: string, new_names: string[]) {
	//ensure the movement id is valid
	try {
		let movement = await getMovementById(id);
		if (!movement.id) throw new Error('Movement ID doesnt exist');

		let data = await getName({ id });
		let current_names: string[] = [];
		data.forEach((value) => current_names.push(value.name));

		let add_names: string[] = new_names.filter((name) => {
			return current_names.indexOf(name) === -1;
		});

		let remove_names: string[] = current_names.filter((name) => {
			return new_names.indexOf(name) === -1;
		});

		remove_names.forEach(async (remove_name) => {
			let { error } = await supabase.from('movement_name').delete().match({
				movement_id: id,
				name: remove_name,
			});
			if (error) {
				console.error(error);
				throw new Error(error.message);
			}
		});

		add_names.forEach(async (add_name) => {
			let { error } = await supabase.from('movement_name').insert({
				movement_id: id,
				name: add_name,
			});
			if (error) {
				console.error(error);
				throw new Error(error.message);
			}
		});
	} catch (e) {
		throw e;
	}
}

async function getByName(movementName: string) {
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
	const { error } = await supabase
		.from('movement')
		.delete()
		.match({ name });
	if (error) throw new Error(error.message);
}

async function getName(movement: Partial<MovementType>) {
	if (movement.name === undefined && movement.id === undefined)
		throw new Error('Movement must have either a name or id');

	if (movement.name !== undefined) {
		movement = await getByName(movement.name);
	}

	const { data, error } = await supabase
		.from('movement_name')
		.select('name')
		.eq('movement_id', movement.id);

	if (error) throw new Error(error.message);

	return data;
}

export const Movement = {
	getAll,
	getByName,
	getName,
	updateNames,
	upsert,
};
