import type {Metadata} from 'next';
import Script from 'next/script';
import {AuthProvider} from '@/components/auth-provider';
import {SiteFrame} from '@/components/site-frame';
import './original-site.css';
import './globals.css';
import './site-additions.css';
export const metadata:Metadata={metadataBase:new URL('https://kampusone.app'),title:{default:'KampusOne — Everything Campus. Connected.',template:'%s · KampusOne'},description:'KampusOne connects campus news, classes, routes, services and student life in one calm, useful experience.',icons:{icon:'/favicon.svg'},openGraph:{title:'KampusOne — One Campus, One App.',description:'Everything campus. Connected.',images:['/assets/images/campus-social.jpg']}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><AuthProvider><SiteFrame>{children}</SiteFrame></AuthProvider><Script src="/original-site.js" strategy="afterInteractive"/></body></html>;}
