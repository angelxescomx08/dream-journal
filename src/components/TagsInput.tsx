import { Autocomplete, TextField } from "@mui/material";

export type TagOption = {
	label: string;
	value: string;
};

type Props = {
	options: TagOption[];
	defaultValue?: TagOption[];
	value?: TagOption[];
	onChange?: (value: TagOption[]) => void;
};

export const TagsInput = ({
	options,
	defaultValue = [],
	value,
	onChange,
}: Props) => {
	return (
		<Autocomplete
			multiple
			options={options}
			value={value}
			onChange={(event, newValue) => {
				if (onChange) {
					onChange(newValue);
				}
			}}
			getOptionLabel={(option: TagOption) => option.label}
			defaultValue={defaultValue}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="filled"
					label="Etiquetas"
					placeholder="Agrega tus etiquetas"
					className="py-2"
				/>
			)}
		/>
	);
};
