import type { Metadata } from "next";
import { AuthWrapper } from "./components/AuthWrapper";
import Dashboard from "./components/dashboard/Dashboard";

export default function IndexPage() {
  return (
    <AuthWrapper>
      <Dashboard />
    </AuthWrapper>
  );
}

export const metadata: Metadata = {
  title: "Task Management",
};
