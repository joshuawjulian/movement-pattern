import type { Database } from './database.types';
import { MovementZod, type MovementType } from './movement';
import { supabase } from './supabase';
import { z } from 'zod';

export const Workout = {
	upsertAndReturn,
	getById,
	getAllShort,
};

export const WorkoutZod = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	created_by: z.string().uuid(),
	movements: z.array(MovementZod),
});

export type WorkoutType = z.infer<typeof WorkoutZod>;

export const WorkoutInsertZod = z.object({
	name: z.string(),
	description: z.string(),
});

export const WorkoutUpdateZod = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
});
export const WorkoutUpsertZod = z.union([
	WorkoutUpdateZod,
	WorkoutInsertZod,
]);

export const EmptyWorkout: WorkoutType = {
	id: '',
	name: '',
	description: '',
	created_by: '',
	movements: [],
};

async function getById(id: string): Promise<WorkoutType> {
	const { data, error } = await supabase
		.from('workout')
		.select(`*, movements:movement(*)`)
		.eq('id', id)
		.single();

	if (error) throw new Error(error.message);

	console.log(data);
	let workout = WorkoutZod.parse(data);

	return workout;
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

export type WorkoutUpsertType = z.infer<typeof WorkoutUpsertZod>;

export async function upsertAndReturn(workout: WorkoutUpsertType) {
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

	let parsed = WorkoutZod.parse(data);

	return parsed;
}
