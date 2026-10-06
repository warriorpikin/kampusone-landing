import type {NextConfig} from 'next';
const config:NextConfig={poweredByHeader:false,reactStrictMode:true,async rewrites(){return[{source:'/api/:path*',destination:(process.env.KAMPUSONE_API_ORIGIN??'https://platformp.divine-haze-54eb.workers.dev')+'/:path*'}];},async headers(){return[{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'X-Frame-Options',value:'DENY'}]}];}};
export default config;
