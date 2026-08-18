import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicEnv } from "@/lib/supabase/config";
import { safeAdminPath } from "@/lib/studio/paths";

function hasAuthCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("auth-token"));
}

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie.name, cookie.value);
  });
  return to;
}

export async function updateSession(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin");
  const env = getSupabasePublicEnv();

  const denyApi = () =>
    NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const loginRedirect = (expired = false) => {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    const next = `${pathname}${search}`;
    if (next !== "/admin/login") {
      url.searchParams.set("next", next);
    }
    if (expired) {
      url.searchParams.set("reason", "expired");
    }
    return NextResponse.redirect(url);
  };

  if (!env) {
    if (isAdminApi) return denyApi();
    if (isAdminPage && !isLogin) return loginRedirect();
    const response = NextResponse.next({ request });
    if (isAdminPage) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return response;
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminPage) {
    supabaseResponse.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  if (isAdminApi && !user) {
    return denyApi();
  }

  if (isAdminPage && !isLogin && !user) {
    return copyCookies(supabaseResponse, loginRedirect(hasAuthCookie(request)));
  }

  if (isLogin && user) {
    const next = safeAdminPath(request.nextUrl.searchParams.get("next"));
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.search = "";
    return copyCookies(supabaseResponse, NextResponse.redirect(url));
  }

  return supabaseResponse;
}
