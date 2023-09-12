import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  Direction,
} from "../actions";
import { CellTypes } from "../cell";

import { createAction } from "@reduxjs/toolkit";

export const updateCell = createAction(
  "cell/update",
  function prepare(id: string, content: string): UpdateCellAction {
    return {
      payload: {
        id,
        content,
      },
    };
  },
);

export const deleteCell = createAction(
  "cell/delete",
  function prepare(id: string): DeleteCellAction {
    return { payload: id };
  },
);

export const moveCell = createAction(
  "cell/move",
  function prepare(id: string, direction: Direction): MoveCellAction {
    return {
      payload: {
        id,
        direction,
      },
    };
  },
);

export const insertCellBefore = createAction(
  "cell/insertBefore",
  function prepare(id: string, cellType: CellTypes): InsertCellBeforeAction {
    return {
      payload: {
        id,
        type: cellType,
      },
    };
  },
);

/* export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
}; 

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
}; 

export const insertCellBefore = (
  id: string,
  cellType: CellTypes,
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
 */
