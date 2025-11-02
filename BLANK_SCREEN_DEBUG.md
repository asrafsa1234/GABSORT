# 🔍 Blank Screen Debugging Guide

## Current Status

I've made several fixes to address the blank screen issue:

### ✅ Fixes Applied

1. **Removed Importmap** - Removed conflicting importmap from `index.html`
2. **Added Error Boundary** - Catches React errors and shows friendly message
3. **Fixed Build Configuration** - Proper base path and asset handling
4. **Added Debug Logging** - Console logs to help diagnose issues

### 🔍 How to Debug on Vercel

1. **Open Browser Console (F12)**
   - Go to your Vercel deployment URL
   - Press F12 to open Developer Tools
   - Click on "Console" tab
   - Look for:
     - Red error messages
     - "Root element:" log message
     - Any script loading errors

2. **Check Network Tab**
   - In Developer Tools, go to "Network" tab
   - Reload the page
   - Look for:
     - `index.html` - should load with status 200
     - `index-*.js` - should load with status 200
     - Any failed requests (status 404, 500, etc.)

3. **Check Vercel Logs**
   - Go to Vercel Dashboard
   - Click on your project
   - Go to "Deployments"
   - Click on latest deployment
   - Check "Build Logs" for errors
   - Check "Function Logs" for API errors

### 🐛 Common Causes

1. **Assets Not Loading**
   - Check Network tab for 404 errors on JS files
   - Verify `vercel.json` has correct routing

2. **JavaScript Errors**
   - Check Console for red errors
   - Error Boundary should catch React errors

3. **CORS Issues**
   - Check Console for CORS errors
   - API calls might be blocked

4. **Theme Provider Issues**
   - Check if `useTheme` hook is causing errors
   - Verify localStorage is accessible

### 📝 What to Check Next

After deploying, please check:

1. **Browser Console Output:**
   ```
   Root element: <div id="root">...</div>
   ```
   If this doesn't appear, the HTML isn't loading.

2. **Script Loading:**
   - Check Network tab
   - Verify `index-*.js` file loads successfully
   - Status should be 200 (not 404)

3. **React Errors:**
   - Error Boundary should catch and display errors
   - If you see the error screen, check the error message

4. **Vercel Configuration:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `.` (not `/`)

### 🔧 Quick Fixes to Try

1. **Clear Vercel Cache:**
   - Vercel Dashboard → Settings → General
   - Clear build cache
   - Redeploy

2. **Check Asset Paths:**
   - Verify `vite.config.ts` has `base: '/'`
   - Check that `dist/index.html` uses relative paths

3. **Verify Environment Variables:**
   - Make sure `GEMINI_API_KEY` is set
   - Redeploy after adding env vars

### 📞 If Still Blank

If the screen is still blank after these fixes:

1. **Share Browser Console Output:**
   - Screenshot of Console tab
   - Any red error messages

2. **Share Network Tab:**
   - Screenshot showing loaded files
   - Status codes for each request

3. **Share Vercel Build Logs:**
   - Copy build log output
   - Check for any errors during build

### 🎯 Expected Behavior

After fixes:
- ✅ App loads without blank screen
- ✅ Error Boundary catches any React errors
- ✅ Console shows "Root element:" log
- ✅ Network tab shows successful asset loads

---

**Last Updated:** After adding ErrorBoundary and debug logging
**Next Step:** Deploy and check browser console for specific errors

