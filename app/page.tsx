'use client'

import { useUserStore } from "./store/UserStore";
import Register from "./auth/register/page";
import Main from "./main/page";
export default function Home() {
  const { user, setUser } = useUserStore()

  return (
    <div>
    {
      user ? (
        <Main />
      ) : (
        <Register />
      )
    }
    </div>
  );
}
