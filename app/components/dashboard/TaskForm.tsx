"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

type TaskFormProps = {
  task?: { title: string; description: string };
  open: boolean;
  dialogTitle: string;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
};

export function TaskForm({
  task,
  dialogTitle,
  open,
  onSubmit,
  onClose,
}: TaskFormProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await onSubmit({
      title: data.get("title")!.toString(),
      description: data.get("description")!.toString(),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          variant="standard"
          defaultValue={task?.title || ""}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          fullWidth
          variant="standard"
          defaultValue={task?.description || ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
