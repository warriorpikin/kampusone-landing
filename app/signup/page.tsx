import {Suspense} from 'react';
import {AccountForm} from '@/components/account-form';
export default function SignUp(){return <section className="auth-shell"><p className="eyebrow">ONE ACCOUNT. YOUR WHOLE CAMPUS.</p><h1>Make yourself at home.</h1><p>Create your account here and use it in the KampusOne app.</p><Suspense fallback={<p role="status">Loading sign-in…</p>}><AccountForm mode="signup"/></Suspense></section>;}
