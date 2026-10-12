"use client";
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {Fragment,type ReactNode} from 'react';
import {usePortalAuth} from './auth-provider';

export function AccessGate({children}:{surface:'agents';children:ReactNode}){
  const {status,user,restoreError,retryRestore}=usePortalAuth();
  const next=usePathname();
  if(restoreError)return <section className="auth-shell"><h1>Check your account</h1><p role="alert">{restoreError}</p><button className="button" onClick={()=>void retryRestore()}>Try again</button></section>;
  if(status==='loading')return <section className="auth-shell" aria-busy="true"><p role="status">Checking your KampusOne account…</p></section>;
  if(status==='authenticated')return <Fragment key={JSON.stringify([user?.id,user?.universityId,user?.roles,user?.operatorRoles])}>{children}</Fragment>;
  return <section className="auth-shell"><p className="eyebrow">YOUR KAMPUSONE ACCOUNT</p><h1>Work with your campus.</h1><p>Use your KampusOne account to apply as a vendor, tutor, or rider.</p><div className="actions"><Link className="button" href={'/signin?next='+encodeURIComponent(next)}>Sign in →</Link><Link className="button secondary" href={'/signup?next='+encodeURIComponent(next)}>Create an account →</Link></div></section>;
}
