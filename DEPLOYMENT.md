# LeadsVDL Phase 4 - Deployment Guide

## ✅ Status
- **Code**: Ready to deploy (`server.py` - working locally)
- **GitHub**: https://github.com/Prakhars1994/leadsvdl-phase4
- **Tested**: Homepage ✅ | API Search ✅ | Lead Scoring ✅

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended - Free & Fast)
```bash
# 1. Go to https://railway.app
# 2. Create new project
# 3. Connect GitHub: Prakhars1994/leadsvdl-phase4
# 4. Select "Python" environment
# 5. Set PORT environment variable (default 8000)
# 6. Deploy!
```
**Live URL:** Will be assigned by Railway (e.g., https://leadsvdl-phase4.railway.app)

### Option 2: Render (Free Tier Available)
```bash
# 1. Go to https://render.com
# 2. New -> Web Service
# 3. Connect GitHub repo
# 4. Language: Python
# 5. Build command: pip install -r requirements.txt
# 6. Start command: python3 server.py
# 7. Deploy!
```

### Option 3: Vercel
```bash
# 1. Go to https://vercel.com
# 2. New Project -> Import Git Repository
# 3. Select: Prakhars1994/leadsvdl-phase4
# 4. Framework: Other (uses Procfile)
# 5. Deploy!
```

### Option 4: Heroku (Free tier deprecated, paid only)
```bash
heroku login
heroku create leadsvdl-phase4
git push heroku main
heroku open
```

## 📋 What Gets Deployed

```
/
  └─ server.py        (Main HTTP server)
  ├─ requirements.txt  (Dependencies)
  ├─ Procfile         (Launch config)
  └─ templates/       (Static HTML)
```

## 🔍 API Endpoints

- **GET `/`** - Homepage with search UI
- **POST `/api/search`** - Search leads (returns JSON with 2 sample leads)
- **GET `/api/stats`** - System stats (80 total leads)

## 📧 For DIKSHA Demo

Share the deployed URL:
```
https://[your-deployment].railway.app
```

The system includes:
- ✅ LeadsVDL branding (gradient background)
- ✅ Search interface (working)
- ✅ Lead data with scoring (85, 88 - HOT)
- ✅ Contact info (+91 84460 00784, vdldigital.com)
- ✅ October 28-Nov 3 DIKSHA demo note

## 🧪 Local Testing

```bash
cd /tmp/leadsvdl_phase4
python3 server.py
# Visit http://localhost:8000
```

## ✨ Features

- **Homepage**: Gradient UI (#1B5E20 to #C41E3A) with search box
- **Search API**: POST to `/api/search` with `{"query": "..."}` 
- **Lead Results**: Name, Title, Company, Email, Score (0-100)
- **Lead Scoring**: 🔴 HOT (80+) | 🟡 WARM (60-79)
- **Responsive**: Works on mobile, tablet, desktop
- **Zero Dependencies**: Only Python 3 stdlib (no external packages needed)

---

**Ready for DIKSHA Oct 28-Nov 3, 2026 demo!** 🚀
