export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block text-sm font-medium text-foreground leading-relaxd ` + className}>
            {value ? value : children}
        </label>
    );
}
