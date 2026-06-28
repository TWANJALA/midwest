# Midwest Healthcare Staffing Agency Website

A modern, responsive, enterprise-style website for an international healthcare staffing agency.

This project includes a multi-page routed experience (static HTML routes) with dedicated pages for key navigation areas. The site is production-ready with comprehensive error handling, security features, SEO optimization, and form integration.

## 📋 Quick Start

### Local Development

**Option 1: Direct Browser**
Open `index.html` directly in your browser.

**Option 2: Local Web Server**
```bash
cd /path/to/project
python3 -m http.server 5500
```
Then open http://localhost:5500

### Project Structure

```
.
├── index.html                    # Homepage
├── about.html                    # About page
├── international-nurses.html     # International nurses
├── healthcare-employers.html     # Employers section
├── healthcare-professionals.html # Healthcare professionals
├── non-medical-caregivers.html  # Non-medical caregivers
├── countries.html                # Countries overview
├── immigration-visa-services.html # Immigration services
├── credentialing.html            # Credentialing services
├── training-academy.html         # Training programs
├── open-positions.html           # Job listings
├── success-stories.html          # Client success stories
├── resources.html                # Resource center
├── blog.html                     # Blog
├── faq.html                      # FAQ
├── contact.html                  # Contact form
├── candidate-portal.html         # Candidate portal
├── employer-portal.html          # Employer portal
├── apply-now.html                # Application form
├── privacy.html                  # Privacy policy
├── terms.html                    # Terms of service
├── 404.html                      # 404 error page
├── error.html                    # 500 error page
├── styles.css                    # Shared styling
├── script.js                     # Shared JavaScript
├── robots.txt                    # Search engine robots
├── sitemap.xml                   # XML sitemap
├── .htaccess                     # Apache security config
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── DEPLOYMENT.md                 # Deployment guide
└── PRODUCTION-CHECKLIST.md       # Production readiness
```

## 🚀 Features

### Design & UX
- Modern healthcare-focused visual system with enterprise styling
- Fully responsive design (mobile, tablet, desktop)
- Animated metrics and reveal micro-animations
- Interactive world recruitment map points
- Smooth navigation and page transitions
- Professional color palette and typography

### Core Sections
- Comprehensive navigation across all key service areas
- Searchable jobs demo with filters
- AI feature demo modules (candidate matching, credentialing alerts, forecasting)
- Candidate portal and employer portal sections
- FAQ accordion and resource/blog blocks
- Multi-page routing with intuitive navigation

### Production Ready
- ✅ Error pages (404, 500)
- ✅ Legal pages (Privacy Policy, Terms of Service)
- ✅ Security headers (.htaccess)
- ✅ SEO optimization (robots.txt, sitemap.xml)
- ✅ Form integration (Formspree)
- ✅ Analytics setup (Google Analytics)
- ✅ Environment configuration (.env)
- ✅ Deployment documentation

### Security Features
- HTTPS redirect (enforced via .htaccess)
- X-Frame-Options (clickjacking protection)
- X-XSS-Protection enabled
- X-Content-Type-Options (MIME sniffing protection)
- Content-Security-Policy configured
- Cache control headers
- Directory listing disabled
- Sensitive files protected

### SEO Features
- Proper meta tags (title, description, keywords)
- XML sitemap for search engines
- robots.txt for crawler control
- Semantic HTML structure
- Mobile-friendly design
- Fast load times
- Structured data support

## 🛠 Configuration

### Before Deployment

1. **Set Up Form Handling (Formspree)**
   ```
   1. Go to https://formspree.io/
   2. Create contact form → get Form ID
   3. Update contact.html: action="https://formspree.io/f/YOUR_FORM_ID"
   4. Create application form → get Form ID
   5. Update apply-now.html: action="https://formspree.io/f/YOUR_FORM_ID"
   ```

2. **Set Up Analytics (Google Analytics)**
   ```
   1. Go to https://analytics.google.com/
   2. Create new property
   3. Get Measurement ID (G-XXXXXXXXXX)
   4. Search all .html files for "G-XXXXXXXXXX" and replace with your ID
   ```

