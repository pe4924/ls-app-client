import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
	const { signInWithGoogle } = useUserStore();

	return (
		<div className="app-container">
			<Card className="login-content w-1/2">
				<CardHeader>
					<CardTitle>Googleアカウントでログイン</CardTitle>
					<CardDescription className="text-sm mt-4">
						ログイン後、データ閲覧・編集が可能になります。
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={signInWithGoogle}
						className="bg-white text-black hover:bg-gray-100 border"
					>
						<FcGoogle />
						<p className="ml-3">Googleログイン</p>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

export default LoginPage;
