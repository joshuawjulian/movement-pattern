import { invalidate } from '$app/navigation';
import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

export async function load(data: any) {
	/**
	await invalidate();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log(user);
	throw redirect(307, '/login');
	*/
}
