import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { type CreateUser, createUserSchema } from "../lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Gender } from "../lib/validations/genders";

export const Register = () => {
	const form = useForm<CreateUser>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
      id: crypto.randomUUID(),
			name: "",
			last_name: "",
			birthday: dayjs(new Date()).toDate(),
			gender: "male",
		},
	});

	const handleChangeGender = (event: SelectChangeEvent) => {
		form.setValue("gender", event.target.value as Gender);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="px-3">Registro</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="grid grid-cols-12 p-5 gap-4">
					<div className="col-span-12 border-b-black">
						<TextField 
              className="w-full" 
              label="Nombre" 
              variant="filled" 
              {...form.register("name")}
            />
					</div>
					<div className="col-span-12 border-b-black">
						<TextField className="w-full" label="Apellidos" variant="filled" />
					</div>
					<div className="col-span-12 border-b-black">
						<MobileDatePicker
							value={dayjs(form.watch("birthday"))}
							onChange={(date) =>
								form.setValue("birthday", date?.toDate() ?? new Date())
							}
							slots={{
								textField: (params) => (
									<TextField
										{...params}
										className="w-full"
										variant="filled"
										label="Fecha de nacimiento"
									/>
								),
							}}
						/>
					</div>
					<div className="col-span-12 border-b-black">
						<FormControl variant="filled" className="w-full">
							<InputLabel id="demo-simple-select-filled-label">
								Género
							</InputLabel>
							<Select
								labelId="demo-simple-select-filled-label"
								id="demo-simple-select-filled"
								value={form.watch("gender")}
								onChange={handleChangeGender}
							>
								<MenuItem value="">
									<em>Selecciona tu género</em>
								</MenuItem>
								<MenuItem value={"male"}>Hombre</MenuItem>
								<MenuItem value={"female"}>Mujer</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};
