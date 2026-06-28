# Netlify Deployment Guide

This guide covers deploying the Midwest Healthcare Staffing Agency website to Netlify with the domain `midwesthealthcarestaffing.com`.

## Pre-Deployment Checklist

- [x] Domain references updated (midwesthealthcarestaffing.com)
- [x] Formspree ID configured (movknbrb)
- [x] Google Analytics ID needs to be configured (still TODO)
- [x] netlify.toml created with all configurations
- [x] All files committed to git

## Step 1: Update Google Analytics ID

Before deployment, update your Google Analytics ID in all pages:

1. Go to https://analytics.google.com/
2. Create a new property for midwesthealthcarestaffing.com
3. Get your **Measurement ID** (format: G-XXXXXXXXXX)
4. In your code editor, search for `G-XXXXXXXXXX` in all .html files
5. Replace all occurrences with your actual Measurement ID
6. Commit these changes: `git add . && git commit -m "Update Google Analytics ID"`

## Step 2: Connect GitHub Repository to Netlify

### Option A: Deploy via Netlify UI (Easiest)

1. Go to https://app.netlify.com/
2. Click **"New site from Git"** (or sign up if needed)
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the repository: `agents-web-app-production-check` (or your fork)
6. Select the branch: **main** (or your production branch)
7. Build settings:
   - Build command: Leave empty (we use `netlify.toml`)
   - Publish directory: `.` (current directory)
   - Click **Deploy site**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to your Netlify account
netlify login

# Deploy from project directory
cd /Users/tituswanjala/midwest.worktrees/agents-web-app-production-check
netlify deploy --prod --dir .
```

## Step 3: Configure Custom Domain

### In Netlify Dashboard:

1. Go to your site's **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `midwesthealthcarestaffing.com`
4. Netlify will check availability and ask about DNS setup
5. Choose one of these options:

#### Option A: Netlify DNS (Recommended)
1. Netlify will provide nameservers
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update your domain's nameservers to Netlify's nameservers
4. Wait 24-48 hours for DNS propagation

#### Option B: CNAME Record
1. If keeping your current registrar's DNS:
2. Add a CNAME record: `www` → your Netlify domain
3. Netlify will provide the exact CNAME target
4. Wait 24-48 hours for DNS propagation

#### Option C: A Records
1. If you need more control:
2. Ask Netlify support for the A record values
3. Update A records in your domain registrar
4. Wait 24-48 hours for DNS propagation

## Step 4: Enable HTTPS

1. Netlify automatically provisions **Let's Encrypt SSL certificates**
2. Go to **Site settings** → **Domain management**
3. You should see:
   - ✅ SSL certificate provisioned (auto-renewed annually)
   - ✅ HTTPS enforced
   - ✅ Automatic redirects from HTTP to HTTPS

## Step 5: Verify Deployment

### Check Site Status
```
1. Go to Netlify dashboard
2. View deploy logs
3. Ensure build succeeded
4. Check "Published" status
```

### Test Your Site
```
1. Visit https://midwesthealthcarestaffing.com
2. Check all pages load correctly
3. Test forms submit to Formspree
4. Verify analytics script loaded (check browser DevTools → Network)
```

### Security Headers Verification
```
1. Go to https://securityheaders.com/
2. Enter: midwesthealthcarestaffing.com
3. Verify all security headers are present:
   - X-Frame-Options
   - X-XSS-Protection
   - X-Content-Type-Options
   - Cache-Control
