import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";
import CreateDream from "../../../pages/CreateDream";
import Home from "../../../pages/Home";

const HomeRouter: React.FC = () => {
	return (
		<IonRouterOutlet>
			<Route path="/home" component={Home} exact />
			<Route path="/home/create-dream" component={CreateDream} />
		</IonRouterOutlet>
	);
};

export default HomeRouter;
