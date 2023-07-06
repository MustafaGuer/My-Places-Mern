import React, { useContext, useState } from "react";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext, AuthContextT } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import styles from "./Auth.module.scss";

const Auth = () => {
  const authCtx = useContext<AuthContextT>(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          inputs: {
            ...formState.inputs,
            name: { value: "", isValid: false },
            // name: undefined,
          },
        },
        (formState.inputs.email.isValid as boolean) &&
          (formState.inputs.password.isValid as boolean)
      );
    } else {
      setFormData(
        {
          inputs: {
            ...formState.inputs,
            name: {
              value: "",
              isValid: false,
            },
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
    authCtx.login();
  };

  return (
    <Card className={styles.authentication}>
      <h2>{isLoginMode ? "Login" : "Register"} Required</h2>
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password (at least 8 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;