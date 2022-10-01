export interface Database {
	public: {
		Tables: {
			movement: {
				Row: {
					id: string;
					name: string;
					names?: { id?: string; name?: string }[];
				};
				Insert: {
					name: string;
				};
				Update: {
					id?: string | null;
					name: string;
				};
			};
			movement_name: {
				Row: {
					id: string;
					movement_id: string;
					name: string;
				};
			};
			movement_pattern: {
				Row: {
					id: string;
					percent: number;
					movement_id: string;
					pattern_id: string;
				};
				Update: {
					id?: string | null;
					percent: number;
					movement_id?: string | null;
					pattern_id?: string | null;
				};
				Insert: {
					percent: number;
					movement_id: string;
					pattern_id: string;
				};
			};
			pattern: {
				Row: {
					id: string;
					name: string;
				};
				Insert: {
					name: string;
				};
				Update: {
					id?: string | null;
					name: string;
				};
			};
			workout: {
				Select: {
					id: string;
					name: string;
					description: string;
					created_by: string;
				};
				Insert: {
					name: string;
					description: string | null;
					created_by?: string;
					movements?: (
						| { id: string; name?: string }
						| { id?: string; name: string }
					)[];
				};
			};
			workout_movement: {
				Select: {
					id: string;
					movement_id: string;
					workout_id: string;
					percent: number;
				};
				Update: {
					id: string;
					movement_id: string;
					workout_id: string;
					percent: number;
				};
				Insert: {
					movement_id: string;
					workout_id: string;
					percent: number;
				};
			};
		};
	};
}
