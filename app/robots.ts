import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:'*',allow:'/',disallow:['/account/','/signin','/signup','/agents/']},sitemap:'https://kampusone.app/sitemap.xml',host:'https://kampusone.app'};}
