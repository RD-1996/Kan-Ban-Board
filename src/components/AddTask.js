import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { priorities, totalStages } from "../assets/constants/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import moment from "moment";
import "../assets/styles/createTask.scss";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../store/reducers/tasks.slice";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";

const FIRST_STAGE = totalStages[0].stage;

export default function AddTaskForm(props) {
  const dispatch = useDispatch();

  const { open, closeForm, openForm, task, edit } = props;

  const { tasks } = useSelector((state) => state.tasks);

  const initialErrorState = {
    name: false,
    stage: false,
    priority: false,
    deadline: false,
  };

  const [name, setName] = useState(task?.name || null);
  const [stage, setStage] = useState(task?.stage || FIRST_STAGE);
  const [priority, setPriority] = useState(task?.priority || null);
  const [deadline, setDeadline] = useState(task?.deadline || null);
  const [error, setError] = useState(initialErrorState);

  const handleDeadline = (date) => {
    setDeadline(date.format());
  };

  const doesTaskNameExist = (taskName) => {
    const filteredTask = tasks.filter((task) => task.name === taskName);
    if (filteredTask?.length) {
      if (!edit) {
        return true;
      } else {
        const existingTask = filteredTask[0];
        if (existingTask.name === task?.name) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  };

  const validateTasks = (data) => {
    const { name, stage, priority, deadline } = data;

    let hasError = { ...initialErrorState };

    if (!name) {
      hasError = {
        ...hasError,
        name: "Please enter task name",
      };
    }
    if (!priority) {
      hasError = {
        ...hasError,
        priority: "Please enter priority",
      };
    }
    if (!deadline) {
      hasError = {
        ...hasError,
        deadline: "Please enter deadline",
      };
    }

    if (name && doesTaskNameExist(name)) {
      hasError = {
        ...hasError,
        name: "Task name already exists",
      };
    }

    if (hasError?.name || hasError?.priority || hasError?.deadline) {
      setError(hasError);
      return true;
    }

    setError(initialErrorState);
    return false;
  };

  const clearTaskForm = () => {
    setName(null);
    setDeadline(null);
    setPriority(null);
  };

  const clearErrorState = () => {
    setError(initialErrorState);
  };

  const handleSubmit = () => {
    const payload = {
      name,
      stage,
      priority,
      deadline,
    };

    const hasError = validateTasks(payload);
    if (hasError) {
      return;
    }

    if (edit) {
      let tempTasks = [...tasks];
      const updatedTasks = tempTasks.map((element) => {
        if (element.name === task.name) {
          return payload;
        } else return element;
      });
      dispatch(taskActions.editTask(updatedTasks));
    } else {
      dispatch(taskActions.addTask(payload));
      clearTaskForm();
    }
    closeForm();
  };

  const handleClose = () => {
    if (!edit) {
      clearTaskForm();
    }
    clearErrorState();
    closeForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="dialogTitle">
        <div>{edit ? "Edit" : "Create"} Task</div>
        <div>
          <CloseIcon className="icon" onClick={handleClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div onSubmit={handleSubmit} className="create--task__form">
          <TextField
            required
            fullWidth
            id="name"
            label="Task Name"
            name="name"
            size="small"
            className="form--input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error?.name}
            helperText={error?.name}
          />
          <div className="form--input">
            <FormControl fullWidth>
              <TextField
                select
                id="stage"
                value={stage}
                label="Stage"
                required
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              >
                {totalStages.map((stage, index) => (
                  <MenuItem key={index} value={stage?.stage}>
                    {stage?.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div className="form--input">
            <FormControl fullWidth>
              <TextField
                select
                id="priority"
                value={priority}
                label="Priority"
                required
                size="small"
                onChange={(e) => setPriority(e.target.value)}
                error={error?.priority}
                helperText={error?.priority}
              >
                {priorities.map((item, index) => (
                  <MenuItem key={index} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <div className="form--input">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="Deadline"
                value={deadline}
                onChange={(date) => {
                  handleDeadline(date);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    required
                    error={error?.deadline}
                    helperText={error?.deadline}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="form--input">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleSubmit}
            >
              {edit ? "Edit Task" : "Create Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
