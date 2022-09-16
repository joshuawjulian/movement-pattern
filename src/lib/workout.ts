import { supabase } from '$lib/supabase';
import type { Database } from './database.types';

export type WorkoutInsertType =
	Database['public']['Tables']['workout']['Insert'];
export type WorkoutType = Database['public']['Tables']['workout']['Select'];

export async function createWorkout(workout: Partial<WorkoutInsertType>) {
	if (workout.created_by === undefined || workout.created_by === null) {
		const { data } = await supabase.auth.getUser();
		if (data.user === undefined)
			throw new Error('CreateWorkout(): User Not Logged Int For');
		workout.created_by = data.user?.id;
	}
	const { error, data } = await supabase
		.from('workout')
		.insert(workout)
		.select()
		.single();
	if (error) throw new Error(error.message);

	return data as WorkoutType;
}
