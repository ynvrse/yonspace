import EditWorkspace from '@/Components/FormDialog/EditWorkspace';
import MemberWorkspace from '@/Components/FormDialog/MemberWorkspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { getAvatarFallback } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Plus, Settings, UsersRound } from 'lucide-react';

export default function Show({ ...props }) {
    const { workspace, workspace_settings, cards, statuses, visibilities, member_dialog } = props;


    

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
                <div className="flex flex-col justify-start w-full mt-2 gap-x-5 gap-y-8 sm:flex-row">
                {statuses.map((status,index)=>(
                            <div className="w-full space-y-4 sm:w-1/4" key={index}>
                                <div className="flex items-center justify-between">
                                    <span className='text-base font-semibold leading-relaxed tracking-tighter'>{status.value}</span>
                                    <div className="flex items-center gap-x-3">
                                        <Link href={route('cards.create',{
                                            workspace: workspace,
                                            _query: {
                                                status: status.value,
                                            }
                                        })}>
                                            <Plus size={14} />
                                        </Link>
                                    </div>
                                </div>
                                {/* column card container */}
                                <div className="flex flex-col flex-grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
                                    {cards.filter((card) => card.status == status.value).map((card,index)=>(
                                        <Card key={index}
                                        className='relative rounded-xl hover:ring-2 hover:ring-inset hover:ring-lime-400'
                                        >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className='text-base leading-relaxed tracking-tighter line-clamp-2'>
                                                    <Link href={route('cards.show', [workspace, card])}
                                                        className='hover:text-lime-500'
                                                    >
                                                        {card.title}
                                                    </Link>
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

        </>
    );
}

Show.layout = (page) => (
    <AppLayout children={page} headers={['Workspace', page.props.workspace.name]} title={page.props.workspace.name} />
);
