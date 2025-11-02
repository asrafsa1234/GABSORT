# 🚀 Vercel Deployment Setup Guide

## ✅ Issues Fixed

1. **Blank Screen:** Removed importmap from `index.html` that conflicted with Vite production builds
2. **AI Not Working:** Created secure serverless function to handle Google AI API calls
3. **API Key Security:** Moved API key to server-side (Vercel environment variables)

## 📋 Pre-Deployment Checklist

- [x] Removed importmap from index.html
- [x] Created serverless function at `api/analyze-image.ts`
- [x] Updated geminiService to call serverless function
- [x] Added vercel.json configuration
- [x] Fixed vite.config.ts
- [ ] Add GEMINI_API_KEY to Vercel environment variables (see below)

## 🔑 Step 1: Get Your Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or use an existing key
4. Copy your API key (it looks like: `AIzaSy...`)

**⚠️ Important:** Keep this key secret! Never commit it to GitHub.

## 🌐 Step 2: Add API Key to Vercel

1. Go to your Vercel dashboard: https://vercel.com
2. Find your project (ecosort)
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Enter:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** (paste your API key from Step 1)
   - **Environment:** Select all (Production, Preview, Development)
6. Click **"Save"**

## 🔄 Step 3: Redeploy

After adding the environment variable:

1. Go to your project's **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Select **"Redeploy"**
4. Or simply push new code to trigger auto-deploy

## 📁 Project Structure

```
.
├── api/
│   └── analyze-image.ts    # Serverless function (handles Google AI)
├── services/
│   └── geminiService.ts    # Frontend service (calls API)
├── vercel.json              # Vercel configuration
├── vite.config.ts          # Build configuration
└── package.json            # Dependencies
```

## 🔍 How It Works

1. **Frontend** (`services/geminiService.ts`):
   - User uploads image
   - Calls `/api/analyze-image` endpoint
   - Receives analysis result

2. **Backend** (`api/analyze-image.ts`):
   - Receives image data from frontend
   - Uses `GEMINI_API_KEY` from environment variables
   - Calls Google Gemini AI
   - Returns analysis result

3. **Security**:
   - API key stays on server (never exposed to browser)
   - Only serverless function has access to API key
   - Secure HTTPS connection

## 🧪 Testing Locally

To test the serverless function locally:

1. Create `.env.local` file in project root:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Run dev server:
   ```bash
   vercel dev
   ```

4. Visit: http://localhost:3000

## ✅ Verification

After deployment, check:

1. **Blank Screen Fixed:**
   - ✅ App loads on Vercel URL
   - ✅ No console errors about missing modules
   - ✅ All UI elements visible

2. **AI Working:**
   - ✅ Upload an image
   - ✅ See loading indicator
   - ✅ Get analysis results (item name, category, etc.)
   - ✅ Check browser console for any errors

3. **If AI Still Not Working:**
   - Check Vercel function logs (Dashboard → Functions → analyze-image)
   - Verify `GEMINI_API_KEY` is set correctly
   - Check browser console for error messages
   - Ensure you redeployed after adding environment variable

## 🐛 Troubleshooting

### Blank Screen Still Appears?

1. **Check Build Logs:**
   - Vercel Dashboard → Your Deployment → Build Logs
   - Look for errors or warnings

2. **Check Browser Console:**
   - Open your deployed site
   - Press F12 → Console tab
   - Look for red error messages
   - Share error details if needed

3. **Verify Build Output:**
   - Run `npm run build` locally
   - Check `dist/` folder has `index.html` and `assets/`
   - Verify `dist/index.html` doesn't have importmap

### AI Not Working?

1. **Check Environment Variable:**
   - Vercel Dashboard → Settings → Environment Variables
   - Verify `GEMINI_API_KEY` exists and is set correctly
   - Make sure it's available in Production environment

2. **Check Function Logs:**
   - Vercel Dashboard → Your Project → Functions
   - Click on `analyze-image`
   - Check "Logs" tab for errors

3. **Test API Endpoint:**
   - Open browser console on your deployed site
   - Try uploading an image
   - Check Network tab for `/api/analyze-image` request
   - Look at response status and body

4. **Common Errors:**
   - `GEMINI_API_KEY is not configured` → Add environment variable
   - `API error: 403` → Invalid API key or quota exceeded
   - `API error: 429` → Rate limit exceeded
   - `Failed to analyze image` → Check function logs for details

## 📝 Vercel Settings Summary

When deploying, make sure:

- **Framework Preset:** Vite
- **Root Directory:** `.` (root)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x or 20.x (auto-detected)

## 🎉 After Setup

Your app should now:
- ✅ Load without blank screen
- ✅ Display all UI elements correctly
- ✅ Analyze images using Google Gemini AI
- ✅ Work securely with API key hidden on server

## 📞 Need Help?

If issues persist:
1. Check Vercel build logs
2. Check browser console errors
3. Check Vercel function logs
4. Verify environment variable is set
5. Ensure you redeployed after changes

---

**Last Updated:** After fixing blank screen and AI functionality
**Status:** ✅ Ready for deployment with proper API key setup

