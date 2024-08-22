"use client";
import { SnackbarProvider } from "notistack";
import SignUp from "../components/SignUp";

export default function QuotesPage() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SignUp />
    </SnackbarProvider>
  );
}
