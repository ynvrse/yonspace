import { Link } from "@inertiajs/react";
import Icon from './Icon';
import { cn } from "@/lib/utils";


export default function EmptyState({title, url, className}){
    return(
        <Link href={url} className={cn(
            'relative block w-full rounded-lg border boreder-2 border-dashed border-muted-foreground p-12 text-center hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
            className
        )}>
        <Icon name={database} size={12}/>
        <span className="mt-2  block text-sm font-medium leadign-relaxed tracking-tighter">
            Create a new {title}
        </span>
        </Link>
    )
}