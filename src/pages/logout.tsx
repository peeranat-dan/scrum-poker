import { useAuth } from "@/providers/auth";
import { useEffect } from "react";

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    const logout = async () => {
      await signOut();
      window.location.href = "/";
    };
    logout();
  }, [signOut]);

  return null;
}
