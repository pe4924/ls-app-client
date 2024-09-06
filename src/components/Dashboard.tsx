import { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import {
	IoAnalytics,
	IoHomeOutline,
	IoLogOutOutline,
	IoQrCodeOutline,
	IoSettingsOutline,
} from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Header from "./Header";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const navItems = [
	{ to: "/top", label: "TOP", icon: IoHomeOutline, index: 0 },
	{ to: "/products", label: "商品", icon: AiFillProduct, index: 1 },
	{
		to: "/qrtracking",
		label: "QRトラッキング",
		icon: IoQrCodeOutline,
		index: 3,
	},
	{ to: "/subsidy", label: "助成金", icon: GiReceiveMoney, index: 4 },
	{
		to: "/satisfaction-guarantee",
		label: "大満足保証",
		icon: FaHandHoldingHeart,
		index: 5,
	},
	{ to: "/analysis", label: "分析", icon: IoAnalytics, index: 6 },
	{ to: "/setting", label: "設定", icon: IoSettingsOutline, index: 7 },
];

function DashboardLayout() {
	const { user, signOut } = useUserStore();
	const navigate = useNavigate();
	const location = useLocation();
	const [userTeam, setUserTeam] = useState("");
	const [userLocation, setUserLocation] = useState("");
	const [userRoles, setUserRoles] = useState("");

	const handleLogout = async () => {
		await signOut();
		navigate("/login");
	};

	useEffect(() => {
		if (user) {
			setUserTeam(user.teamRel?.name || "Team");
			setUserLocation(user.locationRel?.name || "Location");
			setUserRoles(user.userRoles || "");
		}
	}, [user]);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<nav className="bg-[#F1F1EF] w-64 flex flex-col justify-between border-r border-[#E1E1DE]">
					<ul className="space-y-2 p-4">
						{navItems.map((item) => (
							<li key={item.index}>
								<Link
									to={item.to}
									className={`flex items-center py-2 px-4 rounded-md text-base
                    ${
											location.pathname === item.to
												? "bg-[#E1E1DE] text-[#1C1B15]"
												: "text-[#5F5E5B] hover:bg-[#E1E1DE] hover:text-[#1C1B15] hover:font-bold font-medium"
										} transition-all duration-200`}
								>
									<item.icon className="w-5 h-5 mr-3 flex-shrink-0 relative top-[0.5px]" />
									<span>{item.label}</span>
								</Link>
							</li>
						))}
						<li>
							<Button
								onClick={handleLogout}
								className={`w-full justify-start font-medium flex items-center py-2 px-4 rounded-md text-base
                  ${
										location.pathname === "/logout"
											? "bg-[#E1E1DE] text-[#1C1B15]"
											: "text-[#5F5E5B] hover:bg-[#E1E1DE] hover:text-[#1C1B15] hover:font-bold"
									} transition-all duration-200`}
								variant="ghost"
							>
								<IoLogOutOutline className="w-5 h-5 mr-3 flex-shrink-0 relative top-[0.5px]" />
								<span>ログアウト</span>
							</Button>
						</li>
					</ul>
					{user && (
						<div className="flex justify-center items-center space-x-2 p-4 mt-auto">
							<Badge className="bg-[#DAA520] text-white">{userLocation}</Badge>
							<Badge className="bg-gray-500 text-white">{userTeam}</Badge>
							<Badge className="bg-[#6fac9f] text-white">{userRoles}</Badge>
						</div>
					)}
				</nav>
				<main className="flex-1 overflow-hidden">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default DashboardLayout;
