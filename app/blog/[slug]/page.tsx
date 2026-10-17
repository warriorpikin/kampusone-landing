import Link from 'next/link';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {cache} from 'react';
import {publicData,type Article} from '@/lib/website';
import {ArticleActions} from '@/components/article-actions';
const article=cache(async(slug:string)=>{if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))notFound();const data=await publicData<{article:Article}>('/articles/'+encodeURIComponent(slug));if(!data)notFound();return data.article;});
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params,a=await article(slug),url='https://kampusone.app/blog/'+a.slug;return{title:a.title,description:a.excerpt,alternates:{canonical:url},authors:[{name:a.author_name}],openGraph:{type:'article',url,title:a.title,description:a.excerpt,publishedTime:a.published_at,modifiedTime:a.updated_at??a.published_at,authors:[a.author_name],images:a.cover_url?[{url:a.cover_url,alt:a.title}]:[]},twitter:{card:a.cover_url?'summary_large_image':'summary',title:a.title,description:a.excerpt,images:a.cover_url?[a.cover_url]:[]},robots:{index:true,follow:true}};}
export default async function Story({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,a=await article(slug),url='https://kampusone.app/blog/'+a.slug;
 const structured={'@context':'https://schema.org','@type':'BlogPosting',headline:a.title,description:a.excerpt,datePublished:a.published_at,dateModified:a.updated_at??a.published_at,mainEntityOfPage:url,url,author:{'@type':'Person',name:a.author_name},publisher:{'@type':'Organization',name:'KampusOne',url:'https://kampusone.app',logo:{'@type':'ImageObject',url:'https://kampusone.app/assets/brand/K1_symbol_terracotta.svg'}},...(a.cover_url?{image:[a.cover_url]}:{})};
 return <div className="article-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/><article>
  <header className="article-hero section-shell"><Link href="/blog" className="article-back">Back to field notes</Link><span className="article-hero-marker" aria-hidden="true">01</span><p className="section-kicker">Field note · {a.author_name}</p><h1>{a.title}</h1><p className="article-dek">{a.excerpt}</p><time className="article-date" dateTime={a.published_at}>{new Date(a.published_at).toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'})}</time></header>
  <div className="article-body section-shell">{a.cover_url&&<img className="article-cover" src={a.cover_url} alt={a.title}/>}<div>{a.body?.split(/\n\s*\n/).map((p,i)=><p key={i}>{p}</p>)}</div><aside className="article-closing"><img src="/assets/brand/K1_symbol_terracotta.svg" alt=""/><p>One campus. One app. One clearer student experience.</p></aside><div className="feature-page"><ArticleActions slug={slug} title={a.title} initialLikes={a.likes}/></div></div>
 </article></div>;
}
