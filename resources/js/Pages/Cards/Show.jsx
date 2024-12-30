import GetPriorityBadge from '@/Components/GetPriorityBadge';
import GetStatusBadge from '@/Components/GetStatusBadge';
import Header from '@/Components/Header';
import { Card, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react'

export default function Show({cards, page_settings }) {
 console.log(page_settings);
    
  return (
    <>
        <Header title={page_settings.title} subtitle={page_settings.subtitle} />
        <Card>
            <CardContent clasName="mt-4">
              
                <dl className='device-y devide-gray-100 '>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className='text-sm font-medium text-foreground leading-6'>Title</dt>
                        <dd className='mt-1 text-sm leading-6 text-muted-foreground sm:col-span2 sm:mt-0'>
                            {cards.title}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-gray-100">
                        <dt className='text-sm font-medium text-foreground leading-6'>Description</dt>
                        <dd className='mt-1 text-sm leading-6 text-muted-foreground sm:col-span2 sm:mt-0'>
                            {cards.description}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-gray-100">
                        <dt className='text-sm font-medium text-foreground leading-6'>Deadline</dt>
                        <dd className='mt-1 text-sm leading-6 text-muted-foreground sm:col-span2 sm:mt-0'>
                            {cards.deadline?.format}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-gray-100">
                        <dt className='text-sm font-medium text-foreground leading-6'>Status</dt>
                        <dd className='mt-1 text-sm leading-6 text-muted-foreground sm:col-span2 sm:mt-0'>
                            <GetStatusBadge status={cards.status} />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-gray-100">
                        <dt className='text-sm font-medium text-foreground leading-6'>Priority</dt>
                        <dd className='mt-1 text-sm leading-6 text-muted-foreground sm:col-span2 sm:mt-0'>
                            <GetPriorityBadge priority={cards.priority} />
                        </dd>
                    </div>
                </dl>
               
            </CardContent>
        </Card>
    </>
  )
}



Show.layout = (page) => (
    <AppLayout children={page} headers={['Card',page.props.cards.title, 'Detail']} title={page.props.cards.title} />
);