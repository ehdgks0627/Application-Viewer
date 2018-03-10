import * as TYPES from './ActionTypes';

export function incrementNumber() {
  return {
    "type": TYPES.INCREMENT_NUMBER
  };
}

export function decrementNumber() {
  return {
    "type": TYPES.DECREMENT_NUMBER
  };
}

export function setColor(color) {
  return {
    "type": TYPES.SET_COLOR,
    "color": color
  };
}
