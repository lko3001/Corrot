"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
export default function SignIn() {
  const { data: session } = useSession();
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <button onClick={() => signIn("github")}>Login</button>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
