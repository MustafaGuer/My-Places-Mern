import React, { useReducer } from "react";

import { Validator, validate } from "../../util/validators";
import styles from "./Input.module.scss";

enum TYPES {
  CHANGE = "CHANGE",
  TOUCH = "TOUCH",
}

type ReducerAction =
  | {
      type: TYPES.CHANGE;
      val: string;
      validators: Validator[];
    }
  | { type: TYPES.TOUCH };

type ReducerState = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
};

const initialState = {
  value: "",
  isTouched: false,
  isValid: false,
};

const inputReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case TYPES.CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(
          action.val as string,
          action.validators as Validator[]
        ),
      };

    case TYPES.TOUCH:
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

type InputComponent = {
  label: string;
  id: string;
  element?: string;
  placeholder?: string;
  type: string;
  rows?: number;
  errorText?: string;
  validators: Validator[];
  onInput?: void;
};

const Input: React.FC<InputComponent> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: TYPES.CHANGE,
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: TYPES.TOUCH,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${styles["form-control"]} 
      ${
        !inputState.isValid &&
        inputState.isTouched &&
        styles["form-control--invalid"]
      }  
      `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
