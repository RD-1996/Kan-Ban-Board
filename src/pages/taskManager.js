import React, { useEffect, useState } from "react";
import ResponsiveHeader from "../components/ResponsiveHeader";
import "../assets/styles/taskManager.scss";
import { totalStages } from "../assets/constants/constants";
import { Button, Grid } from "@mui/material";
import TaskContainer from "../components/TaskContainer";
import AddTaskForm from "../components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import * as taskActions from "../store/reducers/tasks.slice";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteTask from "../components/DeleteTask";

export default function TaskManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);

  const [addTask, setAddTask] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [draggableId, setDraggableId] = useState(null);

  useEffect(() => {
    if (!user?.name) {
      goToHome();
    }
  }, []);

  const goToHome = () => {
    navigate("/");
  };

  const handleAddTask = () => {
    setAddTask(true);
  };

  const closeAddTask = () => {
    setAddTask(false);
  };

  const getStageIndex = (stageName) => {
    const record = totalStages.filter((item) => item.name === stageName);
    return record[0]?.stage;
  };

  const handleDragEnd = (result) => {
    if (!result) {
      return;
    }

    const { source, destination, draggableId } = result;

    if (!source || !destination || !draggableId) {
      return;
    }

    if (destination.droppableId === "delete") {
      setDraggableId(draggableId);
      openDeleteDialog();
    } else {
      const updatedTasks = tasks.map((element) => {
        if (element.name === draggableId) {
          return {
            ...element,
            stage: getStageIndex(destination?.droppableId),
          };
        } else return element;
      });

      dispatch(taskActions.editTask(updatedTasks));
    }
    setShowDeleteIcon(false);
  };

  const handleDragStart = (result) => {
    if (!result) {
      return;
    }
    setShowDeleteIcon(true);
  };

  const handleDeleteTask = () => {
    dispatch(taskActions.deleteTask({ name: draggableId }));
    closeDeleteDialog();
  };

  const openDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result)}
        onDragStart={(result) => handleDragStart(result)}
      >
        <ResponsiveHeader />
        <div className="task--manager__body">
          <div className="interaction__container">
            <Button onClick={handleAddTask} variant="contained" color="primary">
              Create Task
            </Button>
            <Droppable droppableId="delete">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {showDeleteIcon ? (
                    <DeleteIcon className="icon" />
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
          <Grid
            container
            className="tasks__container"
            spacing={5}
            justifyContent="center"
          >
            {totalStages.map((stage, index) => {
              return (
                <Droppable droppableId={stage.name}>
                  {(provided, snapshot) => {
                    return (
                      <TaskContainer
                        key={index}
                        stage={stage}
                        droppableProps={provided.droppableProps}
                        refProp={provided.innerRef}
                        droppableProvided={provided}
                      />
                    );
                  }}
                </Droppable>
              );
            })}
          </Grid>
        </div>
        <AddTaskForm
          open={addTask}
          closeForm={closeAddTask}
          openForm={handleAddTask}
        />
        <DeleteTask
          open={showDeleteDialog}
          handleClose={closeDeleteDialog}
          onYes={handleDeleteTask}
        />
      </DragDropContext>
    </div>
  );
}
