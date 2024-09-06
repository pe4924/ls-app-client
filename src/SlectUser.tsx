import { useEffect } from "react";
import MultiSelect, { type Option } from "./components/MultiSelect";
import { useUserStore } from "./store/useUserStore";

function SelectUser() {
	const { userList, fetchUserList } = useUserStore();

	useEffect(() => {
		fetchUserList();
	}, [fetchUserList]);

	const handleChange = (selectedOptions: Option[]) => {
		console.log("選択された項目:", selectedOptions);
	};

	const userOptions: Option[] = userList.map(
		(user: { id: string; name: string }) => ({
			value: user.id,
			label: user.name,
		}),
	);

	return (
		<>
			<MultiSelect
				options={userOptions}
				defaultValue={userOptions.length > 0 ? [userOptions[0]] : []}
				onChange={handleChange}
			/>
		</>
	);
}

export default SelectUser;
