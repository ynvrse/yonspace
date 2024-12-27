import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { getAvatarFallback } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function Show({ ...props }) {
    const workspace = props.workspace;
    return (
        <>
            <div>
                <img
                    src={workspace.cover}
                    alt={'cover-' + workspace.name}
                    className="object-cober h-32 w-full lg:h-48"
                />
            </div>
            <div className="px-2 sm:px-4">
                <div className="-mt-12 sm:flex sm:items-center sm:space-x-5">
                    <div className="flex">
                        <Avatar className="h-24 w-24 ring-4 ring-white">
                            <AvatarImage src={workspace.logo} alt={'logo-' + workspace.name} />
                            <AvatarFallback className="rounded-lg">{getAvatarFallback(workspace.name)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="items-center sm:flex sm:min-w-0 sm:flex-1 sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1">
                            <CardTitle className="text-4xl leading-relaxed tracking-tighter">
                                {workspace.name}
                            </CardTitle>
                        </div>
                        <div className="mt-8 flex items-center gap-x-8">
                            <Link
                                href="#"
                                className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Create Card
                            </Link>
                            <Link
                                href="#"
                                className="inine-flex items-cener transition-color whitespace-nowarp justify-center rounded-md text-sm font-medium text-foreground ring-offset-background hover:font-bold hover:text-lime-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Settings
                            </Link>
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
