import { supabase } from '$lib/supabase';
import { getAllPatterns, type Pattern_Type } from '$lib/pattern';
import { getAllMovements, type Movement_Type } from '$lib/movement';

export type MovementPattern_Type = {
	id: string;
	percent: number;
	movement: Movement_Type;
	pattern: Pattern_Type;
};

export async function getAllMovementPatterns() {
	const { data, error } = await supabase
		.from('movement_pattern')
		.select('id, movement(*), pattern(*), percent')
		.order('id', { foreignTable: 'movement' });
	if (error) throw new Error(error.message);
	return data as MovementPattern_Type[];
}

export type PatternPercentPair_Type = Pattern_Type & {
	mp_id: string | null;
	percent: number;
};

export type MPTableRow_Type = {
	movement: Movement_Type;
	patterns: PatternPercentPair_Type[];
};

export async function getMovementPatternTable() {
	let table: any = {};

	const allMovements = await getAllMovements();
	const allPatterns = await getAllPatterns();

	console.log(allMovements);
	console.log(allPatterns);

	allMovements.forEach((movement) => {
		allPatterns.forEach((pattern) => {
			if (table[movement.name] === undefined) table[movement.name] = {};
			table[movement.name][pattern.name] = 0;
		});
	});

	(await getAllMovementPatterns()).forEach((mp) => {
		table[mp.movement.name][mp.pattern.name] = mp.percent;
	});

	return table;
}
