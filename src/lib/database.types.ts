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
