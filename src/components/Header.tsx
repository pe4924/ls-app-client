import { useUserStore } from "@/store/useUserStore";

function Header() {
	const user = useUserStore((state) => state.user);

	if (!user) return null;

	return (
		<header className="bg-[#F1F1EF] p-1 pl-8 pr-4 w-full border-b border-[#E1E1DE]">
			<div className="mx-auto flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<p className="text-2xl font-bold">Linea Works</p>
				</div>
				<div className="flex items-center space-x-4">
					<img
						src={user.avatarUrl ?? "/default-avatar.png"}
						alt={user.name}
						className="w-10 h-10 rounded-full"
					/>
					<div className="flex flex-col items-start">
						<h2 className="text-sm font-medium">{user.name}</h2>
						<p className="text-xs text-gray-500">{user.email}</p>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
