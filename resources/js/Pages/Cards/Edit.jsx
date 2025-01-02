import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';
import AttachmentCard from './AttachmentCard';
import MemberCard from './MemberCard';
import UpdateCard from './UpdateCard';

export default function Edit({ page_settings, statuses, priorities, workspace, card }) {
    
    return (
        <>
            {/* Update Card Section */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                    <HeaderForm
                        title={page_settings.title}
                        subtitle={page_settings.subtitle}
                        className="text-gray-800"
                    />
                    <UpdateCard
                        page_settings={page_settings}
                        statuses={statuses}
                        priorities={priorities}
                        workspace={workspace}
                        card={card}
                        className="rounded-md bg-gray-50 p-4"
                    />
                </div>
            </div>

            {/* Members Section */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
                <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <HeaderForm title="Members" subtitle="Please add members to the card" className="text-gray-700" />
                    <MemberCard
                        action={route('member_card.store', { card: card })}
                        members={card.members}
                        className="rounded-md bg-white p-4"
                    />
                </div>
            </div>

            {/* Attachments Section */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
                <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2">
                    <HeaderForm
                        title="Attachments"
                        subtitle="Please add attachments to the card"
                        className="text-gray-700"
                    />
                    <AttachmentCard
                        attachments={card.attachments}
                        action={route('attachments.store', { card: card })}
                        className="rounded-md bg-white p-4"
                    />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <AppLayout children={page} headers={['Card', page.props.card.title, 'Detail']} title={page.props.card.title} />
);
