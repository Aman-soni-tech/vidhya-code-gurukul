# 🧪 Demo Testing Guide - Vidhya Code Gurukul

## Test Account Credentials

### Admin Account
```
Email: admin@vidhyacode.com
Password: admin@123
```
✅ Has access to: Add Results, Search Results, Delete Results, Admin Badge

### Regular User Account
```
Create new account by clicking "Sign Up" on login page
Example:
  Name: John Doe
  Email: john@example.com
  Phone: +91 9876543210
  Password: Test@123
```
✅ Can view results but cannot add/delete

---

## 📋 Testing Checklist

### **1. Authentication Pages**
- [ ] Login page loads correctly
- [ ] Registration form validates input
- [ ] "Remember Me" checkbox works
- [ ] Admin credentials work
- [ ] User credentials work
- [ ] Invalid credentials show error

### **2. Navigation & Responsiveness**
- [ ] Navbar displays on all pages
- [ ] Navigation links work
- [ ] Works on desktop
- [ ] Works on tablet
- [ ] Works on mobile (< 480px)
- [ ] Logout redirects to login

### **3. Dashboard**
- [ ] Welcome message displays
- [ ] All navigation links present
- [ ] Footer displays correctly
- [ ] Images load properly

### **4. Courses Page**
- [ ] 5 course cards display
- [ ] Card hover effects work
- [ ] Enroll button functional
- [ ] Responsive grid layout

### **5. Batches Page**
- [ ] 5 batch cards display
- [ ] Batch times show correctly
- [ ] Register button functional
- [ ] Responsive on all devices

### **6. Promotions Page** (If Feature Enabled)
- [ ] Add promotion form works
- [ ] Upload banner functionality
- [ ] Featured offers display
- [ ] Delete promotion works

### **7. Results Page** (Admin Testing)
- [ ] Admin sees "Add Result" form
- [ ] Admin sees search filters
- [ ] Add result form validates
- [ ] Results save to localStorage
- [ ] Search filters work
- [ ] Course filter works
- [ ] Batch filter works
- [ ] Delete result works
- [ ] Statistics calculate correctly
- [ ] Admin badge displays

### **8. Results Page** (User Testing)
- [ ] Form hidden from regular users
- [ ] Can view their results
- [ ] Search/filter hidden
- [ ] Cannot delete results
- [ ] No admin badge shown

### **9. Contact Page**
- [ ] Contact information displays
- [ ] Phone/email visible
- [ ] Footer links work

### **10. Mobile Responsiveness**
- [ ] Test on iPhone (375px width)
- [ ] Test on Android (360px width)
- [ ] Test on iPad (768px width)
- [ ] Navbar adapts to small screens
- [ ] Forms are touch-friendly
- [ ] Images scale properly
- [ ] Text is readable
- [ ] No horizontal scrolling

---

## 🎬 Demo Flow for Visitors

### **Scenario 1: New User Registration**
1. Visit homepage
2. Click "Sign Up" link
3. Fill registration form
4. Click Register
5. Login with new credentials
6. View dashboard

### **Scenario 2: Admin Adding Results**
1. Login with admin credentials
2. Go to Results page
3. Fill "Add Student Result" form
4. Submit
5. See result in list
6. Search/filter results
7. Delete a result

### **Scenario 3: User Viewing Results**
1. Login with regular user
2. Go to Results page
3. See results (if any)
4. Form not visible
5. Cannot delete results

### **Scenario 4: Browse Courses**
1. Go to Courses page
2. See 5 programming courses
3. Click "Enroll Now"
4. See alert confirmation

### **Scenario 5: Mobile Experience**
1. Open site on mobile
2. Navbar collapses properly
3. Content is readable
4. Forms work on touch
5. Navigation smooth

---

## 📱 Browser Testing

### Desktop
- Chrome (latest)
- Firefox (latest)
- Safari (if on Mac)
- Edge (Windows)

### Mobile
- Chrome Mobile
- Safari iOS
- Samsung Internet
- Firefox Mobile

---

## 🔍 Performance Testing

### Speed Benchmarks
```
Target Load Time: < 3 seconds
Target First Paint: < 1 second
Target Largest Contentful Paint: < 2.5 seconds
```

### Test Tools
1. Google PageSpeed: https://pagespeed.web.dev/
2. GTmetrix: https://gtmetrix.com/
3. WebPageTest: https://www.webpagetest.org/

### Lighthouse Scores Target
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 🐛 Common Issues & Fixes

### **Images Not Loading**
- Check image path (should be `logo.png`, not `../assets/logo.png`)
- Ensure logo.png exists in root folder

### **Data Not Persisting**
- Check browser localStorage enabled
- Clear cache and reload
- Try incognito mode

### **Forms Not Working**
- Check browser console for JavaScript errors
- Ensure main.js is loaded
- Check form input IDs match JavaScript

### **Mobile Layout Broken**
- Check viewport meta tag present
- Test in responsive design mode
- Check CSS media queries
- Clear browser cache

### **Navbar Not Fixed**
- Ensure CSS loads properly
- Check z-index values
- Try hard refresh (Ctrl+Shift+R)

---

## 📊 Demo Data to Add

### Sample Student Results (as Admin):
1. **Student:** Raj Kumar | Roll: 101 | Course: Java | Marks: 85/100 (85%) ✓ PASS
2. **Student:** Priya Singh | Roll: 102 | Course: Python | Marks: 65/100 (65%) ✗ FAIL
3. **Student:** Ahmed Khan | Roll: 103 | Course: C++ | Marks: 92/100 (92%) ✓ PASS
4. **Student:** Neha Patel | Roll: 104 | Course: Web Dev | Marks: 78/100 (78%) ✓ PASS
5. **Student:** David Lee | Roll: 105 | Course: C Language | Marks: 55/100 (55%) ✗ FAIL

---

## 💾 Backup Data Before Deployment

```javascript
// Run in browser console to export data:
console.log(JSON.stringify(localStorage))

// Save the output to a text file for backup
```

---

## ✅ Deployment Checklist

Before going live:
- [ ] All pages tested on desktop
- [ ] All pages tested on mobile
- [ ] Login/register working
- [ ] Navigation complete
- [ ] Images loading
- [ ] Forms submitting
- [ ] Data persisting
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Demo data added

---

## 🎯 Ready to Demo?

1. ✅ Ensure all files in project folder
2. ✅ Run quick local test
3. ✅ Choose deployment platform
4. ✅ Deploy
5. ✅ Send link to friends/reviewers
6. ✅ Ask for feedback

**Happy Demoing! 🎉**
