# 🔄 How to Redeploy Your Site on Netlify

Your site is live but you need to redeploy to update it with all the latest changes!

## Steps to Redeploy (2 minutes):

### **Option 1: Drag & Drop (Easiest)**
1. Go to https://app.netlify.com
2. Find your project "gentle-dango-440075"
3. Scroll down to "Deploys" section
4. Look for "Drag to deploy a folder"
5. Drag your entire "vidhya code" folder here
6. Wait for deployment (5-10 seconds)
7. Your site updates automatically! ✅

### **Option 2: Connect GitHub (Automatic)**
1. Push all your files to GitHub
2. Go to Netlify → Your project
3. Go to "Site settings" → "Build & deploy"
4. Click "Connect repository"
5. Select your GitHub repo
6. Click "Deploy"
7. Every time you push to GitHub, it auto-deploys! ✅

### **Option 3: Using Netlify CLI (Advanced)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# In your project folder
cd "/Users/rajnath/Documents/classroom/vidhya code"

# Deploy
netlify deploy --prod
```

---

## ✅ After Redeploying

1. Go to your live URL: https://gentle-dango-440075.netlify.app
2. Hard refresh (Cmd+Shift+R on Mac)
3. Clear cache
4. Try login again

**Test Admin Login:**
- Email: admin@vidhyacode.com
- Password: admin@123

---

## 🚨 Common Issues & Fixes

### **CSS Not Loading**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Check DevTools (F12) for CSS errors

### **Can't Login**
- Check email/password exactly
- Admin: `admin@vidhyacode.com` / `admin@123`
- Try new user registration first
- Check console (F12) for JS errors

### **Files Not Updating**
- You may need to redeploy
- Netlify caches files
- Hard refresh browser
- Try incognito/private mode

---

## 📋 Redeploy Checklist

Before redeploying, verify:
- [ ] All HTML files in folder
- [ ] css/style.css file present
- [ ] js/main.js file present
- [ ] logo.png in root folder
- [ ] All .html files have viewport meta tag

---

**Need help? Follow Option 1 (Drag & Drop) - it's the easiest!**
