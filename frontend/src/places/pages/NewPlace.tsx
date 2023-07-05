import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

type InputType = {
  value: string;
  isValid: boolean;
};

type InputState = {
  [key: string]: InputType;
};

type FormState = {
  inputs: InputState;
  isValid: boolean;
};

type FormAction = {
  type: "INPUT_CHANGE";
  inputId: string;
  isValid: boolean;
  value: string;
};

const initialState = {
  inputs: {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    address: {
      value: "",
      isValid: false,
    },
  },
  isValid: false,
};

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid title."
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please enter a valid description (at least 5 characters)."
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid address."
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD Place
      </Button>
    </form>
  );
};

export default NewPlace;
