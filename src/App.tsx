import { AuthError } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { type User, UserSchema } from "./types/user";
import "./App.css";
import supabase from "@/config/supabaseClient";
import Setting from "@/features/account/Account";
import LoginPage from "@/features/auth/LoginPage";
import DashboardLayout from "@/features/dashboard/Dashboard";
import Dashboard from "@/features/dashboard/Top";
import SatisfactionGuarantee from "@/features/satisfactionGuarantee/SatisfactionGuarantee";
import { useUserStore } from "@/store/useUserStore";
import ky from "ky";

function App() {
	const { user, setUser } = useUserStore();
	const [loading, setLoading] = useState(!user);

	const checkUser = useCallback(async () => {
		if (user) return;

		try {
			const {
				data: { user: supabaseUser },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				if (
					error instanceof AuthError &&
					error.message === "Auth session missing!"
				) {
					setUser(null);
				} else {
					throw error;
				}
			} else if (supabaseUser) {
				const userData = {
					id: supabaseUser.id,
					email: supabaseUser.email ?? "",
					name: supabaseUser.user_metadata.full_name,
					avatarUrl: supabaseUser.user_metadata.avatar_url,
					locationId: supabaseUser.user_metadata.locationId ?? null,
					teamId: supabaseUser.user_metadata.teamId ?? null,
					userRoles: supabaseUser.user_metadata.userRoles ?? "staff",
				};

				const validatedUser = UserSchema.parse(userData);
				setUser(validatedUser);
				await upsertUser(validatedUser);
				// ユーザー詳細を取得して更新
				await useUserStore.getState().fetchUserDetails(supabaseUser.id);
			} else {
				setUser(null);
			}
		} catch (err) {
			console.error("Error checking user:", err);
		} finally {
			setLoading(false);
		}
	}, [setUser, user]);

	useEffect(() => {
		checkUser();
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			checkUser();
		});
		return () => subscription.unsubscribe();
	}, [checkUser]);

	async function upsertUser(userData: User) {
		try {
			await ky
				.post(`${import.meta.env.VITE_API_URL}/api/upsert-user`, {
					json: {
						id: userData.id,
						email: userData.email,
						name: userData.name,
						avatarUrl: userData.avatarUrl,
						locationId: 2,
						teamId: 7,
						userRoles: "staff",
					},
				})
				.json();
		} catch (error) {
			console.error("Error upserting user:", error);
		}
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={user ? <Navigate to="/top" replace /> : <LoginPage />}
				/>
				<Route
					path="/"
					element={
						user ? <DashboardLayout /> : <Navigate to="/login" replace />
					}
				>
					<Route path="top" element={<Dashboard />} />
					<Route
						path="satisfaction-guarantee"
						element={<SatisfactionGuarantee />}
					/>
					<Route
						path="satisfaction-guarantee/:tab"
						element={<SatisfactionGuarantee />}
					/>
					<Route path="setting" element={<Setting />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
