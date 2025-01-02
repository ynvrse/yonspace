import InputDesc from '@/Components/InputDesc';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { handleFlashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

export default function CreateAttachmentCard({ action }) {
    const { data, setData, processing, reset, post, errors, recentlySuccessful } = useForm({
        file: null,
        link: '',
        name: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const OnHandleSubmit = (e) => {
        e.preventDefault();

        post(action, {
            ...handleFlashMessage(reset),
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="group relative flex cursor-pointer items-center justify-center rounded-lg bg-lime-500 px-4 py-2 text-white transition-all duration-300 hover:bg-lime-300">
                    <span className="flex items-center text-black">
                        <Plus size={16} />
                        <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100">
                            Add new attachment
                        </span>
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add an Attachment</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form encType="multipart/form-data" method="POST" onSubmit={OnHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={onHandleChange}
                                    isFocused={true}
                                    onErrors={errors.name && <InputError message={errors.name} />}
                                />
                                <InputDesc>Enter the name of the attachment.</InputDesc>
                            </div>
                            <div className="col-span-full">
                                <InputLabel htmlFor="file" value="File" />
                                <TextInput
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    onErrors={errors.file && <InputError message={errors.file} />}
                                />
                                <InputDesc>Select the file you want to attach.</InputDesc>
                            </div>
                            <div className="col-span-full">
                                <InputLabel htmlFor="link" value="link" />
                                <TextInput
                                    type="text"
                                    name="link"
                                    id="link"
                                    value={data.link}
                                    onChange={onHandleChange}
                                    onErrors={errors.link && <InputError message={errors.link} />}
                                />
                                <InputDesc>Enter the link for the attachment (optional).</InputDesc>
                                <div className="mt-4 flex justify-end gap-x-2">
                                    <Button type="button" variant="secondary" onClick={() => reset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="lime">
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
