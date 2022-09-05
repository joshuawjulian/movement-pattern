export type MovementPattern_Type = {
	id: string;
	percent: number;
	movement: Movement_Type;
	pattern: Pattern_Type;
};

export async function getAllMovementPatterns(): MovementPattern_Type[] {
	const { data, error } = await supabase
		.from('movement_pattern')
		.select('id, movement(*), pattern(*), percent');
	if (error) throw new Error(error.message);
	return data;
}
