import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import {
	Button,
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
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { DatabaseContext } from "../context/database-context";
import toast from "react-hot-toast";

export const Register = () => {
	const { performSQLAction, initialized } = useContext(DatabaseContext);

	const form = useForm<CreateUser>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			user_id: "",
			name: "",
			last_name: "",
			birthday: dayjs(new Date()).toDate(),
			gender: "male",
		},
	});

	const registerUser = useMutation({
		mutationFn: async (data: CreateUser) => {
			const result = await performSQLAction(async (db) => {
				const { user_id, name, last_name, birthday, gender } = data;
				const command =
					"INSERT INTO users (user_id, name, last_name, birthday, gender) VALUES (?, ?, ?, ?, ?)";
				const result = await db?.run(command, [
					user_id,
					name,
					last_name,
					birthday.toISOString(),
					gender,
				]);

				console.log({
					result,
				});
			});
			return result;
		},
		onSuccess: () => {
			toast.success("Se han registrado tus datos correctamente");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Error al registrar tus datos");
		},
	});

	const handleChangeGender = (event: SelectChangeEvent) => {
		form.setValue("gender", event.target.value as Gender);
	};

	const printUsers = async () => {
		performSQLAction(async (db) => {
			const command = "SELECT * FROM users";
			const result = await db?.query(command);
			console.log(result);
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		form.setValue("user_id", crypto.randomUUID());
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="px-3">Registro</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<form
					onSubmit={form.handleSubmit(
						async (data) => {
							await registerUser.mutateAsync(data);
							form.reset();
						},
						(error) => {
							console.log(error);
							toast.error("Error al registrar tus datos");
						},
					)}
				>
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
							<TextField
								className="w-full"
								label="Apellidos"
								variant="filled"
								{...form.register("last_name")}
							/>
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
						<div className="col-span-12 border-b-black">
							<Button
								variant="contained"
								className="w-full"
								type="submit"
								disabled={!initialized || registerUser.isPending}
							>
								{registerUser.isPending ? "Registrando..." : "Registrar"}
							</Button>
						</div>
					</div>
				</form>
				<Button onClick={printUsers}>Imprimir usuarios</Button>
			</IonContent>
		</IonPage>
	);
};
