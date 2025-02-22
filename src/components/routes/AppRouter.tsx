import type { FC } from "react";
import { Redirect, Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";
import { PublicRoute } from "./PublicRoute";
import { Register } from "../../pages/Register";
import MainTabs from "./MainTabs";

export const AppRouter: FC = () => {
	return (
		<IonRouterOutlet>
			<Route path="/" exact>
				<PublicRoute>
					<Register />
				</PublicRoute>
			</Route>
			<Route path="/home" component={MainTabs} />
			<Route path="*" render={() => <Redirect to="/" />} />
		</IonRouterOutlet>
	);
};
