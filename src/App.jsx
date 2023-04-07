import React from "react";
import { createRoot } from "react-dom";

const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Obi",
      breed: "Poodle",
    }),
    React.createElement(Pet, {
      animal: "Cat",
      name: "Willow",
      breed: "Fluffy",
    }),
    React.createElement(Pet, {
      animal: "Nala",
      name: "Hamster",
      breed: "Sirian",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
