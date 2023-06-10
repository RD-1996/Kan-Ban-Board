import {
  HIGH_PRIORITY,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  priorities,
} from "../assets/constants/constants";

function getPriorityName(prioirityNumber) {
  let priorityName = [];
  priorityName = priorities.filter((item) => item.id === prioirityNumber);
  if (priorityName?.length) {
    return priorityName[0]?.name;
  } else return "";
}

const getFlagColor = (priority) => {
  switch (priority) {
    case 1:
      return LOW_PRIORITY;

    case 2:
      return MEDIUM_PRIORITY;

    case 3:
      return HIGH_PRIORITY;

    default:
      return LOW_PRIORITY;
  }
};
export { getPriorityName, getFlagColor };
