
import { Card, CardContent, CardHeader } from '@/Components/ui/card';

import CreateAttachmentCard from '@/Components/FormDialog/CreateAttachmentCard';

export default function AttachmentCard({action, attachments}) {
 
  console.log(attachments);
  

    return (

        <>
        <Card>
            <CardHeader  >
                <div className="flex item-center justify-end">

                <CreateAttachmentCard action={action} />
                </div>
            </CardHeader>
            <CardContent>
                <Card>

                    <CardContent className="rounded-none">
                        {attachments && attachments.map((attachement, index) =>(
                            <div key={index}>
                                <img src={attachement.file} alt={attachement.name}  width="50"/>

                            </div>
                        ))}

                    </CardContent>
                </Card>
                
            </CardContent>
        </Card>
        </>
    );
}