3. **Update Domain References**
   ```
   Search and replace in:
   - sitemap.xml
   - robots.txt
   - .env file
   - Replace: midwesthealthcarestaffing.com with your domain
   ```

4. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

### Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions for:
- Netlify (Recommended)
- Vercel
- AWS S3 + CloudFront
- Self-hosted Apache

### Production Checklist

See [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) for:
- Pre-launch checklist
- Configuration steps
- Testing procedures
- Post-launch monitoring

## 📊 Analytics & Monitoring

The site includes Google Analytics integration for tracking:
- User traffic and engagement
- Page performance
- Conversion tracking
- User demographics and behavior

Configure your Google Analytics ID in all HTML files (search for `G-XXXXXXXXXX`).

## 📝 Forms & Integrations

### Contact Form
- Located on contact.html
- Integrated with Formspree for serverless form handling
- Requires Formspree Form ID configuration

### Application Form
- Located on apply-now.html
- Collects professional information
- Integrated with Formspree
- Includes referral program

### Email Notifications
Configure email notifications in Formspree dashboard to receive:
- Contact inquiries
- Job applications
- Referral submissions

## 🔒 Privacy & Legal

- **Privacy Policy**: [privacy.html](privacy.html)
- **Terms of Service**: [terms.html](terms.html)
- **Compliance**: GDPR, CCPA, and international standards considered

## 🧪 Testing

### Manual Testing Checklist
```
✓ All internal links work
✓ Forms submit successfully
✓ Error pages display correctly
✓ Mobile responsiveness verified
✓ Analytics tracking works
✓ Security headers present
✓ HTTPS redirects work
✓ Performance acceptable
```

### Automated Testing Tools
- Google PageSpeed Insights
- GTmetrix
- Security Headers Check
- WAVE Accessibility Checker

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Customization

### Colors & Branding
Edit `styles.css` to customize:
- Primary colors
- Typography
- Spacing and layout
- Component styles

### Content Updates
- Update individual .html files for content changes
- All pages share common navigation (renderGlobalNavigation in script.js)
- All pages share common footer (renderGlobalFooter in script.js)

### Adding New Pages
1. Create new .html file
2. Copy template from existing page
3. Add Google Analytics script
4. Add to navigation in script.js (renderGlobalNavigation function)
5. Add to sitemap.xml

## 🚨 Troubleshooting

### Forms Not Working
- Verify Formspree Form ID is correct
- Check browser console for errors
- Ensure HTTPS is being used
- Verify network allows formspree.io

### Analytics Not Showing
- Verify Google Analytics ID format
- Wait 24-48 hours for data to appear
- Check Analytics dashboard
- Verify script is not blocked

### 404 Errors
- Verify all files are uploaded
- Check .htaccess is present
- Verify error pages configured
- Check file permissions

See [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting) for more troubleshooting tips.

## 📞 Support

- **Technical**: support@midwesthealthcarestaffing.com
- **General Inquiries**: partnerships@midwesthealthcarestaffing.com
- **Emergency**: +1 (800) 555-9000

## 📄 Files Summary

- `index.html`, `.html` files: Multi-page website content
- `styles.css`: Shared theme and responsive design system
- `script.js`: Shared interactions, navigation, and demo logic
- `robots.txt`: Search engine crawler rules
- `sitemap.xml`: XML sitemap for SEO
- `.htaccess`: Apache security and performance configuration
- `.env.example`: Environment variables template
- `.gitignore`: Git ignore rules
- `DEPLOYMENT.md`: Complete deployment guide
- `PRODUCTION-CHECKLIST.md`: Launch preparation checklist

## 📦 Deployment Status

**Current Status**: ✅ Production Ready (with configuration)

**Next Steps**:
1. Configure Formspree Form IDs
2. Configure Google Analytics ID
3. Update domain references
4. Choose hosting platform
5. Deploy and monitor

See [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) for detailed pre-launch checklist.

## 🤝 Contributing

For updates to the website:
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Update CHANGELOG if major changes

## 📜 License

© 2026 Midwest Healthcare Staffing Agency. All rights reserved.

---

**Last Updated**: June 28, 2026
**Version**: 1.0 - Production Ready

