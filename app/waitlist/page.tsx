import {notFound} from 'next/navigation';
import {publicData,type WebsiteConfig} from '@/lib/website';
import {WaitlistForm} from '@/components/waitlist-form';
export default async function Waitlist({searchParams}:{searchParams:Promise<{platform?:string|string[]}>}){const [config,query]=await Promise.all([publicData<WebsiteConfig>('/config'),searchParams]);if(!config?.waitlistEnabled)notFound();const platform=query.platform==='ANDROID'||query.platform==='IOS'?query.platform:'BOTH';return <section className="auth-shell"><p className="eyebrow">BE PART OF YOUR CAMPUS</p><h1>Stay in the loop.</h1><p>Register your interest in KampusOne access.</p><WaitlistForm academicContextReady={config.waitlistAcademicContextReady===true} initialPlatform={platform}/></section>;}
