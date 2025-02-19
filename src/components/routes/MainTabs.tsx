import {
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import {
	radio,
	library,
	search,
	home,
	barChart,
	pricetag,
} from "ionicons/icons";
import HomeRouter from "./home/HomeRouter";

function MainTabs() {
	return (
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route path="/home/*" render={() => <HomeRouter />} />
					<Route path="/" render={() => <HomeRouter />} />
				</IonRouterOutlet>

				<IonTabBar slot="bottom">
					<IonTabButton tab="home" href="/home">
						<IonIcon icon={home} />
						<IonLabel>Inicio</IonLabel>
					</IonTabButton>

					<IonTabButton tab="radio" href="/radio">
						<IonIcon icon={barChart} />
						<IonLabel>Estadísticas</IonLabel>
					</IonTabButton>

					<IonTabButton tab="library" href="/library">
						<IonIcon icon={pricetag} />
						<IonLabel>Categorías</IonLabel>
					</IonTabButton>

					<IonTabButton tab="search" href="/search">
						<IonIcon icon={search} />
						<IonLabel>Buscar</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	);
}

export default MainTabs;
