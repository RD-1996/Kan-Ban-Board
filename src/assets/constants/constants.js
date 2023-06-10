const dashboardDataContainers = ["Total", "Pending", "Completed"];

const totalStages = [
  { stage: 0, name: "Backlog" },
  { stage: 1, name: "To Do" },
  { stage: 2, name: "Ongoing" },
  { stage: 3, name: "Done" },
];

const priorities = [
  { id: 1, name: "low" },
  { id: 2, name: "medium" },
  { id: 3, name: "high" },
];

const MENU_ITEMS = ["dashboard", "tasks"];

const PRIMARY_COLOR = "#5a4ad1";

const BACKLOG_COLOR = "#a179f2";
const TODO_COLOR = "#00aaff";
const DONE_COLOR = "#3dcc3d";
const ONGOING_COLOR = "#ffd426";

const LOW_PRIORITY = "#89CFF0";
const MEDIUM_PRIORITY = "#E49B0F";
const HIGH_PRIORITY = "#C41E3A";

export {
  dashboardDataContainers,
  totalStages,
  priorities,
  MENU_ITEMS,
  PRIMARY_COLOR,
  BACKLOG_COLOR,
  TODO_COLOR,
  DONE_COLOR,
  ONGOING_COLOR,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  HIGH_PRIORITY,
};
