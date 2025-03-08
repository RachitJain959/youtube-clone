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

3.  Database
