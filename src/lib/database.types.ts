export interface Database {
	public: {
		Tables: {
			movement: {
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
			movement_pattern: {
				Row: {
					id: string;
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
		};
	};
}
