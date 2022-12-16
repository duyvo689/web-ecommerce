import { categoryInterface } from "../../values/interfaces";

interface CATEGORY {
  category: categoryInterface[];
  type: string;
}

const adminRedux = (state = [], action: CATEGORY) => {
  switch (action.type) {
    case "category":
      return action.category;
    default:
      return state;
  }
};

export default adminRedux;
