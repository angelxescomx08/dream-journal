import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import "./theme/variables.css";
import { DatabaseContext } from "./context/database-context";
import useSQLiteDB from "./hooks/useSQLiteDB";
import { Register } from "./pages/Register";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { PublicRoute } from "./components/routes/PublicRoute";
import MainTabs from "./components/routes/MainTabs";

setupIonicReact();
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			// biome-ignore lint/style/useNumberNamespace: <explanation>
			staleTime: Infinity,
		},
	},
});

const App: React.FC = () => {
	const { initialized, performSQLAction } = useSQLiteDB();

	return (
		<IonApp>
			<DatabaseContext.Provider
				value={{
					initialized,
					performSQLAction,
				}}
			>
				<QueryClientProvider client={queryClient}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<IonReactRouter>
							<IonRouterOutlet>
								<Route exact path="/register">
									<PublicRoute>
										<Register />
									</PublicRoute>
								</Route>
								<Route exact path="/home" render={() => <MainTabs />} />
								<Redirect exact from="/" to="/dashboard" />
							</IonRouterOutlet>
						</IonReactRouter>
					</LocalizationProvider>
					<Toaster />
				</QueryClientProvider>
			</DatabaseContext.Provider>
		</IonApp>
	);
};

export default App;
