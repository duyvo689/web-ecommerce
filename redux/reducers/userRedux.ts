import { userInterface} from "../../values/interfaces";

interface USER {
  user: userInterface;
  type: string;
}

const adminRedux = (state = null, action: USER) => {
  switch (action.type) {
    case "user":
      return action.user;
    default:
      return state;
  }
};

export default adminRedux;
