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

type FormAction =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      isValid: boolean;
      value: string;
    }
  | {
      type: "SET_DATA";
      inputs: InputState;
      formIsValid: boolean;
    };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (state.inputs[inputId].value === "") {
          state.inputs[inputId].isValid = true;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid && (state.inputs[inputId]?.isValid as boolean);
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

    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
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
): [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: { inputs: InputState }, formValidity: boolean) => void
] => {
  const [formState, dispatch] = useReducer(
    formReducer,
    initialState(initialInputs, initialFormValidity)
  );

  const setFormData = useCallback((inputData: any, formValidity: boolean) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData.inputs,
      formIsValid: formValidity,
    });
  }, []);

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

  return [formState, inputHandler, setFormData];
};
