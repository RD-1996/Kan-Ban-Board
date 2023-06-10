import React, { useEffect } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import {
  dashboardDataContainers,
  PRIMARY_COLOR,
} from "../assets/constants/constants";
import ResponsiveHeader from "../components/ResponsiveHeader";
import { userTasks } from "../data/tasks";
import "../assets/styles/dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as taskActions from "../store/reducers/tasks.slice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !tasks?.length) {
      fetchTasks();
    }
  }, [user]);

  useEffect(() => {
    if (!user?.name) {
      goToHome();
    }
  }, []);

  const fetchTasks = () => {
    const filteredUser = userTasks.filter(
      (taskItem) => taskItem.email === user?.email
    );
    if (filteredUser?.length) {
      dispatch(taskActions.addInitial(filteredUser[0]?.tasks));
    }
  };

  const getCardTitle = (title) => {
    switch (title) {
      case "Total":
        return tasks?.length;
        break;
      case "Pending":
        let pending = 0;
        tasks.forEach((task) => {
          if (task.stage !== 3) {
            pending++;
          }
        });
        return pending;
        break;
      case "Completed":
        let completed = 0;
        tasks.forEach((task) => {
          if (task.stage === 3) {
            completed++;
          }
        });
        return completed;
        break;

      default:
        return 0;
        break;
    }
  };

  const goToTaskManager = () => {
    navigate("/tasks");
  };

  const goToHome = () => {
    navigate("/");
  };

  const getBorderTopColor = (index) => {
    switch (index) {
      case 0:
        return "#CBC3E3";
        break;

      case 1:
        return "#EEDC82";
        break;

      case 2:
        return "#AFE1AF";
        break;

      default:
        return PRIMARY_COLOR;
        break;
    }
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ResponsiveHeader />
      <div className="dashboard__container">
        <div className="dashboard__title">Hello, {user?.name || "Guest"} !</div>
        <div className="dashboard__task--header">
          <div className="title">Tasks :</div>
          <div className="button">
            <Button
              onClick={goToTaskManager}
              variant="contained"
              color="primary"
            >
              Task Manager
              <ArrowForwardIcon className="icon" fontSize="small" />
            </Button>
          </div>
        </div>
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          className="info--card__container"
        >
          {dashboardDataContainers.map((item, index) => {
            return (
              <Grid item xs={12} sm={5} md={2} key={index}>
                <Box
                  className="info-card"
                  style={{
                    borderTopColor: getBorderTopColor(index),
                  }}
                >
                  <Typography className="title">{item}</Typography>
                  <Divider />
                  <div className="dashboard__card--score">
                    {tasks ? getCardTitle(item) : 0}
                  </div>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
