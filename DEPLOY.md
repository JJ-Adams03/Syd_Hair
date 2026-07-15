# Hair by Syd - Netlify Deployment Guide

## Quick Start

This is a static HTML/CSS/JS site - no build process required. Just drag and drop to Netlify!

---

## What Works Where

| Feature | Local (localhost) | Netlify |
|---------|-------------------|---------|
| All pages & navigation | Yes | Yes |
| Styling & animations | Yes | Yes |
| Vagaro booking links | Yes | Yes |
| Instagram placeholder grid | Yes | Yes |
| SnapWidget Instagram feed | Yes* | Yes |
| Blog pages | Yes | Yes |

*SnapWidget works locally too once you add the embed code

---

## Deployment Steps

### Step 1: Prepare Your Files

Your site structure should look like this:
```
Syd_Hair/
├── index.html
├── blog/
│   ├── index.html
│   ├── hair-extensions-guide.html
│   └── blonde-hair-care.html
├── images/
│   └── (your images here)
└── DEPLOY.md (this file)
```

### Step 2: Deploy to Netlify

**Option A: Drag & Drop (Easiest)**
1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click "Add new site" → "Deploy manually"
3. Drag your entire `Syd_Hair` folder onto the upload area
4. Done! You'll get a random URL like `random-name-123.netlify.app`

**Option B: Connect to GitHub (Recommended for updates)**
1. Push your `Syd_Hair` folder to a GitHub repository
2. In Netlify: "Add new site" → "Import an existing project"
3. Connect your GitHub account and select the repo
4. Build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.` or `/`
5. Click "Deploy site"

### Step 3: Configure Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `hairbysyd.com`
4. Follow the DNS configuration instructions:
   - Add a CNAME record pointing to your Netlify URL
   - Or use Netlify DNS (recommended)

### Step 4: Enable HTTPS

1. Netlify provides free SSL automatically
2. Go to "Domain settings" → "HTTPS"
3. Click "Verify DNS configuration"
4. Enable "Force HTTPS"

---

## Instagram Feed Setup

The site currently shows placeholder boxes for Instagram. To show real posts:

### Option 1: SnapWidget (Recommended - Free)

1. Go to [snapwidget.com](https://snapwidget.com)
2. Create a free account
3. Click "Create New Widget"
4. Settings:
   - **Username:** syd_hair
   - **Layout:** Grid
   - **Photos:** 6
   - **Columns:** 3 (desktop)
   - **Photo Size:** 200px or larger
   - **Background:** Transparent
5. Click "Get Widget"
6. Copy the embed code
7. In `index.html`, find the comment that says "TO ACTIVATE YOUR INSTAGRAM FEED"
8. Replace the entire `<div class="instagram-placeholder-grid">...</div>` with your SnapWidget code

### Option 2: Behold.so (More features, paid plans)

1. Go to [behold.so](https://behold.so)
2. Similar setup process
3. More customization options available

### Option 3: EmbedSocial (Business features)

1. Go to [embedsocial.com](https://embedsocial.com)
2. Good for businesses needing moderation features

---

## Environment Variables

**None required!** This is a static site with no server-side code.

Your Vagaro booking URL is hardcoded in the HTML, which is fine for a static site.

---

## Build Settings (if using GitHub)

| Setting | Value |
|---------|-------|
| Build command | (none) |
| Publish directory | `.` |
| Node version | Not needed |

---

## Local Testing

To test locally before deploying:

```bash
# Navigate to your site folder
cd /path/to/Syd_Hair

# Start a local server (Python 3)
python -m http.server 8080

# Or with Python 2
python -m SimpleHTTPServer 8080

# Or with Node.js (if installed)
npx serve
```

Then open: http://localhost:8080

---

## Checklist Before Going Live

- [ ] All images added to `/images` folder
- [ ] Replace placeholder author photo in blog posts
- [ ] Update meta descriptions if needed
- [ ] Test all links work (Vagaro, Instagram)
- [ ] Add SnapWidget Instagram embed code
- [ ] Test on mobile device
- [ ] Configure custom domain
- [ ] Enable HTTPS

---

## Updating Your Site

**If using drag & drop:**
- Make changes locally
- Re-upload entire folder to Netlify (it will replace the old version)

**If using GitHub:**
- Make changes locally
- Commit and push to GitHub
- Netlify automatically rebuilds (usually takes 30 seconds)

---

## Troubleshooting

### Images not showing
- Make sure image paths start with `/images/` (with leading slash)
- Check file names match exactly (case-sensitive)

### Links not working
- Test locally first with `python -m http.server`
- Make sure all paths use leading slash for absolute paths

### Instagram feed not loading
- SnapWidget can take a few minutes to sync initially
- Make sure your Instagram account is public
- Check SnapWidget dashboard for any errors

### Custom domain not working
- DNS changes can take up to 48 hours to propagate
- Verify DNS records in Netlify dashboard
- Try clearing browser cache

---

## Support

- **Netlify Docs:** https://docs.netlify.com
- **SnapWidget Help:** https://snapwidget.com/help
- **DNS Checker:** https://dnschecker.org

---

## File Reference

| File | Purpose |
|------|---------|
| `index.html` | Main homepage |
| `hair-extensions/index.html` | Extensions landing page |
| `hair-color/index.html` | Color landing page |
| `wedding-hair/index.html` | Weddings landing page |
| `styles.css` / `script.js` | Shared styles and scripts |
| `sitemap.xml` / `robots.txt` | SEO (submit sitemap in Search Console) |
| `_redirects` | Netlify 301s for old /blog/ URLs |
| `404.html` | Not-found page (Netlify picks it up automatically) |
| `images/` | All site images (use the .webp versions on pages) |
| `DEPLOY.md` | This deployment guide |
