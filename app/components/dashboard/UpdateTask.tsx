"use client";
import * as React from "react";
import { useUpdateTaskMutation } from "@/lib/features/tasks/tasksAPI";
import { TaskForm } from "./TaskForm";
import { SearchTaskItem } from "@/lib/features/tasks/dtos";
import { useSnackbar } from "notistack";

type UpdateTaskProps = {
  task: SearchTaskItem;
  open: boolean;
  handleClose: () => void;
};

export function UpdateTask({ task, open, handleClose }: UpdateTaskProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateTask] = useUpdateTaskMutation();

  const handleSubmit = async (data: { title: string; description: string }) => {
    try {
      const result = await updateTask({
        id: task.id,
        ...data,
      }).unwrap();

      if (result.status === "SUCCESS") {
        enqueueSnackbar("Update task success", {
          variant: "success",
        });
        handleClose();
      }
    } catch (err: any) {
      enqueueSnackbar(`Update task failed: ${err.data.message}`, {
        variant: "error",
      });
      console.error("update task failed:", err);
    }
  };

  return (
    <TaskForm
      task={task}
      dialogTitle="Update Task"
      open={open}
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
}
