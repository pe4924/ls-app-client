import { useUserStore } from "@/store/useUserStore";

function Top() {
	const { user } = useUserStore();
	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold mb-4">Linea Works</h1>
			<p className="text-xl text-gray-600">ようこそ、{user?.name}さん</p>
		</div>
	);
}

export default Top;
