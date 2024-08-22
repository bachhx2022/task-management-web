"use client";
import * as React from "react";
import { useCreateTaskMutation } from "@/lib/features/tasks/tasksAPI";
import { TaskForm } from "./TaskForm";
import { useSnackbar } from "notistack";

type AddTaskProps = {
  open: boolean;
  handleClose: () => void;
};

export function AddTask({ open, handleClose }: AddTaskProps) {
  const [createTask] = useCreateTaskMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data: { title: string; description: string }) => {
    try {
      const result = await createTask(data).unwrap();

      if (result.status === "SUCCESS") {
        enqueueSnackbar("Create task success", {
          variant: "success",
        });

        handleClose();
      }
    } catch (err) {
      enqueueSnackbar("Create task failed:", {
        variant: "error",
      });
      console.error("Create task failed:", err);
    }
  };

  return (
    <TaskForm
      dialogTitle="Add Task"
      open={open}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
}
