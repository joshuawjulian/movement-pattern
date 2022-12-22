import { z } from 'zod';
import type { Database } from './database.types';
import { supabase } from './supabase';

export const MovementZod = z.object({
	id: z.string().uuid().optional(),
	name: z.string(),
	names: z
		.array(
			z.object({
				name: z.string(),
			}),
		)
		.optional(),
});

export type MovementType = z.infer<typeof MovementZod>;

export const Movement = {
	getAll,
	getByName,
	getById,
	updateNames,
	upsert,
	deleteByName,
	deleteById,
	insert,
	suggestMovements,
};

async function getAll(): Promise<MovementType[]> {
	const { data, error } = await supabase
		.from('movement')
		.select('*, names:movement_name(name)')
		.order('name');
	if (error) throw new Error(error.message);

	const MovementZodArray = z.array(MovementZod);

	let parsedData: MovementType[] = MovementZodArray.parse(data);

	return parsedData;
}

export async function getById(id: string) {
	const { data, error } = await supabase
		.from('movement')
		.select('*, names:movement_name(name)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data as MovementType;
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
		let movement = await getById(id);
		if (!movement.id) throw new Error('Movement ID doesnt exist');

		let current_names = await getAllNames({ id });

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
		.select('*, names:movement_name(name)')
		.filter('name', 'eq', movementName);

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data[0] as MovementType;
}

async function insert(name: string) {
	const { error } = await supabase.from('movement').insert({ name });

	if (error) throw new Error(error.message);
}

async function deleteById(id: string) {
	const { error } = await supabase.from('movement').delete().match({ id });
	if (error) throw new Error(error.message);
}

async function deleteByName(name: string) {
	const { error } = await supabase
		.from('movement')
		.delete()
		.match({ name });
	if (error) throw new Error(error.message);
}

async function getAllNames(
	movement: Partial<MovementType>,
): Promise<string[]> {
	if (movement.name === undefined && movement.id === undefined)
		throw new Error('Movement must have either a name or id');

	if (movement.name !== undefined) {
		movement = await getByName(movement.name);
	} else if (movement.id !== undefined) {
		movement = await getById(movement.id);
	}

	if (movement === undefined)
		throw new Error('getAllNames(): Undefined Movement');

	let names = [];
	if (movement.name) names.push(movement.name);
	if (movement.names !== undefined) {
		movement.names.forEach((name) => {
			names.push(name.name);
		});
	}

	return names;
}

async function suggestMovements(
	description: string,
	filteredMovements: MovementType[] = [],
): Promise<MovementType[]> {
	console.log(`description: ${description}`);
	let suggestedMovements: MovementType[] = [];
	let allMovements = await getAll();

	//remove the filtered movements from all searchable movements
	for (let i = 0; i < filteredMovements.length; i++) {
		for (let y = 0; y < allMovements.length; y++) {
			if (allMovements[y].id === filteredMovements[i].id) {
				allMovements.splice(y, 1);
				break;
			}
		}
	}

	for (let i = 0; i < allMovements.length; i++) {
		const currMovement = allMovements[i];
		let searchTerms: string[] = [currMovement.name];
		const otherNames: {
			id?: string;
			name?: string;
		}[] = currMovement.names || [];
		for (let y = 0; y < otherNames.length; y++) {
			const otherName = otherNames[y].name;
			if (otherName) searchTerms.push(otherName);
		}
		console.log(`search terms`);
		console.log(searchTerms);
		for (let i = 0; i < searchTerms.length; i++) {
			const term = searchTerms[i];
			let findIdx = description
				.toLocaleLowerCase()
				.indexOf(term.toLocaleLowerCase());
			if (findIdx >= 0) {
				suggestedMovements.push(currMovement);
				break;
			}
		}
	}

	console.log(`suggested`);
	console.log(suggestedMovements);

	return suggestedMovements;
}
