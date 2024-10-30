import { Database } from "@/database.schema";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Factory function to create a Supabase client with proper cookie handling
const getSupabaseSSRClientForMiddleware = (request: NextRequest, response: NextResponse) => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });
};

// Helper function for redirection to a specified path
const redirectTo = (request: NextRequest, pathname: string) => {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
};

// Main function to update the session, redirecting based on user authentication
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = getSupabaseSSRClientForMiddleware(request, response);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith("/auth")) {
    return redirectTo(request, "/auth/login");
  }

  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    return redirectTo(request, "/");
  }

  return response;
}


