/* eslint-disable @next/next/no-html-link-for-pages -- Original site navigation reloads the document so its visual demonstrations initialize on arrival. */
export function Footer(){return <footer className="site-footer" id="contact-footer"><div className="footer-card">
 <div className="footer-intro"><img src="/assets/brand/KampusOne_horizontal_white.svg" alt="KampusOne"/><h2>One campus.<br/>One connected student life.</h2><p>News, classes, routes, people and everyday campus services — made easier to find and use.</p><a className="footer-early-link" href="/download">Get the app</a></div>
 <div className="footer-links">
  <div><h3>Explore</h3><a href="/">Home</a><a href="/about">About</a><a href="/#experience">Features</a><a href="/blog">Blog</a><a href="/team">Team</a><a href="/contact">Contact</a></div>
  <div><h3>Your campus</h3><a href="/download">Download the app</a><a href="/signup">Create an account</a><a href="/signin">Sign in</a><a href="/documentation">Documentation</a><a href="https://agents.kampusone.app/agents">Become an agent</a></div>
  <div><h3>Help & information</h3><a href="/privacy">Privacy policy</a><a href="/terms">Terms & conditions</a><a href="mailto:support@kampusone.app">Contact support</a><a href="https://codehype.ai/product/kampusone?utm_source=codehype_badge" target="_blank" rel="noopener noreferrer"><img src="https://codehype.ai/badges/kampusone.svg?variant=find-us&v=20" alt="Featured on CodeHype" width={180} height={65} loading="lazy" decoding="async" style={{width:'100%',maxWidth:180,height:'auto',maxHeight:65,border:0}}/></a></div>
 </div><div className="footer-bottom"><span>© {new Date().getFullYear()} KampusOne</span><span>Built around students, not dashboards.</span></div>
 </div></footer>;}
