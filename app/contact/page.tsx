import type {Metadata} from 'next';
import {contactMarkup} from '@/content/original-pages';
export const metadata:Metadata={title:'Contact'};
export default function Page(){return <div className='contact-page' dangerouslySetInnerHTML={{__html:contactMarkup}}/>;}
