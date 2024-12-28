import { clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const STATUS = {
    TODO: 'To Do',
    INPROGRESS: 'In Progress',
    ONREVIEW: 'On Review',
    DONE: 'Done',
};

export const PRIORITY = {
    URGENT: 'Urgent',
    HIGH: 'High',
    MEDIUTM: 'Medium',
    LOW: 'Low',
    UNKNOWN: 'Unknown',
};

export function flashMessage(params) {
    return params.props.flash_message;
}

export function getAvatarFallback(name) {
    if (!name || typeof name !== 'string') {
        return '?';
    }
    const nameParts = name.trim().split(/\s+/);
    // Ambil huruf depan dari setiap bagian nama (opsional: hanya dua bagian)
    const initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
    // Gabungkan huruf depan
    return initials.join('');
}

export function handleFlashMessage(resetCallback = null) {
    return {
        onSuccess: (success) => {
            const flash = flashMessage(success); // Handle flash message logic
            if (flash) toast[flash.type](flash.message); // Show flash toast
            if (resetCallback) resetCallback(); // Reset form if provided
        },
        onError: (errors) => {
            if (errors) {
                Object.entries(errors).forEach(([_, message]) => {
                    toast.error(message); // Show error toast
                });
            }
        },
    };
}