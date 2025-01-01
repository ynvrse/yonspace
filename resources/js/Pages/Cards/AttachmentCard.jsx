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
import InputDesc from '@/Components/InputDesc';
import { requestFormReset } from 'react-dom';

export default function AttachmentCard({action }) {
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

        post(
            action,
            {
                ...handleFlashMessage(reset),
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (

                <Card>
                    <CardContent>
                    <form encType="multipart/form-data" method='POST' onSubmit={OnHandleSubmit}>

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
                                         <div className="flex justify-end gap-x-2 mt-4">
                                         <Button type="button" variant="secondary" onClick={() => reset()}>
                                            Reset
                                        </Button>
                                        <Button type="submit" variant="lime">
                                            Upload Attachment
                                        </Button>
                                    </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

    );
}