import Link from 'next/link';
import type {Metadata} from 'next';
import {publicData,type Article} from '@/lib/website';
export const metadata:Metadata={title:'Journal'};
export default async function Blog(){const data=await publicData<{articles:Article[]}>('/articles');return <section className="page-shell"><p className="eyebrow">CAMPUS NOTES</p><h1>The KampusOne journal.</h1><p className="lede">Ideas, updates and stories from campus life.</p><div className="journal-list">{data?.articles.map(a=><Link className="journal-item" href={'/blog/'+a.slug} key={a.id}>{a.cover_url&&<img src={a.cover_url} alt=""/>}<div><span className="eyebrow">{a.author_name} · {new Date(a.published_at).toLocaleDateString('en-NG',{month:'short',day:'numeric',year:'numeric'})}</span><h2>{a.title}</h2><p>{a.excerpt}</p><span className="text-link">Read the story →</span></div></Link>)}</div>{!data?.articles.length&&<p className="notice">No stories have been published yet.</p>}</section>;}
