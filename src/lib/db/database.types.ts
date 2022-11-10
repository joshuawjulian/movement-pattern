export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			movement: {
				Row: {
					name: string;
					id: string;
					isWeighted: boolean;
				};
				Insert: {
					name?: string | null;
					id?: string;
					isWeighted?: boolean;
				};
				Update: {
					name?: string | null;
					id?: string;
					isWeighted?: boolean;
				};
			};
			movement_name: {
				Row: {
					id: string;
					movement_id: string | null;
					name: string | null;
				};
				Insert: {
					id?: string;
					movement_id?: string | null;
					name?: string | null;
				};
				Update: {
					id?: string;
					movement_id?: string | null;
					name?: string | null;
				};
			};
			movement_pattern: {
				Row: {
					id: string;
					pattern_id: string;
					movement_id: string;
					percent: number;
				};
				Insert: {
					id?: string;
					pattern_id: string;
					movement_id: string;
					percent: number;
				};
				Update: {
					id?: string;
					pattern_id?: string;
					movement_id?: string;
					percent?: number;
				};
			};
			pattern: {
				Row: {
					id: string;
					name: string;
				};
				Insert: {
					id?: string;
					name: string;
				};
				Update: {
					id?: string;
					name?: string;
				};
			};
			series: {
				Row: {
					id: string;
					name: string;
				};
				Insert: {
					id?: string;
					name: string;
				};
				Update: {
					id?: string;
					name?: string;
				};
			};
			user_level: {
				Row: {
					id: string;
					user_id: string;
					level: number | null;
				};
				Insert: {
					id?: string;
					user_id: string;
					level?: number | null;
				};
				Update: {
					id?: string;
					user_id?: string;
					level?: number | null;
				};
			};
			workout: {
				Row: {
					id: string;
					name: string;
					description: string;
					created_by: string;
				};
				Insert: {
					id?: string;
					name?: string;
					description?: string;
					created_by?: string;
				};
				Update: {
					id?: string;
					name?: string;
					description?: string;
					created_by?: string;
				};
			};
			workout_movement: {
				Row: {
					id: string;
					movement_id: string;
					percent: number;
					workout_id: string;
				};
				Insert: {
					id?: string;
					movement_id: string;
					percent: number;
					workout_id: string;
				};
				Update: {
					id?: string;
					movement_id?: string;
					percent?: number;
					workout_id?: string;
				};
			};
			workout_series: {
				Row: {
					id: string;
					workout_id: string;
					series_id: string;
				};
				Insert: {
					id: string;
					workout_id: string;
					series_id: string;
				};
				Update: {
					id?: string;
					workout_id?: string;
					series_id?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_user_level: {
				Args: { id: string };
				Returns: number;
			};
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
