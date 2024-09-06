import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSetting } from "@/hooks/useSetting";
import { useEffect, useState } from "react";

function Inquiry() {
	const { user, teams, locations, updateUser } = useSetting();
	const [name, setName] = useState(user?.name || "");
	const [selectedTeam, setSelectedTeam] = useState<string>(
		user?.teamId?.toString() || "",
	);
	const [selectedLocation, setSelectedLocation] = useState<string>(
		user?.locationId?.toString() || "",
	);

	useEffect(() => {
		if (user) {
			setName(user.name || "");
			setSelectedTeam(user.teamId?.toString() || "");
			setSelectedLocation(user.locationId?.toString() || "");
		}
	}, [user]);

	const handleSave = () => {
		if (!user) return;

		const updatedUserData = {
			id: user.id,
			name,
			teamId: Number(selectedTeam) || undefined,
			locationId: Number(selectedLocation) || undefined,
		};

		updateUser(updatedUserData);
	};

	return (
		<div className="flex items-center justify-center h-full w-full p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">アカウント更新</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name" className="text-left">
								名前
							</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="名前を入力してください"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email" className="text-left">
								メールアドレス
							</Label>
							<Input
								id="email"
								value={user?.email || ""}
								placeholder="example@linea-storia.com"
								disabled
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="team" className="text-left">
								チーム
							</Label>
							<Select value={selectedTeam} onValueChange={setSelectedTeam}>
								<SelectTrigger>
									<SelectValue placeholder="チームを選択してください" />
								</SelectTrigger>
								<SelectContent>
									{teams.map((team) => (
										<SelectItem key={team.id} value={team.id.toString()}>
											{team.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="location" className="text-left">
								勤務地
							</Label>
							<Select
								value={selectedLocation}
								onValueChange={setSelectedLocation}
							>
								<SelectTrigger>
									<SelectValue placeholder="勤務地を選択してください" />
								</SelectTrigger>
								<SelectContent>
									{locations.map((location) => (
										<SelectItem
											key={location.id}
											value={location.id.toString()}
										>
											{location.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="role" className="text-left">
								権限
							</Label>
							<Input
								id="role"
								value={user?.userRoles || ""}
								placeholder="権限を入力してください"
								disabled
							/>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button variant="customFill" className="w-full" onClick={handleSave}>
						変更を保存
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Inquiry;
