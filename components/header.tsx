/* eslint-disable @next/next/no-html-link-for-pages -- Preserve document navigation and initialize the original visual demonstrations on arrival. */
"use client";
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {usePortalAuth} from './auth-provider';
const links=[['Home','/'],['About','/about'],['Features','/#experience'],['Blog','/blog'],['Team','/team'],['Contact','/contact'],['Documentation','/documentation']];
export function Header(){
 const {user}=usePortalAuth(),path=usePathname(),home=path==='/',[open,setOpen]=useState(false);
 const trigger=useRef<HTMLButtonElement>(null),panel=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open)return;
  const oldOverflow=document.body.style.overflow,triggerButton=trigger.current;document.body.style.overflow='hidden';
  panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
  const keys=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){setOpen(false);return;}
   if(event.key!=='Tab')return;
   const items=panel.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
   if(!items?.length)return;
   const first=items[0],last=items[items.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  document.addEventListener('keydown',keys);
  return()=>{document.body.style.overflow=oldOverflow;document.removeEventListener('keydown',keys);triggerButton?.focus();};
 },[open]);
 const active=(href:string)=>href==='/'?home:!href.includes('#')&&(path===href||path.startsWith(href+'/'));
 return <><header className={'site-header'+(home?' site-header-home':'')}>
  <a className="brand-link" href="/" aria-label="KampusOne home"><img src={'/assets/brand/KampusOne_horizontal_'+(home?'white':'ink')+'.svg'} alt="KampusOne"/></a>
  <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([name,href])=><a key={href} href={href} className={active(href)?'is-active':undefined} aria-current={active(href)?'page':undefined}>{name}</a>)}</nav>
  <div className="header-actions"><a className="header-account" href={user?'/account':'/signin'}>{user?'My account':'Sign in'}</a><a className="coming-action" href="/download">Get the app</a></div>
  <a className="mobile-home-link" href="/" aria-current={home?'page':undefined}>Home</a>
  <button ref={trigger} className="mobile-menu-trigger" type="button" aria-label="Open navigation" aria-controls="mobile-navigation" aria-expanded={open} onClick={()=>setOpen(true)}><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
 </header>
 {open&&<div className="mobile-nav-shell is-open" onClick={event=>{if(event.target===event.currentTarget)setOpen(false);}}><div ref={panel} id="mobile-navigation" className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <div className="mobile-menu-header"><img src="/assets/brand/KampusOne_horizontal_ink.svg" alt="KampusOne"/><button className="menu-close" type="button" aria-label="Close navigation" onClick={()=>setOpen(false)}><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button><p className="mobile-menu-title">Explore KampusOne</p><p className="mobile-menu-description">One connected view of campus life.</p></div>
  <nav className="mobile-nav" aria-label="Mobile navigation">{[...links,['Become an agent','https://agents.kampusone.app/agents'],[user?'My account':'Sign in',user?'/account':'/signin'],['Get the app','/download']].map(([name,href],i)=><a key={href} href={href} aria-current={active(href)?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span>{name}</a>)}</nav>
  <div className="mobile-menu-foot"><span>Made for the rhythm of student life.</span></div>
 </div></div>}</>;
}
