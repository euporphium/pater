import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/');
  }

  async function signIn(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/auth/login?message=Could not authenticate user');
    }

    return redirect('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center border-[16px] border-green-900 p-12">
      <form
        className="flex w-full max-w-md flex-1 flex-col justify-center gap-2"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-sm border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="mb-2 rounded-sm bg-green-900 px-4 py-2 text-white">
          Log In
        </button>
        <Link className="underline" href={'/auth/register'}>
          Create a New Account
        </Link>
        {searchParams?.message && (
          <p className="mt-4 p-4 text-center">{searchParams.message}</p>
        )}
      </form>
    </main>
  );
}
