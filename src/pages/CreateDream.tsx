import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import "./Home.css";
import { useDreams } from "../hooks/useDreams";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

const CreateDream: React.FC = () => {
	const { dreams } = useDreams();

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div className="flex items-center justify-between">
						<h4 className="px-3 text-base">Sueños</h4>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="grid grid-cols-12 p-5 gap-4"></div>
			</IonContent>
		</IonPage>
	);
};

export default CreateDream;
