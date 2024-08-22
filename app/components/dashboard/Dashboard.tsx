"use client";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { WeatherBoard } from "./WeatherBoard";
import { TaskList } from "./TaskList";
import { SnackbarProvider } from "notistack";

const defaultTheme = createTheme();

export default function Dashboard() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <WeatherBoard />
          <TaskList />
        </SnackbarProvider>
      </Container>
    </ThemeProvider>
  );
}
