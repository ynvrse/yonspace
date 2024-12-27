export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={'rounded border-gray-300 text-lime-600 shadow-sm focus:ring-lime-500 ' + className}
        />
    );
}
