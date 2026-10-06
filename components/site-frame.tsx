"use client";
import {usePathname} from 'next/navigation';
import {Header} from './header';
import {Footer} from './footer';
export function SiteFrame({children}:{children:React.ReactNode}) {
 const path=usePathname(),originalPage=['/','/about','/team','/contact'].includes(path)||path.startsWith('/blog');
 return <div className={path==='/'?'home-page':'inner-page'}>
  <a className="skip-link" href="#main-content">Skip to content</a><Header/>
  <main id="main-content" className={originalPage?undefined:'feature-page'}>{children}</main><Footer/>
 </div>;
}
