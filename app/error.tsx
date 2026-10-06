"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="page-shell"><p className="eyebrow">LET’S TRY THAT AGAIN</p><h1>This page could not load.</h1><p>Please check your connection and try again.</p><button className="button" onClick={reset}>Try again</button></section>;}
