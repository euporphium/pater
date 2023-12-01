import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function signOut() {
    'use server';

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect('/login');
  }

  await supabase.auth.signOut();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center border-[16px] border-green-900 p-12">
      {user ? (
        <form action={signOut} className="grid place-items-center text-center">
          <h1>Hi, {user.user_metadata.firstName ?? 'there'}!</h1>
          <button className="mb-2 rounded-sm bg-red-900 px-4 py-2 text-white">
            Log Out
          </button>
        </form>
      ) : (
        <div className="grid place-items-center text-center">
          <h1 className="mb-8 text-5xl">Come In</h1>
          <Link
            href="/register"
            className="mb-2 w-full rounded-sm bg-green-900 px-8 py-4 text-center text-white"
          >
            Create a New Account
          </Link>
          <Link
            href="/login"
            className="mb-2 w-full rounded-sm bg-green-900 px-4 py-2 text-center text-white"
          >
            Log In
          </Link>
        </div>
      )}
    </main>
  );
}
