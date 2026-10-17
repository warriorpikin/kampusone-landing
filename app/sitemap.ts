import type {MetadataRoute} from 'next';
import {publicData,type Article} from '@/lib/website';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const origin='https://kampusone.app',data=await publicData<{articles:Article[]}>('/articles');return[...['','/blog','/about','/download','/contact','/privacy','/terms'].map(path=>({url:origin+path})),...(data?.articles??[]).map(a=>({url:origin+'/blog/'+a.slug,lastModified:new Date(a.updated_at??a.published_at)}))];}
