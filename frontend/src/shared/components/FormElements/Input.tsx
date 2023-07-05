import React, { useReducer, useEffect } from "react";

import { Validator, validate } from "../../util/validators";
import styles from "./Input.module.scss";

enum ACTION_TYPES {
  CHANGE = "CHANGE",
  TOUCH = "TOUCH",
}

type InputAction =
  | {
      type: ACTION_TYPES.CHANGE;
      val: string;
      validators: Validator[];
    }
  | { type: ACTION_TYPES.TOUCH };

type InputState = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
};

const initialState = (value: string, valid: boolean) => {
  return {
    value: value || "",
    isTouched: false,
    isValid: valid || false,
  };
};

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE:
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case ACTION_TYPES.TOUCH:
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
  type?: string;
  rows?: number;
  errorText?: string;
  validators: Validator[];
  onInput: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
};

const Input: React.FC<InputComponent> = (props) => {
  const [inputState, dispatch] = useReducer(
    inputReducer,
    initialState(props.initialValue as string, props.initialValid as boolean)
  );

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: ACTION_TYPES.CHANGE,
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: ACTION_TYPES.TOUCH,
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
      {!inputState.isValid && inputState.isTouched && (
        <p>
          {props.errorText ? props.errorText : "Please enter a valid input."}
        </p>
      )}
    </div>
  );
};

export default Input;
