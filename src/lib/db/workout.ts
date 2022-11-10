import type { Database } from './database.types';
import type { MovementType } from './movement';
import { supabase } from './supabase';

export const Workout = {
	upsertAndReturn,
	getById,
	getAllShort,
};

export type WorkoutType = {
	id: string;
	name: string;
	description: string;
};

async function getById(id: string) {
	const { data, error } = await supabase
		.from('workout')
		.select(`*, movements:workout_movement(id, movement(id,name))`)
		.eq('id', id)
		.single();

	if (error) throw new Error(error.message);
	let movements: MovementType[] = [];

	data.movements.forEach((item: any) => {
		movements.push(item.movement);
	});

	data.movements = movements;
	return data;
}

export type WorkoutShortType = {
	id: string;
	name: string;
};

async function getAllShort(): Promise<WorkoutShortType[]> {
	const { data, error } = await supabase
		.from('workout')
		.select('id, name');

	if (error) throw new Error(error.message);

	return data;
}

export type WorkoutResponse = Awaited<ReturnType<typeof getById>>;
export type WorkoutResponseSuccess = WorkoutResponse['data'] & {
	movements: MovementType[];
};

export type WorkoutInsertType =
	Database['public']['Tables']['workout']['Insert'];
export async function upsertAndReturn(workout: WorkoutInsertType) {
	console.log(`upsertWorkout()`);
	console.log(workout);
	const { data, error } = await supabase
		.from('workout')
		.upsert(workout)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data;
}
