import { cn } from "@/lib/utils";


export default function Widget({className, ...props}) {
    const {bgColor, count, icon, title} = props;

  return (
    <div className={cn(
        className,
        'relative overflow-hidden rounded-lg border bg-hite px-4 pb-6 pt-5 sm:pt-6'
    )}>
        <div>
        <div className={cn(
            bgColor,
            'absolute rounded-2xl p-3'
        )}>{icon}</div>

        <p className="ml-16 text-sm font-medium truncate text-muted-foreground">{title}</p>
        </div>
        <div className="ml-16 flex items-baseline">
            <p className="text-2xl text-foreground font-semibold ">{count}</p>
        </div>
    </div>
  )
}
