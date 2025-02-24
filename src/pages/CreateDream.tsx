import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { Button, TextField } from "@mui/material";

import "./Home.css";
import { useCreateDream } from "../modules/dreams/hooks/useCreateDream";

const CreateDream: React.FC = () => {
	const { form, createDreamMutation, onSubmit, onReject } = useCreateDream();

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
				<form
					className="grid grid-cols-12 p-5 gap-4"
					onSubmit={form.handleSubmit(onSubmit, onReject)}
				>
					<div className="col-span-12 border-b-black">
						<TextField
							className="w-full"
							label="Título del sueño"
							variant="filled"
							{...form.register("title")}
							error={!!form.formState.errors.title?.message}
							helperText={form.formState.errors.title?.message}
						/>
					</div>
					<div className="col-span-12 border-b-black">
						<TextField
							className="w-full"
							label="Contenido del sueño"
							variant="filled"
							multiline
							minRows={3}
							maxRows={14}
							{...form.register("content")}
							error={!!form.formState.errors.content?.message}
							helperText={form.formState.errors.content?.message}
						/>
					</div>
					<div className="col-span-12 border-b-black">
						<Button
							variant="contained"
							className="w-full"
							type="submit"
							disabled={createDreamMutation.isPending}
						>
							{createDreamMutation.isPending ? "Creando..." : "Crear"}
						</Button>
					</div>
				</form>
			</IonContent>
		</IonPage>
	);
};

export default CreateDream;
