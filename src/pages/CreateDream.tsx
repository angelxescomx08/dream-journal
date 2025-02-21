import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import "./Home.css";
import { useUser } from "../modules/users/hooks/useUser";
import { TextField } from "@mui/material";

const CreateDream: React.FC = () => {
	const { user } = useUser();

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
				<div className="grid grid-cols-12 p-5 gap-4">
					<div className="col-span-12 border-b-black">
						<TextField
							className="w-full"
							label="Título del sueño"
							variant="filled"
							// {...form.register("name")}
						/>
					</div>
					<div className="col-span-12 border-b-black">
						<TextField
							className="w-full"
							label="Contenido del sueño"
							variant="filled"
							multiline
							rows={3}
							// {...form.register("name")}
						/>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default CreateDream;
