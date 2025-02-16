import {
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { Route, Redirect } from "react-router";

import { radio, library, search, home, barChart, pricetag } from "ionicons/icons";
import Home from "../../pages/Home";

function MainTabs() {
	return (
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Redirect exact path="/" to="/home" />
					{/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
					<Route path="/home" render={() => <Home />} exact={true} />
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
