"use client";
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {PortalApiError,portalApi} from '@/lib/api';
import {PortalShell} from './portal-shell';
type Account={account_name:string;account_last4:string;bank_name:string;status:string;review_note?:string|null};
type Profile={id:string;agent_type:string;display_name:string;account:Account|null};
type Bank={code:string;name:string};

export function PayoutSetupWorkspace(){
  const [profiles,setProfiles]=useState<Profile[]>([]),[banks,setBanks]=useState<Bank[]>([]),[providerAvailable,setProviderAvailable]=useState(false);
  const [profileId,setProfileId]=useState(''),[bankCode,setBankCode]=useState(''),[bankQuery,setBankQuery]=useState(''),[accountNumber,setAccountNumber]=useState(''),[authorizedAccount,setAuthorizedAccount]=useState(false);
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState(''),[version,setVersion]=useState(0),[loadedVersion,setLoadedVersion]=useState(-1);
  const lock=useRef(false),attempt=useRef<{signature:string;id:string}|null>(null);
  useEffect(()=>{
    let active=true;
    void portalApi<{profiles:Profile[];providerAvailable:boolean}>('/v1/payout-setup',{signal:AbortSignal.timeout(8000)}).then(async response=>{
      if(!active)return;setProfiles(response.profiles);setProviderAvailable(response.providerAvailable);setError('');
      if(response.providerAvailable){const result=await portalApi<{banks:Bank[]}>('/v1/payout-setup/banks',{signal:AbortSignal.timeout(8000)});if(active)setBanks(result.banks);}
    }).catch(caught=>{if(active)setError(caught instanceof Error?caught.message:'Payout setup could not load.');}).finally(()=>{if(active)setLoadedVersion(version);});
    return()=>{active=false;};
  },[version]);
  async function resolveAccount(event:FormEvent){
    event.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setNotice('');
    const payload={agentProfileId:profileId,bankCode,accountNumber,authorizedAccount},signature=JSON.stringify(payload);
    if(attempt.current?.signature!==signature)attempt.current={signature,id:crypto.randomUUID()};
    try{
      const response=await portalApi<{account:Account}>('/v1/payout-setup/resolve',{method:'POST',signal:AbortSignal.timeout(12000),body:JSON.stringify({...payload,requestId:attempt.current.id})});
      setNotice(`Bank reports: ${response.account.account_name}. Setup status: ${response.account.status.replaceAll('_',' ').toLowerCase()}.`);
      setAccountNumber('');setAuthorizedAccount(false);attempt.current=null;setVersion(value=>value+1);
    }catch(caught){if(caught instanceof PortalApiError&&caught.details?.restartRequired===true)attempt.current=null;setNotice(caught instanceof Error?caught.message:'The bank could not be resolved. Retry retains the same request.');}
    finally{lock.current=false;setBusy(false);}
  }
  return <PortalShell active="agents" eyebrow="Approved agents" title="Set up your payout account" description="Add an account you own or are authorized to use. We’ll check the bank details before payout setup is reviewed." actions={<button className="button button--secondary" onClick={()=>setVersion(value=>value+1)}>Refresh</button>}>
    {notice?<p className="workspace-notice" role="status">{notice}</p>:null}
    {error?<p className="form-error" role="alert">{error}</p>:null}
    {loadedVersion!==version?<div className="table-skeleton" role="status" aria-busy="true"><div/><div/><div/></div>:!profiles.length?<section className="state-panel"><h2>Agent approval needed</h2><p>Payout setup opens after your application is approved.</p></section>:<>
      <div className="table-scroll"><table className="operational-table"><thead><tr><th>Agent role</th><th>Bank</th><th>Resolved name</th><th>Account</th><th>Review status</th></tr></thead><tbody>{profiles.map(profile=><tr key={profile.id}><td>{profile.display_name} · {profile.agent_type}</td><td>{profile.account?.bank_name??'Not set up'}</td><td>{profile.account?.account_name??'—'}</td><td>{profile.account?'•••• '+profile.account.account_last4:'—'}</td><td>{profile.account?.status??'NOT_STARTED'}{profile.account?.review_note?<p>{profile.account.review_note}</p>:null}</td></tr>)}</tbody></table></div>
      {!providerAvailable?<p className="workspace-notice">Bank resolution is unavailable. Please try again shortly.</p>:<form className="form-stack manage-form" onSubmit={event=>void resolveAccount(event)}><fieldset disabled={busy} style={{border:0,padding:0,margin:0,minWidth:0}}>
        <h2>Resolve bank details</h2><label>Approved role<select required value={profileId} onChange={event=>setProfileId(event.target.value)}><option value="">Choose an approved role</option>{profiles.map(profile=><option key={profile.id} value={profile.id}>{profile.display_name} · {profile.agent_type}</option>)}</select></label>
        <label>Find bank<input type="search" value={bankQuery} onChange={event=>setBankQuery(event.target.value)}/></label><label>Bank<select required value={bankCode} onChange={event=>setBankCode(event.target.value)}><option value="">Choose a bank</option>{banks.filter(bank=>bank.code===bankCode||bank.name.toLowerCase().includes(bankQuery.toLowerCase())).map(bank=><option key={bank.code} value={bank.code}>{bank.name}</option>)}</select></label>
        <label>Account number<input required inputMode="numeric" autoComplete="off" pattern="[0-9]{10}" maxLength={10} value={accountNumber} onChange={event=>setAccountNumber(event.target.value.replace(/\D/g,''))}/></label><label className="checkbox"><input type="checkbox" required checked={authorizedAccount} onChange={event=>setAuthorizedAccount(event.target.checked)}/>I own or am authorized to use this payout account.</label><button className="button button--primary" disabled={busy}>{busy?'Resolving bank account…':'Resolve account name'}</button>
      </fieldset></form>}
    </>}
  </PortalShell>;
}
