import AppLayout from '@/Layouts/AppLayout';

export default function Create({ page_settings }) {
    return (
        <AppLayout>
            <div>{page_settings.title}</div>
            <img
                src="http://127.0.0.1:8000/storage/workspaces/logo/gQXRtiPBhtplrfwIx0KI2sMGkNhGTi9A7WlIZOCA.png"
                alt=""
            />
        </AppLayout>
    );
}
