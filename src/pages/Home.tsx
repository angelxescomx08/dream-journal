import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { Alert, Button } from "@mui/material";
import { useHistory } from "react-router";
import { useDreams } from "../modules/dreams/hooks/useDreams";

import { DreamCard } from "../modules/dreams/components/DreamCard";
import { CardDreamSkeleton } from "../modules/dreams/components/skeletons/CardDreamSkeleton";

import "./Home.css";

const Home: React.FC = () => {
	const { dreams } = useDreams();
	const router = useHistory();

	const showDreams = (dreams: ReturnType<typeof useDreams>["dreams"]) => {
		if (dreams.isError) {
			return (
				<div className="col-span-12">
					<Alert severity="error">
						Ha ocurrido un error al cargar los sueños
					</Alert>
				</div>
			);
		}
		if (dreams.isFetching) {
			return Array.from({ length: 10 }).map((_, index) => (
				<div
					className="col-span-12"
					key={`card-dream-skeleton-${crypto.randomUUID()}`}
				>
					<CardDreamSkeleton />
				</div>
			));
		}
		if (dreams.data?.length === 0) {
			return (
				<div className="col-span-12">
					<Alert severity="info">No hay sueños registrados aún</Alert>
				</div>
			);
		}
		return dreams?.data?.map((dream) => (
			<div className="col-span-12" key={dream.dream_id}>
				<DreamCard
					title={dream.title}
					content={dream.content}
					created_at={dream.created_at}
				/>
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
				<div className="grid grid-cols-12 gap-4">{showDreams(dreams)}</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
