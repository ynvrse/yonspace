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
    const membersxz = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
            name: 'Emily Johnson',
            email: 'emily.johnson@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        {
            name: 'David Wilson',
            email: 'david.wilson@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        {
            name: 'Sarah Lee',
            email: 'sarah.lee@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        },
        {
            name: 'Chris Taylor',
            email: 'chris.taylor@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        },
    ];
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
                <div className="-mt-12 sm:flex sm:items-center sm:space-x-5">
                    <div className="flex">
                        <Avatar className="h-24 w-24 rounded-full ring-4 ring-white">
                            <AvatarImage src={workspace.logo} alt={'logo-' + workspace.name} />
                            <AvatarFallback className="rounded-full">
                                {getAvatarFallback(workspace.name)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="items-center sm:flex sm:min-w-0 sm:flex-1 sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1">
                            <CardTitle className="text-4xl leading-relaxed tracking-tighter">
                                {workspace.name}
                            </CardTitle>
                        </div>
                        <div className="mt-8 flex items-center justify-end gap-x-4">
                            <Link
                                href="#"
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
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => (
    <AppLayout children={page} headers={['Workspace', page.props.workspace.name]} title={page.props.workspace.name} />
);
