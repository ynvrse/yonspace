import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';

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

import { handleFlashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function MemberCard({ action, members }) {
    const [memberLength, setMemberLength] = useState(3);

    // State untuk melacak tooltip yang terbuka
    const [openTooltips, setOpenTooltips] = useState({});

    const toggleTooltip = (id) => {
        setOpenTooltips((prev) => ({
            ...prev,
            [id]: !(prev[id] || false), // Toggle state hanya untuk ID tertentu
        }));
    };

    const { data, setData, processing, reset, post, errors, recentlySuccessful } = useForm({
        email: '',
    });

    console.log(members);

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const OnHandleSubmit = (e) => {
        e.preventDefault();

        post(action, {
            ...handleFlashMessage(reset),
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Card>
            <CardContent>
                <form method="POST" onSubmit={OnHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="email" value="email" />
                                <TextInput
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    isFocused={true}
                                    onChange={onHandleChange}
                                    onErrors={errors.email && <InputError message={errors.email} />}
                                />
                            </div>

                            <div className="col-span-full">
                                <div className="flex items-center justify-end gap-x-4">
                                    <Button type="submit" variant="lime" disabled={processing}>
                                        <Transition show={recentlySuccessful} enter="transition ease-in-out">
                                            <LoaderCircle className="animate-spin" />
                                        </Transition>
                                        Invite
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="">
                    <h3 className="text-lg font-semibold">Members</h3>
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
                                                        <AvatarImage src={member.user.avatar} alt={member.name} />
                                                        <AvatarFallback>{member.user.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-gray-900">
                                                    <div className="flex items-center justify-between gap-x-2">
                                                        <p>{member.user.name}</p>
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
            </CardContent>
        </Card>
    );
}
