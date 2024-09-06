import ky from "ky";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import supabase from "../supabaseClient";
import type { RawUser, User, UserState } from "../types/user";
import { UserSchema } from "../types/user";

export const useUserStore = create(
	persist<UserState>(
		(set) => ({
			user: null,
			setUser: (user) =>
				set(() => {
					return { user };
				}),
			userList: [],
			setUserList: (users) => set({ userList: users }),
			fetchUserList: async () => {
				try {
					const data = await ky
						.get(`${import.meta.env.VITE_API_URL}/api/users`)
						.json<{ success: boolean; users: RawUser[]; error?: string }>();
					if (data.success) {
						const validatedUsers = data.users
							.map((user: RawUser) => {
								try {
									return UserSchema.parse(user);
								} catch (error) {
									console.error("Error parsing user data:", error);
									return null;
								}
							})
							.filter((user: User | null): user is User => user !== null);
						set({ userList: validatedUsers });
					} else {
						throw new Error(data.error);
					}
				} catch (error) {
					console.error("Error fetching user list:", error);
				}
			},
			fetchUserDetails: async (userId: string) => {
				try {
					const data = await ky
						.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
						.json<{ success: boolean; user: RawUser; error?: string }>();
					if (data.success) {
						const validatedUser = UserSchema.parse(data.user);
						set({ user: validatedUser });
					} else {
						throw new Error(data.error);
					}
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			},
			signInWithGoogle: async () => {
				try {
					const { error } = await supabase.auth.signInWithOAuth({
						provider: "google",
						options: {
							redirectTo: `${window.location.origin}/top`,
						},
					});
					if (error) throw error;

					const {
						data: { user: supabaseUser },
						error: userError,
					} = await supabase.auth.getUser();
					if (userError) throw userError;

					if (supabaseUser) {
						await useUserStore.getState().fetchUserDetails(supabaseUser.id);
					}
				} catch (error) {
					console.error("Error signing in with Google:", error);
					throw error;
				}
			},
			signOut: async () => {
				try {
					const { error } = await supabase.auth.signOut();
					if (error) throw error;
					set({ user: null });
				} catch (error) {
					console.error("Error signing out:", error);
					throw error;
				}
			},
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
