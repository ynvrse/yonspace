import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

import InputDesc from '@/Components/InputDesc';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { handleFlashMessage } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function CreateWorkspace() {
    const { workspace_dialog, visibilities } = usePage().props;
    const { data, setData, processing, reset, post } = useForm({
        name: '',
        logo: null,
        cover: null,
        visibility: 'Private',
        _method: workspace_dialog.method,
    });

    const OnHandleSubmit = (e) => {
        e.preventDefault();

        post(workspace_dialog.action, {
            ...handleFlashMessage(reset),
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Plus size={16} className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent style={{ maxWidth: '800px', width: '90%' }} className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{workspace_dialog.title}</DialogTitle>
                        <DialogDescription>{workspace_dialog.subtitle}</DialogDescription>
                    </DialogHeader>
                    <form method={workspace_dialog.method} onSubmit={OnHandleSubmit}>
                        <div className="grid w-full gap-4 py-4">
                            <div className="grid items-center">
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder="Workspace name"
                                    onChange={(e) => setData(e.target.name, e.target.value)}
                                />
                                <InputDesc>This is your workspace name.</InputDesc>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="w-full">
                                    <InputLabel htmlFor="logo">Logo</InputLabel>
                                    <TextInput
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    />
                                    <InputDesc>This is your workspace logo.</InputDesc>
                                </div>
                                <div className="w-full">
                                    <InputLabel htmlFor="cover">Cover</InputLabel>
                                    <TextInput
                                        id="cover"
                                        name="cover"
                                        type="file"
                                        onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    />
                                    <InputDesc>This is your workspace cover.</InputDesc>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                                {/* Visibility Section */}
                                <div className="w-full md:w-auto">
                                    <InputLabel htmlFor="visibility" className="mb-1 block font-medium">
                                        Visibility
                                    </InputLabel>
                                    <Select onValueChange={(value) => setData('visibility', value)}>
                                        <SelectTrigger className="mt-2 w-full">
                                            <SelectValue placeholder="Select a visibility" />
                                        </SelectTrigger>
                                        <SelectContent id="visibility">
                                            {visibilities.map((visibility, index) => (
                                                <SelectItem value={visibility.value} key={index}>
                                                    {visibility.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputDesc className="mt-2 text-sm text-gray-500">
                                        You can manage visibility in your workspace settings.
                                    </InputDesc>
                                </div>

                                {/* Save Button Section */}
                                <div className="mt-4 flex w-full gap-2 md:w-auto">
                                    <Button type="reset" variant="secondary" className="w-full md:w-auto">
                                        Reset
                                    </Button>

                                    <DialogClose asChild>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            variant="lime"
                                            className="w-full md:w-auto"
                                        >
                                            Create Workspace
                                        </Button>
                                    </DialogClose>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
