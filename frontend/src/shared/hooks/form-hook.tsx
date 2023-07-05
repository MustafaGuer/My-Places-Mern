import { useCallback, useReducer } from "react";

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

const formReducer = (state: FormState, action: FormAction): FormState => {
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

const initialState = (
  initialInputs: InputState,
  initialFormValidity: boolean
): FormState => {
  return {
    inputs: initialInputs,
    isValid: initialFormValidity,
  };
};

export const useForm = (
  initialInputs: InputState,
  initialFormValidity: boolean
): [FormState, (id: string, value: string, isValid: boolean) => void] => {
  const [formState, dispatch] = useReducer(
    formReducer,
    initialState(initialInputs, initialFormValidity)
  );

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

  return [formState, inputHandler];
};
