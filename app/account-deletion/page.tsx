import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={title:'Delete your KampusOne account'};
export default function AccountDeletion(){
  return <article className="article-shell legal">
    <p className="eyebrow">YOUR KAMPUSONE ACCOUNT</p>
    <h1>Request account deletion</h1>
    <p>You can request deletion of your KampusOne account and its associated data here, even if you have uninstalled the app.</p>
    <section><h2>Send a deletion request</h2>
      <p>Email support@kampusone.app from the email address registered to your account. Use the subject “Delete my KampusOne account” and include your username if you know it. We will verify ownership before deleting an account. Do not send your password, payment details or identity documents.</p>
      <a className="button" href="mailto:support@kampusone.app?subject=Delete%20my%20KampusOne%20account">Request deletion by email ↗</a>
      <p>If you cannot access your registered email, contact the same support address and explain the access issue so we can help verify ownership.</p>
    </section>
    <section><h2>Delete through your account</h2>
      <p>In KampusOne, open Account ownership → Delete account. Request the confirmation code, enter the code sent to your email, type DELETE and confirm. You can also use the website after signing in.</p>
      <a className="text-link" href="https://mobile.kampusone.app/delete-account">Open account deletion on the web →</a>
    </section>
    <section><h2>What happens to your data</h2>
      <p>Deletion removes your active profile, posts, comments, study history and uploaded files, and signs you out on every device. Necessary payment, order, accounting and safety records may be retained for legal obligations or unresolved disputes. Those records do not keep your profile active. Support will explain any retained records and the expected completion time when acknowledging an email request.</p>
      <p><Link href="/privacy">Read the privacy policy →</Link></p>
    </section>
  </article>;
}
