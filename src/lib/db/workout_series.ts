import type { SeriesType } from './series';
import { supabase } from './supabase';
import type { WorkoutType } from './workout';

export type WorkoutSeriesType = {
	Series: SeriesType;
	Workouts: WorkoutType[];
};

export const Series = {
	getAll,
};

async function getAll(): Promise<WorkoutSeriesType[]> {
	const { data, error } = await supabase
		.from('workout_series')
		.select('*');

	if (error) throw new Error(error.message);

	return data as WorkoutSeriesType[];
}
