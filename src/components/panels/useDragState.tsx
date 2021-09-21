// Allows other panels to know when another panel is being dragged.

import { createGlobalState } from 'react-hooks-global-state';

export enum HoverLocation {
  Left, Right, Center, None
}

interface DragState {
  dragging: boolean
}

const initialState = {
  dragging: false
};

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState as DragState);

export {useGlobalState, getGlobalState, setGlobalState};