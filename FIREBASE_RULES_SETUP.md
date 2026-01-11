# 🔐 Firebase Rules Setup

## Why This is Needed

Firebase has security rules that control who can read/write data. Currently it's probably in "Test Mode" which only allows temporary access.

## How to Fix It

### Step 1: Go to Firebase Rules
1. Go to: https://console.firebase.google.com/
2. Click "vidhya-code" project
3. Click "Realtime Database" (left menu)
4. Click "Rules" tab (top)

### Step 2: Replace the Rules

Delete everything and paste this:

```json
{
  "rules": {
    "studentResults": {
      ".read": true,
      ".write": true,
      ".validate": "newData.hasChild('name') && newData.hasChild('rollNumber') && newData.hasChild('marks')"
    },
    "$other": {
      ".read": false,
      ".write": false
    }
  }
}
```

### Step 3: Publish Rules

Click "Publish" button (blue button, top right)

You should see: ✅ "Rules updated successfully"

---

## What These Rules Do

- ✅ Everyone can READ student results
- ✅ Everyone can WRITE (add) new results
- ✅ Data must have name, rollNumber, and marks fields
- ❌ No other data can be written

---

## After Publishing

1. Refresh your website
2. Try adding a result again
3. Check Firebase console -> Data tab
4. Should see `studentResults` folder with your data

---

## If It Still Doesn't Work

Open browser console (F12) and look for error messages. Take a screenshot and share the error.

