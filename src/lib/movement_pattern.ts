import { supabase } from '$lib/supabase';
import {
	getAllPatterns,
	getPatternByName,
	type Pattern_Type,
} from '$lib/pattern';
import {
	getAllMovements,
	getMovementByName,
	type Movement_Type,
} from '$lib/movement';

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

export async function getMovementPatternByMovementPattern(
	movementName: string,
	patternName: string,
): Promise<MovementPattern_Type | null> {
	const m = await getMovementByName(movementName);
	const p = await getPatternByName(patternName);
	const { data, error } = await supabase
		.from('movement_pattern')
		.select('id, movement(*), pattern(*), percent')
		.match({ movement_id: m.id, pattern_id: p.id })
		.limit(1)
		.single();

	if (error) return null;

	return data as MovementPattern_Type;
}

export async function getMovementPatternTable() {
	let table: any = {};

	const allMovements = await getAllMovements();
	const allPatterns = await getAllPatterns();

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

export async function updateMovementPattern(
	movementName: string,
	patternName: string,
	percent: number,
) {
	if (isNaN(percent)) {
		console.error(`${percent} is NaN`);
		return;
	}

	if (percent > 1.0) percent = 1.0;
	if (percent < 0.0) percent = 0;
	//get IDs

	const m = await getMovementByName(movementName);
	const p = await getPatternByName(patternName);

	if (percent == 0 || percent == 0.0) {
		//delete
		const { error } = await supabase.from('movement_pattern').delete().match({
			pattern_id: p.id,
			movement_id: m.id,
		});
		if (error) throw new Error(error.message);
	} else {
		const mp = await getMovementPatternByMovementPattern(m.name, p.name);

		let upsert = {};

		if (mp !== null) {
			upsert = {
				id: mp.id,
				movement_id: m.id,
				pattern_id: p.id,
				percent,
			};
		} else {
			upsert = {
				movement_id: m.id,
				pattern_id: p.id,
				percent,
			};
		}

		//update/insert
		const { error } = await supabase.from('movement_pattern').upsert(upsert);

		if (error) throw new Error(error.message);
	}
}
