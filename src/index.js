import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { ManageStudent } from "./Management/student.component";

ReactDOM.render(
  <React.StrictMode>
    <ManageStudent /> 
  </React.StrictMode>,
  document.getElementById("root")
);
