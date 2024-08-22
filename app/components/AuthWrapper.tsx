"use client";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getValidAuthTokens } from "@/lib/utils/cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const { accessToken } = getValidAuthTokens();

  useEffect(() => {
    if (!accessToken) {
      push("/sign-in");
      dispatch(logout());
    }
  }, [accessToken, push]);

  if (!accessToken) {
    return <div>Loading...</div>;
  }

  return children;
};
