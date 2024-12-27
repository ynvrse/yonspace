import AppLayout from '@/Layouts/AppLayout';
export default function Dashboard() {
    return <>Haloo</>;
}

Dashboard.layout = (page) => <AppLayout children={page} headers={['Dashboard']} title="Dashboard" />;
