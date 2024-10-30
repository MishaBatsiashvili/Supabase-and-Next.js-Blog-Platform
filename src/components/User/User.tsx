"use client";

import { createClient } from "@/utils/supabase/client";
import { User as UserType } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const User: React.FC<{
  user: UserType;
}> = ({ user }) => {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    const resp = await supabase.auth.signOut();
    if (!resp.error) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="text-center">
      <div className="text-4xl font-bold">{user.email}</div>
      <button className="mt-4 text-slate-400" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default User;
