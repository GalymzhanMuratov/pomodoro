import express from "express";
import ReactDOM from "react-dom/server";
import { App } from "../App";
import { indexHtmlTemplate } from "./indexTemplate";
import axios from "axios";
const app = express();

app.use('/static', express.static('./dist/client'))

app.get("*", (req, res) => {
    res.send(indexHtmlTemplate(ReactDOM.renderToString(App())));
});

app.listen(3000, () => {
    console.log("server started on port http://localhost:3000");
});
