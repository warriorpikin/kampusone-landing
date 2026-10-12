"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
export function PortalShell({eyebrow,title,description,actions,children}:{active:'agents'|'admin'|'engineering';eyebrow:string;title:string;description:string;actions?:ReactNode;children:ReactNode}){
  const path=usePathname();
  return <section className="agent-workspace"><nav className="agent-section-nav" aria-label="Agent account">{[['Applications','/agents'],['Dashboard','/agents/dashboard'],['Payout setup','/agents/payouts']].map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined}>{label}</Link>)}</nav><header className="portal-header"><div>{eyebrow?<p className="eyebrow">{eyebrow}</p>:null}<h1>{title}</h1>{description?<p>{description}</p>:null}</div>{actions}</header>{children}</section>;
}
