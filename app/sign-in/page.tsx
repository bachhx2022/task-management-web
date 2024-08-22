"use client";
import { SnackbarProvider } from "notistack";
import SignIn from "../components/SignIn";

export default function QuotesPage() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SignIn />
    </SnackbarProvider>
  );
}
