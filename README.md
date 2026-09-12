itni achi website and lowkey you are here fck off go see live website

## Deploying to contactharsh.in

The production canonical URL is `https://contactharsh.in/`. The existing Vercel URL can remain available as the deployment address, but it should not be used as the canonical site URL.

1. Deploy this repository to the Vercel project.
2. In Vercel, open **Settings → Domains** and add `contactharsh.in`.
3. Configure the DNS records Vercel shows for the domain at your registrar. For the standard Vercel setup, the apex record is usually:

   ```text
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   Vercel may show a project-specific value, so use the value in the project’s Domain Settings when it differs. Remove conflicting apex A records.

4. Add `www.contactharsh.in` in Vercel if you want the alternate hostname covered. Configure the CNAME target Vercel provides (often `cname.vercel-dns-0.com`) and set the apex `contactharsh.in` as the project’s primary domain so `www` redirects to the canonical apex URL.
5. If Vercel requests domain ownership verification, add the displayed TXT record exactly as shown.
6. Wait for DNS propagation, then confirm Vercel reports the domain as valid and HTTPS is active.

Useful checks:

```bash
dig contactharsh.in +short
curl -I https://contactharsh.in/
curl -I https://contactharsh.in/robots.txt
curl -I https://contactharsh.in/sitemap.xml
```

After deployment, verify these URLs:

- `https://contactharsh.in/`
- `https://contactharsh.in/robots.txt`
- `https://contactharsh.in/sitemap.xml`

Then add the property in Google Search Console, submit `https://contactharsh.in/sitemap.xml`, and request indexing for the homepage.
