"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export function GitHubLogin() {
  async function signInWithGithub() {
    const supabase = createClient();
    const { origin } = new URL(window.location.href);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
  }

  return (
    <button type="button" onClick={signInWithGithub}>
      Login with GitHub
    </button>
  );
}
