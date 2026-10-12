"use client";
import {useRef,useState,type FormEvent} from 'react';
import {portalApi} from '@/lib/api';

export function WaitlistForm({academicContextReady=false}:{academicContextReady?:boolean}){
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false),[level,setLevel]=useState('');
  const lock=useRef(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(lock.current)return;lock.current=true;
    const form=new FormData(event.currentTarget);setBusy(true);setError('');
    try{
      await portalApi('/v1/website/waitlist',{signal:AbortSignal.timeout(8000),method:'POST',body:JSON.stringify({email:form.get('email'),fullName:form.get('name'),universityName:form.get('university'),...(academicContextReady?{faculty:form.get('faculty')||'',department:form.get('department')||'',currentLevel:level==='CUSTOM'?form.get('customLevel'):level}:{}),platform:form.get('platform'),contactConsent:form.get('consent')==='yes',website:form.get('website')})},false);
      setDone(true);
    }catch(caught){setError(caught instanceof Error?caught.message:'Your request could not be saved. Please try again.');}
    finally{lock.current=false;setBusy(false);}
  }
  if(done)return <div className="success-panel" role="status"><span className="success-icon">✓</span><h2>You’re on the list.</h2><p>We’ll email you about KampusOne access.</p></div>;
  return <form className="form-stack" onSubmit={event=>void submit(event)}>
    <label>Full name<input name="name" autoComplete="name" required minLength={2} maxLength={120} disabled={busy}/></label>
    <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy}/></label>
    <label>University <span className="fine">optional</span><input name="university" maxLength={180} disabled={busy}/></label>
    <fieldset disabled={busy||!academicContextReady} className="form-stack" style={{border:0,padding:0,margin:0,minWidth:0}}><legend className="fine">Your academic details · optional</legend>
    {!academicContextReady?<p className="fine">Academic details are being prepared. You can join with your name and email now.</p>:null}
    <div className="field-pair"><label>Faculty<input name="faculty" maxLength={180}/></label><label>Department<input name="department" maxLength={180}/></label></div>
    <label>Level<select name="level" value={level} onChange={event=>setLevel(event.target.value)}><option value="">Select your level</option>{['100','200','300','400','500','600','Postgraduate'].map(value=><option key={value} value={value}>{value==='Postgraduate'?value:value+' level'}</option>)}<option value="CUSTOM">Enter my level</option></select></label>
    {level==='CUSTOM'?<label>Your level<input name="customLevel" placeholder="e.g. ND 2, HND 1, pre-degree" maxLength={80} required disabled={busy}/></label>:null}
    </fieldset>
    <label>Your device<select name="platform" defaultValue="BOTH" disabled={busy}><option value="ANDROID">Android</option><option value="IOS">iPhone / iPad</option><option value="BOTH">Both</option></select></label>
    <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <label className="check"><input type="checkbox" name="consent" value="yes" required disabled={busy}/><span>I agree to receive access updates by email. See our <a href="/privacy">privacy policy</a>.</span></label>
    {error?<p role="alert" className="notice">{error}</p>:null}
    <button disabled={busy} aria-busy={busy} className="button">{busy?'Saving…':'Join the waitlist →'}</button>
  </form>;
}
