import { supabase } from './supabase';

export type SeriesType = {
	id: string;
	name?: string;
};

export const Series = {
	getAll,
};

async function getAll(): Promise<SeriesType[]> {
	const { data, error } = await supabase.from('series').select('*');

	if (error) throw new Error(error.message);

	return data as SeriesType[];
}
