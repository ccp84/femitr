import React from "react";
import { createRoot } from "react-dom";
import Pet from "./Pet";

const App = () => {
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Obi" animal="Dog" breed="Poodle" />
    <Pet name="Fizz" animal="Cat" breed="Persian" />
    <Pet name="Nala" animal="Hamster" breed="Sirian" />
  </div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
