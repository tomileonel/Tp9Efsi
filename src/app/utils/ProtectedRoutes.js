'use client';

import { TokenContext } from "../context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(TokenContext);

  /*useEffect(() => {
    if (!isLoggedIn && !router.pathname !== "/login") {
      router.push("../login");
    }
  }, [isLoggedIn, router]);*/

  if (!isLoggedIn && !router.pathname !== "/login" && !router.pathname !== "/login") {
    router.push("../login");
  }

  return <>{children}</>;
};
