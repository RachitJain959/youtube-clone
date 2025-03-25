powershell -c "irm bun.sh/install.ps1|iex"
bunx create-next-app@15.6.1

0.  Project setup

1.  Basic Layout:
    1. Add Logo, font
    2. Create basaic app router folders
    3. Sidebar components:
        1. Side sections
        2. sidebar items

        A. Modules-home-ui:
        1. components, 2. layouts, 3. Search-Input, 4. Auth-Button, 5. Home-Sidebar, Main-Section, Personal-Section

2.  Authentication:
    1.  Integrate Clerk:
        1.  Install @clerk/nextjs

            ```terminal
            npm install @clerk/nextjs
            ```

        2.  Set your Clerk API keys
        3.  Add clerkMiddleware() to your app

            ```js
            import { clerkMiddleware } from '@clerk/nextjs/server';

            export default clerkMiddleware();

            export const config = {matcher: [
                // Skip Next.js internals and all static files, unless found in search params
                '/((?!\_next|[^?]_\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest))._)',
                // Always run for Clerk's auto-proxy path
                '/\_\_clerk/:path*',
                // Always run for API routes'/(api|trpc)(.*)',],};
            ```

        4.  Add ClerkProvider: `<ClerkProvider afterSignOutUrl="/">`
        5.  Add Sign-in & Sign-out pages
        6.  Add onClick events in authenticated routes
        7.  Protect routes:

            ```js
            const isProtectedRoute = createRouteMatcher(["/protected(/*)"]);

            export default clerkMiddleware(async (auth, req) => {
            	if (isProtectedRoute(req)) await auth.protect();
            });
            ```

3.  Database setup:
    1.  Setup DrizzleOrm: Only ORM with both relationl(prisma & mongoose) & SQL-likequery APIs, Serverless by default (unlike Prisma)
        1. Step 1 - Install @neondatabase/serverless package:

            ```bash
            bun add drizzle-orm @neondatabase/serverless dotenv
            bun add -D drizzle-kit tsx
            ```

        2. Step 2 - Setup connection variables:
            1. Create PostGreSQL DB (www.neon.tech)
            2. Get DATABASE_URL

        3. Step 3 - Connect Drizzle ORM to the database:
           index.ts:

            ```ts
            import { drizzle } from "drizzle-orm/neon-http";
            export const db = drizzle(process.env.DATABASE_URL!);
            ```

    2.  Create users schema:
        1. Step 4 - Create a table: users schema
        2. Create a drizzle.config.ts file in the root of your project and add the following content:

            ```ts
            import "dotenv/config";
            import { defineConfig } from "drizzle-kit";

            export default defineConfig({
            	out: "./drizzle",
            	schema: "./src/db/schema.ts",
            	dialect: "postgresql",
            	dbCredentials: {
            		url: process.env.DATABASE_URL!,
            	},
            });
            ```

    3.  Migrate changes to DB
        1. Step 6 - Applying changes to the database:

        ```bash
        npx drizzle-kit push
        ```

4.  Webhook sync:
    1. Create ngrok (only for development: no URL in dev mode, so ngrok provides that): https://clerk.com/docs/guides/development/webhooks/syncing
    2. Obtain static domain
    3. Add script concurrently to local tunnel & app
    4. Create users webhook: app/api/webhooks/route.ts
    5. Connect the webhook to Clerk on dashboard

5.  tRPC(typeScript remote procedure call):
    1. Why?
       A. possible to fetch authenticated queries,
       B. 'render as you fetch' concept,
       C. leverage React Server Components(RSCs) as 'loaders',
       D. faster load time,
       E. parallel data loading
    2. Setup:
        1. Install deps:

            ```bash
            bun add @trpc/server @trpc/client @trpc/react-query @tanstack/react-query@latest zod client-only server-only
            ```

        2. Create tRPC router: https://trpc.io/docs/client/react/server-components#2-create-a-trpc-router
        3. Create a Query Client factory: Create a shared file trpc/query-client.ts that exports a function that creates a QueryClient instance.
        4. Create a tRPC client for Client Components: The trpc/client.tsx is the entrypoint when consuming your tRPC API from client components. In here, import the type definition of your tRPC router and create typesafe hooks using createTRPCReact.
        - Note: Mount the provider in the root of your application (e.g. app/layout.tsx when using Next.js).
        5. Create a tRPC caller for Server Components: To prefetch queries from server components, we use a tRPC caller. The @trpc/react-query/rsc module exports a thin wrapper around createCaller that integrates with your React Query client.

    3. Configuration:
        1. Enable transformer on tRPC: superjson
        2. Add auth to tRPC context:

            ```js
            const { userId } = await auth();
            <!-- const { userId } = await currentUser(); -->
            // 	The currentUser helper returns the Backend User object of the currently active user. It can be used in Server Components, Route Handlers, and Server Actions.
            // Under the hood, this helper:
            // calls fetch(), so it is automatically deduped per request.
            // uses the GET /v1/users/{user_id} endpoint.
            // counts towards the Backend API request rate limit.

            export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

            ```

        3. Add protected procedure:

            ```js
            export const protectedProcedure = t.procedure.use(
            	async function isAuthed(opts) {
            		const { ctx } = opts;
            		if (!ctx.clerkUserId) {
            			throw new TRPCError({ code: "UNAUTHORIZED" });
            		}
            		return opts.next({ ctx: { ...ctx } });
            	},
            );
            ```

        4. Add rate limiting
