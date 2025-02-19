import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import "./Home.css";
import { useDreams } from "../hooks/useDreams";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

const Home: React.FC = () => {
	const { dreams } = useDreams();
	const router = useHistory();

	const showDreams = (dreams: ReturnType<typeof useDreams>["dreams"]) => {
		if (dreams.isError) {
			return <div className="col-span-12">Error</div>;
		}
		if (dreams.isFetching) {
			return <div className="col-span-12">Loading...</div>;
		}
		if (dreams.data?.length === 0) {
			return <div className="col-span-12">No hay sueños</div>;
		}
		return dreams.data?.map((dream) => (
			<div className="col-span-12" key={dream.dream_id}>
				<h1>{dream.title}</h1>
				<p>{dream.content}</p>
			</div>
		));
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div className="flex items-center justify-between">
						<h4 className="px-3 text-base">Sueños</h4>
						<Button onClick={() => router.push("/home/create-dream")}>
							Registrar sueño
						</Button>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="grid grid-cols-12 p-5 gap-4">{showDreams(dreams)}</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
