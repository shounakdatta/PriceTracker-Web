import React from "react";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import Store from "./AppStore";
import AppContainer from "./AppContainer";
import {
  LoginScreen,
  HomeScreen,
  SignUpScreen,
  ForgotPasswordScreen
} from "../pages";
import { PageWrapper, LineTrendChart, AddProductPanel } from "../components";
import { allProductPrices } from "./constants";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Login", module)
  .addDecorator(Store)
  .addDecorator(AppContainer)
  .add("Login Screen", () => <LoginScreen />)
  .add("Sign Up", () => <SignUpScreen />)
  .add("Forgot Password", () => <ForgotPasswordScreen />);

storiesOf("Home", module)
  .addDecorator(Store)
  .add("Page Wrapper", () => <PageWrapper />)
  .add("Home Screen", () => <HomeScreen />)
  .add("Line Chart", () => <LineTrendChart data={allProductPrices} />)
  .add("Add Product Panel", () => (
    <AddProductPanel onAdd={url => console.log(url)} />
  ));
