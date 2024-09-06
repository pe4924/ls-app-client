import { useUserStore } from "@/store/useUserStore";
import type { User } from "@/types/user";
import ky from "ky";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

type Team = {
	id: number;
	name: string;
};

type Location = {
	id: number;
	name: string;
};

interface ApiResponse<T> {
	success: boolean;
	[key: string]: T[] | boolean;
}

const fetcher = async <T>(url: string): Promise<T> => {
	const response = await ky.get(url);
	return response.json();
};

export function useSetting() {
	const { user, setUser } = useUserStore();
	const { mutate } = useSWRConfig();

	const { data: teamsData } = useSWR<ApiResponse<Team>>(
		`${import.meta.env.VITE_API_URL}/api/teams`,
		(url) => fetcher<ApiResponse<Team>>(url),
		{ revalidateOnFocus: false },
	);

	const { data: locationsData } = useSWR<ApiResponse<Location>>(
		`${import.meta.env.VITE_API_URL}/api/locations`,
		(url) => fetcher<ApiResponse<Location>>(url),
		{ revalidateOnFocus: false },
	);

	const teams = Array.isArray(teamsData?.teams) ? teamsData.teams : [];
	const locations = Array.isArray(locationsData?.locations)
		? locationsData.locations
		: [];

	const updateUser = async (updatedUserData: Partial<User>) => {
		if (!user) return;

		try {
			const response = await ky
				.put(`${import.meta.env.VITE_API_URL}/api/users`, {
					json: updatedUserData,
				})
				.json<{ success: boolean; user: User }>();

			if (response.success && response.user) {
				setUser(response.user);
				toast("ユーザー情報が更新されました");
				// Revalidate user data
				mutate(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`);
			} else {
				toast("ユーザー情報の更新に失敗しました");
			}
		} catch (error) {
			console.error("Error updating user:", error);
			toast("ユーザー情報の更新に失敗しました");
		}
	};

	return {
		user,
		teams,
		locations,
		updateUser,
	};
}
