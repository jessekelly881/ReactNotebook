import React from "react";
import ReactDOM from "react-dom";
import App from "./ui";
import { createNotebook } from "./services/firebase";
import "./index.scss";

createNotebook().then(doc => console.log(doc.id));

ReactDOM.render(<App />, document.getElementById("root"));