```

### Performance Check
```
1. Go to https://pagespeed.web.dev/
2. Enter: midwesthealthcarestaffing.com
3. Aim for score > 90
4. Review suggestions
```

## Step 6: Configure Environment Variables (Optional)

If you need environment variables (for future backend integration):

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add your variables from `.env.example`
4. Redeploy to apply changes

## Step 7: Set Up Form Notifications

Your forms are already configured with Formspree. To receive notifications:

1. Go to https://formspree.io/f/movknbrb
2. In your Formspree dashboard:
   - Go to **Settings** → **Notifications**
   - Add your email address
   - Choose notification preferences
3. Test a form submission to verify it works

## Step 8: Monitor Your Site

### In Netlify Dashboard

1. **Deploys** tab
   - View all deployments
   - See build logs
   - Rollback if needed

2. **Analytics** tab
   - View site traffic
   - Monitor performance
   - Track user engagement

3. **Forms** tab (if enabled)
   - View form submissions
   - Export data

### In Google Analytics

1. Go to https://analytics.google.com/
2. Wait 24-48 hours for initial data
3. Monitor:
   - Real-time visitors
   - Page views
   - User behavior
   - Traffic sources

## Continuous Deployment

**Auto-Deploy on Git Push:**

Netlify automatically deploys when you push to your main branch:

```bash
# Make changes locally
git add .
git commit -m "Your changes"

# Push to GitHub
git push origin main

# Netlify automatically deploys to production
# Watch deploy logs in Netlify dashboard
```

## Rollback to Previous Version

If something goes wrong:

1. Go to Netlify dashboard → **Deploys**
2. Find the previous working deployment
3. Click **Restore**
4. Netlify will redeploy the previous version

## Troubleshooting

### Domain Not Working
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Check nameservers point to Netlify (or CNAME/A records correct)
- [ ] Clear browser cache and try again
- [ ] Check Netlify DNS status: green checkmark ✅

### HTTPS Not Working
- [ ] Wait 24-48 hours for SSL certificate
- [ ] Verify domain is correct in Netlify settings
- [ ] Check "HTTPS enforced" is toggled ON

### Forms Not Submitting
- [ ] Verify Formspree ID is correct (movknbrb)
- [ ] Check browser console for errors
- [ ] Test with https://formspree.io/f/movknbrb directly
- [ ] Verify form method is POST

### Analytics Not Showing
- [ ] Wait 24-48 hours for data to appear
- [ ] Verify Google Analytics ID in page source (DevTools)
- [ ] Check Analytics dashboard filters

### Cache Issues
- [ ] Hard refresh browser (Cmd+Shift+R on Mac)
- [ ] Clear browser cache completely
- [ ] Check cache headers in DevTools → Network

## Performance Optimization

Your site is already optimized, but Netlify provides additional features:

1. **Netlify Edge Functions** - Advanced caching and routing
2. **Netlify Redirects** - Already configured in netlify.toml
3. **Netlify Forms** - If you want form handling at Netlify level
4. **Analytics** - Built-in traffic analytics

See Netlify documentation for advanced features.

## Security Best Practices

✅ Already Configured:
- [x] HTTPS with auto-renewal
- [x] Security headers in netlify.toml
- [x] HSTS headers for HTTPS enforcement
- [x] CSP for XSS protection
- [x] Clickjacking protection

To maintain security:
- [ ] Monitor Netlify security advisories
- [ ] Keep dependencies updated
- [ ] Review deploy logs regularly
- [ ] Monitor form submissions for spam

## Support & Resources

- **Netlify Documentation**: https://docs.netlify.com/
- **Netlify Support**: https://support.netlify.com/
- **Formspree Support**: https://formspree.io/help/
- **Google Analytics Help**: https://support.google.com/analytics/

## Post-Launch Checklist

- [ ] Domain resolves to https://midwesthealthcarestaffing.com
- [ ] All pages load without errors
- [ ] Forms submit successfully to Formspree
- [ ] Analytics tracking verified in real-time
- [ ] Security headers present (https://securityheaders.com/)
- [ ] Performance score > 90 (https://pagespeed.web.dev/)
- [ ] SSL certificate valid and auto-renewing
- [ ] Team trained on deployment process
- [ ] Backups configured (GitHub has your history)
- [ ] Monitoring set up (Netlify + Google Analytics)

## Questions?

If you have questions about Netlify deployment, refer to:
- DEPLOYMENT.md (general deployment guide)
- PRODUCTION-CHECKLIST.md (launch checklist)
- README.md (feature documentation)
