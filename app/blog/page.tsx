import Link from 'next/link';
import type {Metadata} from 'next';
import {publicData,type Article} from '@/lib/website';
export const metadata:Metadata={title:'Blog'};
export default async function Blog(){
 const data=await publicData<{articles:Article[]}>('/articles'),articles=data?.articles??[],featured=articles[0];
 return <div className="blog-page">
  <section className="page-hero section-shell blog-page-hero"><p className="section-kicker">Field notes</p><h1>Thinking in public about better campus life.</h1><p>Product decisions, design principles and observations from the student experience KampusOne is being built around.</p></section>
  <section className="blog-index section-shell">
   {featured&&<Link className="featured-story reveal-section" href={'/blog/'+featured.slug}><div className="featured-story-art" aria-hidden="true"><span>01</span><img src="/assets/brand/K1_symbol_terracotta.svg" alt=""/></div><div className="featured-story-copy"><span>Field note · Featured</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><strong>Read the note</strong></div></Link>}
   <div className="article-list">{articles.slice(1).map((a,i)=><Link className="article-row reveal-section" key={a.id} href={'/blog/'+a.slug}><span className="article-number">{String(i+2).padStart(2,'0')}</span><div><span className="article-category">{a.author_name}</span><h2>{a.title}</h2><p>{a.excerpt}</p></div><span className="article-action">Read the note →</span></Link>)}</div>
   {!articles.length&&<p className="blog-empty">No stories have been published yet.</p>}
  </section>
 </div>;
}
