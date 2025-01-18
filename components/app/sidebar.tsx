'use client';

import React from 'react';
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from 'react-query';
import { queryClient } from '../context/query-provider';
import { Chat } from '@prisma/client';

const teams = [
	{ id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
	{ id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
	{ id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];



const AppSidebar = () => {
	const { user } = useUser();
    const {data: userChats, isLoading: userChatsIsLoading, isError: userChatsIsError} = useQuery({
        queryKey: 'chats',
        queryFn: async () => {
            if (!user){
                throw new Error('No User')
            }
            const response = await fetch(`/api/chat?userId=${user?.id}`);
            const data = await response.json();
            return data.data as Chat[];
        },
        onSuccess: () => {
            // Call success toast
        },
        onError: (err) => {
            // Call error toast
        }
    })

    

    const {mutate: createChat, isLoading: createNewChatIsLoading, data: newChatData} = useMutation({
        mutationFn: async () => {
            if (!user){
                throw new Error('No User')
            }
            const response = await fetch(`/api/chat`, {
                method: 'POST',
                body: JSON.stringify({userId: user.id})
            });
            queryClient.invalidateQueries(['chats']);
            const data = await response.json();
            return data.data as Chat;
        },
        onSuccess: () => {
            // Call success toast
        },
        onError: (err) => {
            // Call error toast
        }
    })

    return <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    {/* Sidebar component, swap this element with another sidebar if you like */}
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex pt-8 shrink-0 items-center">
            <p>
                <strong>RubberDuck</strong> Debugger
            </p>
        </div>
        <Button variant={"default"} onClick={() => createChat()} disabled={createNewChatIsLoading}>New Chat</Button>
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <div className="text-xs/6 font-semibold text-gray-400">
                        Your chats
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {userChats && userChats.map((chat) => (
                            <li key={chat.id}>
                                <a
                                    href={`/chat/${chat.id}`}
                                    // If Pathname includes chat id, then update this
                                    // className={cn(
                                    //     chat.current
                                    //         ? "bg-gray-50 text-indigo-600"
                                    //         : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                    //     "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                    // )}
                                >
                                    <span className="truncate">{chat.id}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="-mx-6 mt-auto">
                    <div className="flex items-center justify-between gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <Image
                                width={32}
                                height={32}
                                alt={user?.fullName ?? "User profile picture"}
                                src={user?.imageUrl ?? "/duck.svg"}
                                className="size-8 rounded-full bg-gray-50"
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true" className="capitalize">
                                {user?.fullName}
                            </span>
                        </div>
                        <SignedIn>
                            <SignOutButton>
                                <LogOut className="cursor-pointer" />
                            </SignOutButton>
                        </SignedIn>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</div>
}

export default AppSidebar;