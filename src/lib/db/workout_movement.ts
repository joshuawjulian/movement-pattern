import type { Database } from './database.types';
import type { MovementType } from './movement';
import { supabase } from './supabase';

export type WorkoutMovementInsertType =
	Database['public']['Tables']['workout_movement']['Insert'];

async function update(
	workout_id: string,
	movementsToUpdate: MovementType[],
) {
	let { data, error } = await supabase
		.from('workout_movement')
		.select('movement(id,name)')
		.eq('workout_id', workout_id);

	if (error) throw new Error(error.message);
	if (typeof data === 'undefined') data = [];

	let currentMovements: MovementType[] = [];
	data.forEach((value: MovementType) => {
		currentMovements.push(value);
	});

	let movementsToAdd = [];
	let movementsToRemove = [];

	//find movements to add
	for (let i = 0; i < movementsToUpdate.length; i++) {
		let move = movementsToUpdate[i];

		let idxInData = currentMovements.findIndex((value) => {
			return value.id === move.id;
		});
		if (idxInData < 0) movementsToAdd.push(move);
	}

	console.log('Moves to remove');
	//find movements to remove
	for (let i = 0; i < currentMovements.length; i++) {
		let move = currentMovements[i];

		let idx = movementsToUpdate.findIndex((value) => {
			return value.id === move.id;
		});
		console.log(`idx = ${idx}`);
		if (idx < 0) {
			movementsToRemove.push(move);
		}
	}

	await deleteMultiple(workout_id, movementsToRemove);
	await insertMultipleAndReturn(workout_id, movementsToAdd);
}

async function deleteMultiple(
	workout_id: string,
	movementsToRemove: MovementType[],
) {
	console.log('removeWorkoutMovement');
	for (let i = 0; i < movementsToRemove.length; i++) {
		console.log('removing..');
		console.log({ workout_id, movement_id: movementsToRemove[i].id });
		const { error } = await supabase
			.from('workout_movement')
			.delete()
			.match({ workout_id, movement_id: movementsToRemove[i].id });

		if (error) throw new Error(error.message);
	}
}

async function insertMultipleAndReturn(
	workout_id: string,
	movementsToAdd: MovementType[],
) {
	let insertArr: WorkoutMovementInsertType[] = [];
	movementsToAdd.forEach((move) => {
		insertArr.push({ workout_id, movement_id: move.id, percent: 0.0 });
	});

	const { error } = await supabase
		.from('workout_movement')
		.insert(insertArr);

	if (error) throw new Error(error.message);
}

async function insertAndReturn(
	workout_id: string,
	movement: MovementType,
) {
	const { data, error } = await supabase
		.from('workout_movement')
		.insert({ workout_id, movement_id: movement.id, percent: 0.0 })
		.select()
		.single();

	if (error) throw new Error(error.message);

	return data;
}

export const WorkoutMovement = {
	insertAndReturn,
	insertMultipleAndReturn,
	deleteMultiple,
	update,
};
