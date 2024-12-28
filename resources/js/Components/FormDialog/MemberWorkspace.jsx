import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

import InputDesc from '@/Components/InputDesc';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';

import { useState } from 'react';
import { toast } from 'sonner';

export default function MemberWorkspace({ children, workspace, members, member_dialog }) {
    const [memberLength, setMemberLength] = useState(3);

    const { data, setData, processing, reset, post } = useForm({
        email: '',
    });

    const OnHandleSubmit = (e) => {
        e.preventDefault();

        post(member_dialog.action, {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
                reset();
            },
            onError: (errors) => {
                if (errors) {
                    Object.entries(errors).forEach(([key, message]) => {
                        toast.error(message);
                    });
                }
            },
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
                                {members.slice(0, memberLength).map((member, index) => (
                                    <div
                                        key={index}
                                        className="relative -ml-3 first:ml-0"
                                        style={{ zIndex: members.length - index }}
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar className="h-10 w-10 border-2 border-white">
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
                                                <TooltipContent>
                                                    <p>{member.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                ))}
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
