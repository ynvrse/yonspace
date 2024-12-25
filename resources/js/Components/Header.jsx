import { cn } from "@/lib/utils";


export default function Header({clasName, title, subtitle}) {
  return (
    <div className={cn(
        clasName,
        'mb-8'
    )}>
        <div className="mx-auto flex flex-col gap-x-8 lg:mx-0">
<h3 className="text-2xl font-bold leading-relaxed tracking-tighter text-foreground">
    {title}
</h3>
<p className="text-sm leading-relaxed tracking-tighter text-muted-foreground">{subtitle}</p>
        </div>

    </div>
  )
}
