export const apiOrigin=process.env.KAMPUSONE_API_ORIGIN??'https://platformp.divine-haze-54eb.workers.dev';
export type WebsiteConfig={waitlistEnabled:boolean;iosUrl:string;playStoreUrl:string;android:{version:string;sizeBytes:number;sha256:string;url:string}|null};
export type Article={id:string;slug:string;title:string;excerpt:string;body?:string;cover_url:string;author_name:string;published_at:string;likes:number};
export async function publicData<T>(path:string){const r=await fetch(apiOrigin+'/v1/website'+path,{cache:'no-store',signal:AbortSignal.timeout(15000)});if(r.status===404)return null;if(!r.ok)throw new Error('KampusOne could not load this page. Please try again shortly.');return r.json() as Promise<T>;}
