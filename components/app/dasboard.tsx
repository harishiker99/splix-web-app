"use client";

import { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import {
	Bars3Icon,
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AppSidebar from "./sidebar";

const navigation = [
	{ name: "Dashboard", href: "#", icon: HomeIcon, current: true },
	{ name: "Team", href: "#", icon: UsersIcon, current: false },
	{ name: "Projects", href: "#", icon: FolderIcon, current: false },
	{ name: "Calendar", href: "#", icon: CalendarIcon, current: false },
	{ name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
	{ name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

export default function Dashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { user } = useUser();

	return (
		<main>
			<Dialog
				open={sidebarOpen}
				onClose={setSidebarOpen}
				className="relative z-50 lg:hidden"
			>
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
				/>

				<div className="fixed inset-0 flex">
					<DialogPanel
						transition
						className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
					>
						<TransitionChild>
							<div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
								<button
									type="button"
									onClick={() => setSidebarOpen(false)}
									className="-m-2.5 p-2.5"
								>
									<span className="sr-only">Close sidebar</span>
									<XMarkIcon
										aria-hidden="true"
										className="size-6 text-white"
									/>
								</button>
							</div>
						</TransitionChild>
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
							<div className="flex h-16 shrink-0 items-center">
								<p>
									<strong>RubberDuck</strong>Debugger
								</p>
							</div>
							<nav className="flex flex-1 flex-col">
								<ul role="list" className="flex flex-1 flex-col gap-y-7">
									<li>
										<ul role="list" className="-mx-2 space-y-1">
											{navigation.map((item) => (
												<li key={item.name}>
													<a
														href={item.href}
														className={cn(
															item.current
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
														)}
													>
														<item.icon
															aria-hidden="true"
															className={cn(
																item.current
																	? "text-indigo-600"
																	: "text-gray-400 group-hover:text-indigo-600",
																"size-6 shrink-0"
															)}
														/>
														{item.name}
													</a>
												</li>
											))}
										</ul>
									</li>
									<li>
										<div className="text-xs/6 font-semibold text-gray-400">
											Your teams
										</div>
										<ul role="list" className="-mx-2 mt-2 space-y-1">
											{/* {teams.map((team) => (
												<li key={team.name}>
													<a
														href={team.href}
														className={cn(
															team.current
																? "bg-gray-50 text-indigo-600"
																: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
															"group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
														)}
													>
														<span
															className={cn(
																team.current
																	? "border-indigo-600 text-indigo-600"
																	: "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
																"flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
															)}
														>
															{team.initial}
														</span>
														<span className="truncate">{team.name}</span>
													</a>
												</li>
											))} */}
										</ul>
									</li>
								</ul>
							</nav>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
			{/* Static sidebar for desktop */}
			<AppSidebar />

			<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
				<button
					type="button"
					onClick={() => setSidebarOpen(true)}
					className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
				>
					<span className="sr-only">Open sidebar</span>
					<Bars3Icon aria-hidden="true" className="size-6" />
				</button>
				<div className="flex-1 text-sm/6 font-semibold text-gray-900">
					Dashboard
				</div>
				<a href="#">
					<span className="sr-only">Your profile</span>
					<Image
						width={32}
						height={32}
						alt={user?.fullName ?? "User profile picture"}
						src={user?.imageUrl ?? "/duck.svg"}
						className="size-8 rounded-full bg-gray-50"
					/>
				</a>
			</div>

			<main className="py-10 lg:pl-72">
				<div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
			</main>
		</main>
	);
}
