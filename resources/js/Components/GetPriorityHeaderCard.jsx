
import { PRIORITY } from '@/lib/utils';

export default function GetPriorityHeaderCard({ priority }) {
    const { URGENT, HIGH, MEDIUM, LOW, UNKNOWN } = PRIORITY;

    let color;

    switch (priority) {
        case URGENT:
            color = 'bg-red-500 hover:bg-red-600';
            break;

        case HIGH:
            color = 'bg-yellow-500 hover:bg-yellow-600';

            break;
        case MEDIUM:
            color = 'bg-blue-500 hover:bg-blue-600';

            break;
        case LOW:
            color = 'bg-green-500 hover:bg-green-600';

            break;
        default:
            color = '';

            break;
    }

    return <div className={`${color} rounded-t-lg h-[22px]`} >
         </div>;
}
