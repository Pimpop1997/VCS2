# คู่มือการ Deploy BergDotBet Admin Panel บน Railway

## ขั้นตอนการ Deploy

### 1. เตรียมโปรเจค
โปรเจคได้รับการกำหนดค่าสำหรับ Railway แล้ว:
- `railway.json` - การกำหนดค่า deployment
- `Dockerfile` - สำหรับ containerization
- ปรับแต่ง server routes สำหรับ Railway environment

### 2. สร้างบัญชี Railway
1. ไปยัง [railway.app](https://railway.app)
2. สมัครสมาชิกด้วย GitHub account
3. เชื่อมต่อ repository นี้

### 3. การ Deploy
1. **New Project** ใน Railway dashboard
2. **Deploy from GitHub repo** เลือก repository นี้
3. **ตั้งค่า Environment Variables:**
   ```
   DATABASE_URL=your_supabase_connection_string
   NODE_ENV=production
   PORT=3000
   ```
4. Railway จะ auto-deploy ทันที

### 4. การตั้งค่าเพิ่มเติม
- Build Command: `npm run build`
- Start Command: `npm run start`
- Port: จะใช้ตัวแปร $PORT ที่ Railway กำหนดให้

### 5. ตรวจสอบการทำงาน
หลัง deploy สำเร็จ:
1. ทดสอบ API endpoints ที่ `/api/`
2. ตรวจสอบการเชื่อมต่อฐานข้อมูล
3. ล็อกอินด้วย admin account

### 6. Custom Domain (ตัวเลือก)
- ไปที่ Settings > Domains
- เพิ่ม custom domain ของคุณ
- ตั้งค่า DNS records ตามที่ Railway แนะนำ

## การเข้าใช้งาน
- **Admin:** `admin` / `admin123`
- **Demo User:** `demo` / `demo123`

## ฟีเจอร์หลักของแอปพลิเคชัน
- ระบบจัดการผู้ใช้และแอดมิน (Thai language support)
- ระบบเครดิตและกระเป๋าเงิน
- ระบบโซเชียลมีเดีย (โพสต์, คอมเมนต์, ไลค์)
- ระบบแชทและข้อความ
- ระบบสินเชื่อและ loan requests
- ระบบร้านค้าและไอเทม
- ระบบสัตว์เลี้ยงเสมือน

## การแก้ไขปัญหา
หากเกิดปัญหา:
1. ตรวจสอบ Deploy Logs ใน Railway dashboard
2. ตรวจสอบ Environment Variables
3. ตรวจสอบ Supabase connection string
4. ตรวจสอบ Health Check ที่ `/api/admin/auth`

## ข้อดีของ Railway
- การ deploy ง่ายและรวดเร็ว
- รองรับ auto-scaling
- มี free tier สำหรับการทดสอบ
- รองรับ custom domains
- Integrated monitoring และ logging