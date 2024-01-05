import React from "react";
import ReactDom from "react-dom";
import { App } from "../App";

window.addEventListener("load", () => {
    ReactDom.hydrate(<App />, document.getElementById("react_root"));
});
