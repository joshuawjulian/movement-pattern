import { supabase } from './supabase';
import { db } from '.';
import type { MovementType } from './movement';
import type { PatternType } from './pattern';

export type MovementPatternType = {
	id: string;
	percent: number;
	movement: MovementType;
	pattern: PatternType;
};

async function getAll() {
	const { data, error } = await supabase
		.from('movement_pattern')
		.select('id, movement(*), pattern(*), percent')
		.order('id', { foreignTable: 'movement' });
	if (error) throw new Error(error.message);
	return data as MovementPatternType[];
}

async function getByMovementAndPattern(
	movementName: string,
	patternName: string,
): Promise<MovementPatternType | null> {
	const m = await db.Movement.getByName(movementName);
	const p = await db.Pattern.getByName(patternName);
	const { data, error } = await supabase
		.from('movement_pattern')
		.select('id, movement(*), pattern(*), percent')
		.match({ movement_id: m.id, pattern_id: p.id })
		.limit(1)
		.single();

	if (error) return null;

	return data as MovementPatternType;
}

async function getTable() {
	let table: any = {};

	const allMovements = await db.Movement.getAll();
	const allPatterns = await db.Pattern.getAll();

	allMovements.forEach((movement) => {
		allPatterns.forEach((pattern) => {
			if (table[movement.name] === undefined) table[movement.name] = {};
			table[movement.name][pattern.name] = 0;
		});
	});

	(await getAll()).forEach((mp) => {
		table[mp.movement.name][mp.pattern.name] = mp.percent;
	});

	return table;
}

async function update(
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

	const m = await db.Movement.getByName(movementName);
	const p = await db.Pattern.getByName(patternName);

	if (percent == 0 || percent == 0.0) {
		//delete
		const { error } = await supabase
			.from('movement_pattern')
			.delete()
			.match({
				pattern_id: p.id,
				movement_id: m.id,
			});
		if (error) throw new Error(error.message);
	} else {
		const mp = await getByMovementAndPattern(m.name, p.name);

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
		const { error } = await supabase
			.from('movement_pattern')
			.upsert(upsert);

		if (error) throw new Error(error.message);
	}
}

export const MovementPattern = {
	getAll,
	update,
	getTable,
	getByMovementAndPattern,
};
