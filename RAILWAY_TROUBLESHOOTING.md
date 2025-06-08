# Railway Deployment Troubleshooting

## แก้ไขปัญหา 404 Error

### 1. ตรวจสอบ Environment Variables
ใน Railway dashboard:
- `DATABASE_URL` - connection string จาก Supabase
- `NODE_ENV=production`
- `PORT` - Railway จะตั้งให้อัตโนมัติ

### 2. ตรวจสอบ Build Status
1. ไปที่ Deployments tab
2. คลิก deployment ล่าสุด
3. ดู build logs และ deploy logs

### 3. ตรวจสอบ Service Settings
1. ใน Settings tab หา "Public Networking"
2. กดปุ่ม "Generate Domain" ถ้ายังไม่มี
3. URL จะเป็นแบบ `*.up.railway.app`

### 4. การ Debug
ใน deployment logs ควรเห็น:
```
🚀 Server is running on http://0.0.0.0:PORT
```

### 5. ขั้นตอนการแก้ไข
1. **Re-deploy Project:**
   - ไปที่ Deployments
   - คลิก "Redeploy" ที่ deployment ล่าสุด

2. **ตรวจสอบ Logs:**
   ```
   npm run build
   npm start
   Server is running on...
   ```

3. **Test API Endpoints:**
   - `https://your-app.up.railway.app/`
   - `https://your-app.up.railway.app/api/admin/dashboard-stats`

### 6. ปัญหาที่พบบ่อย

**Build Failed:**
- ตรวจสอบ `DATABASE_URL` ว่าถูกต้อง
- ตรวจสอบ dependencies ใน package.json

**503 Service Unavailable:**
- รอให้ deployment เสร็จสมบูรณ์
- ตรวจสอบ health check

**404 Not Found:**
- ตรวจสอบ public domain generation
- ตรวจสอบ start command

### 7. Manual Redeploy
ถ้ายังมีปัญหา:
1. ไปที่ project settings
2. เชื่อมต่อ GitHub repository ใหม่
3. Deploy อีกครั้ง