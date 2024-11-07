'use client';

import { TokenContext } from "../context/TokenContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

export const ProtectedRoutes = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useContext(TokenContext);

    if (!isLoggedIn && (pathname.startsWith("/eventos/")  || pathname === "/FormularioEvento")) {
      router.push("/login"); 
    }

    
  

  return <>{children}</>;
};
