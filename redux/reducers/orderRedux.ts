import { orderInterface} from "../../values/interfaces";

interface ORDER {
  orders: orderInterface[];
  type: string;
}

const adminRedux = (state = [], action: ORDER) => {
  switch (action.type) {
    case "orders":
      return action.orders;
    default:
      return state;
  }
};

export default adminRedux;
