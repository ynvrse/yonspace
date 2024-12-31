import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { handleFlashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import MemberCard from './MemberCard';

export default function Edit({ page_settings, status, statuses, priorities, workspace, card }) {
    const { data, setData, processing, reset, post, errors, recentlySuccessful } = useForm({
        title: card?.title,
        description: card?.description,
        deadline: card.deadline ? card.deadline.unformated : null,
        status: card?.status,
        priority: card?.priority,
        _method: page_settings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const OnHandleSubmit = (e) => {
        e.preventDefault();

        post(
            page_settings.action,
            {
                workspace: workspace.slug,
                card: card,
                ...handleFlashMessage(reset),
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
            <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
                <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />

                <Card>
                    <CardContent>
                        <form method={page_settings.method} onSubmit={OnHandleSubmit}>
                            <div className="py-6">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <InputLabel htmlFor="title" value="Title" />
                                        <TextInput
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={data.title}
                                            isFocused={true}
                                            onChange={onHandleChange}
                                            onErrors={errors.title && <InputError message={errors.title} />}
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <InputLabel htmlFor="description" value="Description" />
                                        <TextInput
                                            type="text"
                                            name="description"
                                            id="description"
                                            value={data.description}
                                            onChange={onHandleChange}
                                            onErrors={errors.description && <InputError message={errors.description} />}
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <InputLabel htmlFor="deadline" value="Deadline" />
                                        <TextInput
                                            type="date"
                                            name="deadline"
                                            id="deadline"
                                            value={data.deadline}
                                            onChange={onHandleChange}
                                            onErrors={errors.deadline && <InputError message={errors.deadline} />}
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <div className="flex items-center justify-between gap-x-4">
                                            <div className="w-full">
                                                <InputLabel htmlFor="status" value="Status" />
                                                <Select
                                                    defaultValue={data.status}
                                                    onValueChange={(value) => setData('status', value)}
                                                >
                                                    <SelectTrigger className="mt-2 w-full">
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                    <SelectContent id="status">
                                                        {statuses.map((status, index) => (
                                                            <SelectItem value={status.value} key={index}>
                                                                {status.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.status && <InputError message={errors.status} />}
                                            </div>

                                            <div className="w-full">
                                                <InputLabel htmlFor="priority" value="Priority" />
                                                <Select
                                                    defaultValue={data.priority}
                                                    onValueChange={(value) => setData('priority', value)}
                                                >
                                                    <SelectTrigger className="mt-2 w-full">
                                                        <SelectValue placeholder="Select a priority" />
                                                    </SelectTrigger>
                                                    <SelectContent id="priority">
                                                        {priorities.map((priority, index) => (
                                                            <SelectItem value={priority.value} key={index}>
                                                                {priority.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.priority && <InputError message={errors.priority} />}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between gap-x-4">
                                            <Link href={route('workspaces.show', [workspace])}>
                                                <Button type="button" variant="link">
                                                    Back
                                                </Button>
                                            </Link>
                                            <div className="flex gap-x-3">
                                                <Button type="button" variant="secondary" onClick={() => reset()}>
                                                    Reset
                                                </Button>

                                                <Button type="submit" variant="lime" disabled={processing}>
                                                    <Transition
                                                        show={recentlySuccessful}
                                                        enter="transition ease-in-out"
                                                    >
                                                        <LoaderCircle className="animate-spin" />
                                                    </Transition>
                                                    Save
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
                <HeaderForm title="Members" subtitle="Please add members to the card" />
                <MemberCard action={route('member_card.store', { card: card })} members={card.members} />
            </div>
        </div>
    );
}

Edit.layout = (page) => (
    <AppLayout children={page} headers={['Card', page.props.card.title, 'Detail']} title={page.props.card.title} />
);
