import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import "../assets/styles/taskManager.scss";
import { userTasks } from "../data/tasks";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../store/reducers/tasks.slice";
import AddTaskForm from "./AddTask";
import { Draggable } from "react-beautiful-dnd";
import {
  BACKLOG_COLOR,
  DONE_COLOR,
  ONGOING_COLOR,
  TODO_COLOR,
} from "../assets/constants/constants";

export default function TaskContainer(props) {
  const dispatch = useDispatch();

  const { stage, droppableProps, refProp, droppableProvided } = props;

  const { tasks } = useSelector((state) => state.tasks);

  const getBorderTopColor = ({ stage }) => {
    switch (stage) {
      case 0:
        return BACKLOG_COLOR;
        break;
      case 1:
        return TODO_COLOR;
        break;
      case 2:
        return ONGOING_COLOR;
        break;
      case 3:
        return DONE_COLOR;
        break;

      default:
        return BACKLOG_COLOR;
        break;
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div
        className="task__container"
        {...droppableProps}
        ref={refProp}
        style={{
          borderTopColor: getBorderTopColor(stage),
        }}
      >
        <div className="title">{stage?.name}</div>
        {tasks && tasks?.length ? (
          tasks
            .filter((filteredTask) => filteredTask.stage === stage.stage)
            .map((task, index) => {
              return (
                <Draggable
                  key={task.name}
                  draggableId={task.name}
                  index={index}
                >
                  {(provided, snapshot) => {
                    return (
                      <Task
                        index={index}
                        task={task}
                        taskRefProp={provided.innerRef}
                        taskDraggableProp={provided.draggableProps}
                        taskDragHandleProp={provided.dragHandleProps}
                      />
                    );
                  }}
                </Draggable>
              );
            })
        ) : (
          <div className="no--tasks">No Tasks Yet ...</div>
        )}
        {droppableProvided.placeholder}
      </div>
    </Grid>
  );
}
