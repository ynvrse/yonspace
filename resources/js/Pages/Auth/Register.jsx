import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout title="Register">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Card>
                        <CardHeader>
                            <Link href="/" className="flex font-black leading-relaxed tracking-tighter">
                                <div className="ml-1 text-3xl font-bold leading-relaxed tracking-tighter">
                                    Yonspace<span className="text-lime-400">.</span>
                                </div>
                            </Link>
                            <h2 className="text-left text-lg font-medium leading-9 tracking-tight text-muted-foreground">
                                Create your account
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={submit}>
                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            type="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <InputError className="mt-1" message={errors.name} />}
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <InputError className="mt-1" message={errors.email} />}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />

                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <InputError className="mt-1" message={errors.password} />}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Password Confirmation" />

                                        <TextInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        {errors.password_confirmation && (
                                            <InputError className="mt-1" message={errors.password_confirmation} />
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" variant="lime" disabled={processing}>
                                            Register
                                        </Button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-muted-foreground">
                                    Your member?{' '}
                                    <Link
                                        href={route('login')}
                                        className="font-semibold leading-6 text-lime-600 hover:text-lime-500"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
