# Deployment Guide

## Production Deployment Checklist

### Pre-Deployment
- [ ] All forms are configured with Formspree Form IDs (contact.html, apply-now.html)
- [ ] Google Analytics ID is updated in all HTML files (search for `G-XXXXXXXXXX`)
- [ ] `.env.example` is copied to `.env` with production values
- [ ] All links use HTTPS only
- [ ] sitemap.xml and robots.txt are updated with your domain

### Configuration Steps

#### 1. Set Up Formspree Forms
Formspree provides serverless form handling without backend code.

1. Go to https://formspree.io/
2. Create an account or sign in
3. Create a form for "Contact Inquiries":
   - Get your form ID
   - Update in `contact.html`: `action="https://formspree.io/f/YOUR_FORM_ID"`
4. Create a form for "Job Applications":
   - Get your form ID
   - Update in `apply-now.html`: `action="https://formspree.io/f/YOUR_FORM_ID"`

#### 2. Set Up Google Analytics
1. Go to https://analytics.google.com/
2. Create a new property for your domain
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Update all HTML files:
   - Replace `G-XXXXXXXXXX` with your actual ID in the Google Analytics script tag
   - Files to update:
     - index.html
     - about.html
     - contact.html
     - apply-now.html
     - All other .html files

#### 3. Update Domain References
Search and replace in all files:
- `midwesthealthcarestaffing.com` → your actual domain
- Update URLs in:
  - sitemap.xml
  - robots.txt
  - .env file
  - All HTML meta tags

### Deployment Platforms

#### Option 1: Netlify (Recommended for Static Sites)
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: (leave empty for static site)
   - Publish directory: (set to root or `.`)
3. Set environment variables:
   - Go to Settings → Build & Deploy → Environment
   - Add your `.env` variables
4. Deploy
   - Netlify automatically deploys on git push to main

Benefits:
- Free HTTPS with auto-renewal
- CDN for fast global delivery
- Form handling integration
- Easy rollback

#### Option 2: Vercel
1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Project settings are automatically detected
4. Deploy
   - Automatic deployment on git push

Benefits:
- Optimized for static sites
- Built-in analytics
- Unlimited deployments
- Edge caching

#### Option 3: AWS S3 + CloudFront
1. Create an S3 bucket with your domain name
2. Upload all files to the bucket
3. Configure CloudFront distribution pointing to S3
4. Set up Route 53 for DNS
5. Request SSL certificate via ACM

#### Option 4: Self-Hosted Apache
1. Upload files to your web server
2. Ensure `.htaccess` is in root directory
3. Enable mod_rewrite and mod_headers:
   ```bash
   a2enmod rewrite
   a2enmod headers
   systemctl restart apache2
   ```
4. Configure SSL with Let's Encrypt:
   ```bash
   certbot --apache -d yourdomain.com
   ```

### Post-Deployment Testing

#### Test Links and Forms
```bash
# Check all internal links work
curl -I https://yourdomain.com/index.html
curl -I https://yourdomain.com/404.html
curl -I https://yourdomain.com/privacy.html

# Verify redirect to HTTPS
curl -I http://yourdomain.com
```

#### Test SEO
1. Submit sitemap to Google Search Console:
   - Go to https://search.google.com/search-console/
   - Add your domain
   - Submit sitemap: yourdomain.com/sitemap.xml

2. Submit to Bing Webmaster Tools:
   - https://www.bing.com/webmaster/

#### Test Security Headers
Use https://securityheaders.com to verify your headers are set correctly.

#### Test Performance
- https://pagespeed.web.dev - Google Page Speed
- https://www.gtmetrix.com - GTmetrix performance report
- https://www.webpagetest.org - Detailed waterfall analysis

#### Test Accessibility
- https://wave.webaim.org - WAVE accessibility checker
- https://www.axe-con.com/free-web-accessibility-checker - Axe DevTools

### Monitoring

#### Monitor Form Submissions
- Formspree Dashboard: Check submissions, analytics, and integrations
- Set up email notifications for new submissions
- Export data for analysis

#### Monitor Site Performance
- Google Analytics: Monitor traffic, user behavior, conversions
- Google Search Console: Monitor search performance, crawl errors
- Uptime monitoring: Use Uptime Robot or StatusPage

#### Monitor Security
- Check SSL certificate expiration (auto-renewed on Netlify/Vercel)
- Monitor for security headers with https://securityheaders.com

### Maintenance

#### Regular Updates
- Review and update content quarterly
- Update sitemap.xml with new pages
- Update copyright year in footer (keep it dynamic if possible)

#### Backup Strategy
- Version control via GitHub (enables easy rollback)
- Export backups of form submissions monthly
- Keep `.env` values secured in a password manager

#### SSL Certificate
- Netlify and Vercel: Auto-renewed
- Self-hosted: Use `certbot auto-renew`

### Troubleshooting

#### Forms Not Submitting
1. Verify Formspree Form ID is correct
2. Check browser console for errors
3. Verify your network allows outbound HTTPS to formspree.io

#### Analytics Not Working
1. Verify Google Analytics ID format (G-XXXXXXXXXX)
2. Check that script is not blocked by browser extensions
3. Wait 24-48 hours for initial data to appear

#### 404 Errors on Deploy
1. Verify all files are uploaded
2. Check .htaccess is present
3. Verify error pages are configured correctly

#### HTTPS Not Working
1. Verify SSL certificate is installed
2. Update all HTTP links to HTTPS
3. Check domain registrar DNS settings

## Environment Variables (.env)

See `.env.example` for all available configuration options. Never commit `.env` to version control.

## Performance Optimization Tips

1. **Image Optimization**: All images should be WebP format or compressed PNG/JPG
2. **CSS/JS Minification**: Consider minifying for production
3. **CDN**: Use a CDN for faster global delivery
4. **Caching**: Configure cache headers in `.htaccess` or platform settings
5. **Lazy Loading**: Implement for images and heavy content

## Security Best Practices

1. Keep `.env` files secure and never commit to version control
2. Regularly update dependencies and frameworks
3. Monitor for security vulnerabilities
4. Use HTTPS everywhere
5. Set proper CORS headers if needed
6. Validate all form inputs server-side
7. Keep backups of all critical data

## Support

For deployment issues or questions, contact: support@midwesthealthcarestaffing.com
