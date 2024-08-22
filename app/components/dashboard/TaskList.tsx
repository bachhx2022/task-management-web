"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  Checkbox,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
  Stack,
  ListItemAvatar,
} from "@mui/material";
import {
  useDeleteTaskMutation,
  useSearchTasksQuery,
  useSetCompleteTaskMutation,
} from "@/lib/features/tasks/tasksAPI";
import { AddTask } from "./AddTask";
import DeleteIcon from "@mui/icons-material/Delete";
import { SearchTaskItem } from "@/lib/features/tasks/dtos";
import { UpdateTask } from "./UpdateTask";
import { useSnackbar } from "notistack";

export const TaskList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, refetch } = useSearchTasksQuery({});

  const [selectedTask, setSelectedTask] = React.useState<SearchTaskItem | null>(
    null
  );

  const [setCompleteTask] = useSetCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [openAddTask, setOpenAddTask] = React.useState(false);
  const [openUpdateTask, setOpenUpdateTask] = React.useState(false);

  const handleClickOpen = () => {
    setOpenAddTask(true);
  };

  const handleAddTaskClose = () => {
    setOpenAddTask(false);
    refetch();
  };

  const handleSelectTask = (task: SearchTaskItem) => {
    setSelectedTask(task);
    setOpenUpdateTask(true);
  };

  const handleUpdateTaskClose = () => {
    setOpenUpdateTask(false);
    refetch();
  };

  const handleCompleteTask = async (id: string, isCompleted: boolean) => {
    try {
      await setCompleteTask({
        id,
        isCompleted,
      }).unwrap();

      enqueueSnackbar("Set complete success", {
        variant: "success",
      });

      refetch();
    } catch (err: any) {
      enqueueSnackbar(`Set complete failed ${err.data.message}`, {
        variant: "error",
      });
      console.error("Set complete failed:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
      enqueueSnackbar("Delete complete success", {
        variant: "success",
      });
      refetch();
    } catch (err: any) {
      enqueueSnackbar(`Delete complete failed ${err.data.message}`, {
        variant: "error",
      });
      console.error("Delete task failed:", err);
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Stack spacing={2} direction="row-reverse">
        <Button onClick={handleClickOpen}>New Task</Button>
      </Stack>

      <AddTask open={openAddTask} handleClose={handleAddTaskClose} />
      <UpdateTask
        open={openUpdateTask}
        handleClose={handleUpdateTaskClose}
        task={selectedTask!}
      />
      {isLoading && <div>Loading...</div>}

      {data &&
        data.data.items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemAvatar>
              <Checkbox
                edge="end"
                onChange={() => handleCompleteTask(item.id, !item.isCompleted)}
                checked={item.isCompleted}
              />
            </ListItemAvatar>
            <ListItemButton onClick={() => handleSelectTask(item)}>
              <ListItemText id={item.id} primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
    </Box>
  );
};
