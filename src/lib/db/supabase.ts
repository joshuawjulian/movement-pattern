import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type ColorThemeType = 'system' | 'light' | 'dark';
export const theme: Writable<ColorThemeType> = writable('system');

export const userStore: Writable<User | null> = writable(null);

supabase.auth.onAuthStateChange(
	(event: AuthChangeEvent, session: Session | null) => {
		console.log(`AUTH STATE CHANGE : ${event}`);
		if (session === null) userStore.set(null);
		else userStore.set(session.user);
	},
);
