This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) that connects to a [Supabase](https://supabase.com/docs) backend.

This project uses [Supabase](https://supabase.com/docs) as a backend. To run the backend locally, you'll need to install the [Supabase CLI](https://supabase.com/docs/guides/cli) and [Docker](https://docs.docker.com/get-docker/).

## Before You Start

### [Supabase Local Development](https://supabase.com/docs/guides/cli/local-development)

Make sure Docker is running and then start the Supabase backend. `supabase start`

Once the Supabase services are running, you'll see output containing your local Supabase credentials. You'll need to copy these into a `.env.local` file in the root of the project:

```bash
NEXT_PUBLIC_SUPABASE_URL={{ API_URL }}
NEXT_PUBLIC_SUPABASE_ANON_KEY={{ anon_key }}
```

NOTE: These values can be found at any time by running `supabase status`.

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
