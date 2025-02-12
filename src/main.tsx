import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

window.addEventListener("DOMContentLoaded", async () => {
	try {
		const platform = Capacitor.getPlatform();

		// WEB SPECIFIC FUNCTIONALITY
		if (platform === "web") {
			const sqlite = new SQLiteConnection(CapacitorSQLite);
			// Create the 'jeep-sqlite' Stencil component
			customElements.define("jeep-sqlite", JeepSqlite);
			const jeepSqliteEl = document.createElement("jeep-sqlite");
			document.body.appendChild(jeepSqliteEl);
			await customElements.whenDefined("jeep-sqlite");
			console.log("after customElements.whenDefined");

			// Initialize the Web store
			await sqlite.initWebStore();
			console.log("after initWebStore");
		}

		const container = document.getElementById("root");
		if (container) {
			const root = createRoot(container);
			root.render(
				<React.StrictMode>
					<App />
				</React.StrictMode>,
			);
		} else {
			console.error('Root container not found');
		}
	} catch (e) {
		console.log(e);
	}
});
