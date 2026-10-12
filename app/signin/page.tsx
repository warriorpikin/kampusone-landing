import {Suspense} from 'react';
import {AccountForm} from '@/components/account-form';
export default function SignIn(){return <section className="auth-shell"><p className="eyebrow">YOUR CAMPUS, CONNECTED</p><h1>Welcome back.</h1><p>Use your KampusOne account from the app.</p><Suspense fallback={<p role="status">Loading sign-in…</p>}><AccountForm mode="signin"/></Suspense></section>;}
