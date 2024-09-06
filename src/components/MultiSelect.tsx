import Select, { type StylesConfig } from "react-select";

export type Option = {
	readonly value: string;
	readonly label: string;
	readonly isDisabled?: boolean;
};

const customStyles: StylesConfig<Option, true> = {
	control: (styles) => ({ ...styles, backgroundColor: "white" }),
	option: (styles, { isDisabled, isSelected }) => ({
		...styles,
		backgroundColor: isDisabled
			? undefined
			: isSelected
				? "#FF8B00"
				: undefined,
		color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
		cursor: isDisabled ? "not-allowed" : "default",
	}),
	multiValue: (styles) => ({
		...styles,
		backgroundColor: "#F5B79E",
		borderRadius: "15px",
		paddingLeft: "6px",
	}),
	multiValueLabel: (styles) => ({
		...styles,
		color: "white",
	}),
	multiValueRemove: (styles) => ({
		...styles,
		color: "white",
		":hover": {
			backgroundColor: "#E6D9D3",
			color: "#AB8270",
			borderRadius: "15px",
		},
	}),
};

interface MultiSelectProps {
	options: Option[];
	defaultValue?: Option[];
	onChange?: (selectedOptions: Option[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	defaultValue,
	onChange,
}) => (
	<Select
		closeMenuOnSelect={false}
		defaultValue={defaultValue}
		isMulti
		options={options}
		styles={customStyles}
		onChange={(newValue) => onChange?.(newValue as Option[])}
	/>
);

export default MultiSelect;
