//@/app/_layout.jsx

import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { setLastVisited } from "@/navigationStore";

export default function RootLayout() {
  const pathname = usePathname();
  useEffect(() => {
    setLastVisited(pathname);
  }, [pathname]);
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }} />
  );
}
