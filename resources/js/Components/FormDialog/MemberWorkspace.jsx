import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';

import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

import InputDesc from '@/Components/InputDesc';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { handleFlashMessage } from '@/lib/utils';
import { router, useForm } from '@inertiajs/react';

import { X } from 'lucide-react';
import { useState } from 'react';

export default function MemberWorkspace({ children, workspace, members, member_dialog }) {
    const [memberLength, setMemberLength] = useState(3);

    // State untuk melacak tooltip yang terbuka
    const [openTooltips, setOpenTooltips] = useState({});

    const toggleTooltip = (id) => {
        setOpenTooltips((prev) => ({
            ...prev,
            [id]: !(prev[id] || false), // Toggle state hanya untuk ID tertentu
        }));
    };

    const { data, setData, processing, reset, post } = useForm({
        email: '',
    });

    const OnHandleSubmit = (e) => {
        e.preventDefault();

        post(member_dialog.action, {
            ...handleFlashMessage(reset),
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{member_dialog.title}</DialogTitle>
                        <DialogDescription>{member_dialog.subtitle}</DialogDescription>
                    </DialogHeader>

                    {/* Form Undangan */}
                    <form method={member_dialog.method} onSubmit={OnHandleSubmit}>
                        <div className="flex w-full flex-col gap-1 py-2">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <div className="flex items-center justify-between gap-x-2">
                                <div className="flex-grow">
                                    <TextInput
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="Enter member email"
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <Button type="submit" disabled={processing} variant="lime" size="lg" className="mt-2">
                                    <span>Invite</span>
                                </Button>
                            </div>
                            <InputDesc>Enter the email address of the person you want to invite.</InputDesc>
                        </div>
                    </form>

                    {/* Daftar Member */}
                    <div className="mt-2">
                        <h3 className="text-lg font-semibold">{workspace} Members</h3>
                        {members.length > 0 ? (
                            <div className="mt-4 flex items-center">
                                {members?.slice(0, memberLength).map((member, index) => {
                                    if (!member || !member.id) return null; // Skip jika data tidak valid
                                    return (
                                        <div
                                            key={member.id}
                                            className="relative -ml-3 first:ml-0"
                                            style={{ zIndex: members.length - index }}
                                        >
                                            <TooltipProvider>
                                                <Tooltip open={openTooltips[member.id] || false}>
                                                    <TooltipTrigger>
                                                        <Avatar
                                                            onClick={() => toggleTooltip(member.id)}
                                                            className="h-10 w-10 border-2 border-white"
                                                        >
                                                            <AvatarImage
                                                                src={
                                                                    member.avatar ||
                                                                    `https://ui-avatars.com/api/?name=${member.name}`
                                                                }
                                                                alt={member.name}
                                                            />
                                                            <AvatarFallback>{member.name?.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-gray-900">
                                                        <div className="flex items-center justify-between gap-x-2">
                                                            <p>{member.name}</p>
                                                            <AlertDialog>
                                                                {member.role === 'Member' ? (
                                                                    <AlertDialogTrigger className="rounded-md bg-gray-800 p-1">
                                                                        <X
                                                                            strokeWidth={5}
                                                                            color="red"
                                                                            size={14}
                                                                            className="cursor-pointer"
                                                                        />
                                                                    </AlertDialogTrigger>
                                                                ) : (
                                                                    <p>
                                                                        | <span className="text-lime-400">Owner</span>
                                                                    </p>
                                                                )}
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Are you absolutely sure?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will
                                                                            permanently delete <br />
                                                                            <b>{member.name}.</b>
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                router.delete(
                                                                                    route('workspaces.member_destroy', {
                                                                                        workspace: member.memberable_id,
                                                                                        member: member.id,
                                                                                    }),
                                                                                    {
                                                                                        ...handleFlashMessage(reset),
                                                                                        preserveScroll: true,
                                                                                        preserveState: true,
                                                                                    },
                                                                                )
                                                                            }
                                                                        >
                                                                            Continue
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    );
                                })}

                                {members.length > memberLength && (
                                    <div className="relative -ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-sm font-medium text-gray-600">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger onClick={() => setMemberLength(members.length)}>
                                                    <p>+{members.length - memberLength}</p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Show All Members</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="mt-4 text-gray-500">No members found.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
