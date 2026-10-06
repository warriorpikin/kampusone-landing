import Link from 'next/link';
import {notFound} from 'next/navigation';
import {publicData,type Article} from '@/lib/website';
import {ArticleActions} from '@/components/article-actions';
export default async function Story({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,data=await publicData<{article:Article}>('/articles/'+encodeURIComponent(slug));if(!data)notFound();const a=data.article;
 return <div className="article-page"><article>
  <header className="article-hero section-shell"><Link href="/blog" className="article-back">Back to field notes</Link><span className="article-hero-marker" aria-hidden="true">01</span><p className="section-kicker">Field note · {a.author_name}</p><h1>{a.title}</h1><p className="article-dek">{a.excerpt}</p><p className="article-date">{new Date(a.published_at).toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'})}</p></header>
  <div className="article-body section-shell">{a.cover_url&&<img className="article-cover" src={a.cover_url} alt=""/>}{a.body?.split(/\n\s*\n/).map((p,i)=><p key={i}>{p}</p>)}<aside className="article-closing"><img src="/assets/brand/K1_symbol_terracotta.svg" alt=""/><p>One campus. One app. One clearer student experience.</p></aside><div className="feature-page"><ArticleActions slug={slug} title={a.title} initialLikes={a.likes}/></div></div>
 </article></div>;
}
