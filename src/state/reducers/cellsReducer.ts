import { createReducer } from "@reduxjs/toolkit";
import { Cell } from "../cell";
import {
  updateCell,
  deleteCell,
  moveCell,
  insertCellBefore,
} from "../action-creators";

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCell, (state, action) => {
    const { id, content } = action.payload;
    state.data[id].content = content;
  });
  builder.addCase(deleteCell, (state, action) => {
    delete state.data[action.payload];
    state.order = state.order.filter((id) => id !== action.payload);
  });
  builder.addCase(moveCell, (state, action) => {
    const { direction } = action.payload;
    const index = state.order.findIndex((id) => id === action.payload.id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex > state.order.length - 1) {
      return;
    }

    state.order[index] = state.order[targetIndex];
    state.order[targetIndex] = action.payload.id;
  });
  builder.addCase(insertCellBefore, (state, action) => {
    const cell: Cell = {
      content: "",
      type: action.payload.type,
      id: randomId(),
    };

    state.data[cell.id] = cell;

    const index = state.order.findIndex((id) => id === action.payload.id);
    if (index < 0) {
      state.order.push(cell.id);
    } else {
      state.order.splice(index, 0, cell.id);
    }
  });
});

export default cellReducer;
