import type { Database } from './database.types';
import type { Movement_Type } from './movement';
import { supabase } from './supabase';

export type WorkoutMovementInsertType =
	Database['public']['Tables']['workout_movement']['Insert'];

export async function updateWorkoutMovements(
	workout_id: string,
	movementsToUpdate: Movement_Type[],
) {
	let { data, error } = await supabase
		.from('workout_movement')
		.select('*')
		.eq('workout_id', workout_id);

	if (error) throw new Error(error.message);
	if (typeof data === 'undefined') data = [];

	let movementsToAdd = [];
	let movementsToRemove = [...data];

	console.log('data');
	console.log(data);
	console.log('movementToUpdate');
	console.log(movementsToUpdate);

	for (let i = 0; i < movementsToUpdate.length; i++) {
		let move = movementsToUpdate[i];

		let idxInData = data.findIndex((value) => {
			return value.movement_id === move.id;
		});
		if (idxInData < 0) movementsToAdd.push(move);
		else movementsToRemove.splice(idxInData, 1);
	}

	console.log('MovementsToRemove');
	console.log(movementsToRemove);
	console.log('MovementsToAdd');
	console.log(movementsToAdd);

	await removeWorkoutMovement(workout_id, movementsToRemove);
	await insertWorkoutMovement(workout_id, movementsToAdd);
}

export async function removeWorkoutMovement(
	workout_id: string,
	movementsToRemove: Movement_Type[],
) {
	for (let i = 0; i < movementsToRemove.length; i++) {
		const { error } = await supabase
			.from('workout_movement')
			.delete()
			.match({ workout_id, movement_id: movementsToRemove[i].id });

		if (error) throw new Error(error.message);
	}
}

export async function insertWorkoutMovement(
	workout_id: string,
	movementsToAdd: Movement_Type[],
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
