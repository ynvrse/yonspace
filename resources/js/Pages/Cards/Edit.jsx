import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';
import MemberCard from './MemberCard';
import UpdateCard from './UpdateCard';

export default function Edit({ page_settings, statuses, priorities, workspace, card }) {
    return (
        <>
            {/* Update Card Section */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 ">
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
                        className="bg-gray-50 rounded-md p-4"
                    />
                </div>
            </div>

            {/* Members Section */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 items-center">
                    <HeaderForm 
                        title="Members" 
                        subtitle="Please add members to the card" 
                        className="text-gray-700" 
                    />
                    <MemberCard 
                        action={route('member_card.store', { card: card })} 
                        members={card.members} 
                        className="bg-white rounded-md p-4"
                    />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <AppLayout 
        children={page} 
        headers={['Card', page.props.card.title, 'Detail']} 
        title={page.props.card.title} 
    />
);
