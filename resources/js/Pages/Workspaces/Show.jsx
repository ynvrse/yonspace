import EditWorkspace from '@/Components/FormDialog/EditWorkspace';
import MemberWorkspace from '@/Components/FormDialog/MemberWorkspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { getAvatarFallback } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Settings, UsersRound } from 'lucide-react';

export default function Show({ ...props }) {
    const { workspace, workspace_settings, visibilities, member_dialog } = props;

    return (
        <>
            <div>
                <img
                    src={workspace.cover}
                    alt={'cover-' + workspace.name}
                    className="h-32 w-full object-cover lg:h-48"
                />
            </div>
            <div className="px-2 sm:px-4">
                <div className="-mt-12 sm:items-center sm:space-x-5">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-x-3">
                            <Avatar className="h-24 w-24 rounded-full ring-4 ring-white">
                                <AvatarImage src={workspace.logo} alt={'logo-' + workspace.name} />
                                <AvatarFallback className="rounded-full">
                                    {getAvatarFallback(workspace.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block lg:block">
                                <CardTitle className="text-4xl leading-relaxed tracking-tighter">
                                    {workspace.name}
                                </CardTitle>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-4 md:mt-2">
                            <Link
                                href={route('cards.create', [workspace.slug])}
                                className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Create Card
                            </Link>

                            <MemberWorkspace
                                workspace={workspace.name}
                                member_dialog={member_dialog}
                                members={workspace.members}
                            >
                                <div className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <UsersRound size={18} />
                                </div>
                            </MemberWorkspace>

                            <EditWorkspace
                                workspace={workspace}
                                workspace_settings={workspace_settings}
                                visibilities={visibilities}
                            >
                                <div className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    <Settings size={18} />
                                </div>
                            </EditWorkspace>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <CardTitle className="text-2xl leading-relaxed tracking-tighter">{workspace.name}</CardTitle>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => (
    <AppLayout children={page} headers={['Workspace', page.props.workspace.name]} title={page.props.workspace.name} />
);
