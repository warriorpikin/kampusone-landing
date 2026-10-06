import {notFound} from 'next/navigation';
import {publicData,type WebsiteConfig} from '@/lib/website';
import {WaitlistForm} from '@/components/waitlist-form';
export default async function Waitlist(){const config=await publicData<WebsiteConfig>('/config');if(!config?.waitlistEnabled)notFound();return <section className="auth-shell"><p className="eyebrow">BE PART OF YOUR CAMPUS</p><h1>Stay in the loop.</h1><p>Register your interest in KampusOne access.</p><WaitlistForm/></section>;}
