export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`leading-relaxd block text-sm font-medium text-foreground ` + className}>
            {value ? value : children}
        </label>
    );
}
