import type {Metadata} from 'next';
import {aboutMarkup} from '@/content/original-pages';
export const metadata:Metadata={title:'About'};
export default function Page(){return <div className='about-page' dangerouslySetInnerHTML={{__html:aboutMarkup}}/>;}
