import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/font.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(
	document.getElementById("root")
);
root.render(
	<CookiesProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</CookiesProvider>
);
