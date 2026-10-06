import type {Metadata} from 'next';
import {teamMarkup} from '@/content/original-pages';
export const metadata:Metadata={title:'Team'};
export default function Page(){return <div className='team-page' dangerouslySetInnerHTML={{__html:teamMarkup}}/>;}
