"use client";
import Link from 'next/link';
import {useState} from 'react';
import {usePortalAuth} from './auth-provider';
export function Header(){const{user}=usePortalAuth(),[open,setOpen]=useState(false);return <header className="site-header"><Link href="/" aria-label="KampusOne home" className="wordmark"><img src="/brand/logo.svg" alt="KampusOne" width={155} height={36}/></Link><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button><nav aria-label="Main navigation" className={open?'nav open':'nav'} onClick={()=>setOpen(false)}><Link href="/#experience">Experience</Link><Link href="/blog">Journal</Link><Link href="/documentation">Documentation</Link><a href="https://agents.kampusone.app/agents">Become an agent</a><Link href={user?'/account':'/signin'}>{user?'My account':'Sign in'}</Link><Link className="button small" href="/download">Get the app <span aria-hidden="true">↗</span></Link></nav></header>;}
