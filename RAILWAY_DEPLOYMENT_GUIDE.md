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
   ```
4. **Generate Domain** ในหน้า Settings > Networking
5. Railway จะ auto-deploy และสร้าง public URL

### วิธีหา Public URL ใน Railway:

**วิธีที่ 1: ใน Project Dashboard**
1. ไปที่ project หลักของคุณ
2. คลิกที่ service ที่ deploy แล้ว
3. ดูที่ service card จะมี URL แสดงอยู่
4. หรือคลิก "Open App" ถ้ามีปุ่มนี้

**วิธีที่ 2: ใน Service Settings**
1. เข้าไปใน service ที่ deploy
2. ไปที่ Settings tab
3. หาส่วน "Public Networking" หรือ "Domains"
4. คลิก "Generate Domain" ถ้ายังไม่มี

**วิธีที่ 3: ใน Deployment Tab**
1. เข้าไป Deployments tab
2. คลิกที่ deployment ล่าสุด
3. ใน deployment details จะมี URL แสดง

**วิธีที่ 4: ถ้ายังไม่มี Public URL**
1. ที่หน้า service หลัก
2. มองหาปุ่ม "Add Public Domain" หรือ "Enable Public Access"
3. Railway จะ auto-generate URL ให้

### หมายเหตุสำคัญ:
- URL `*.railway.internal` เป็น internal URL ไม่สามารถเข้าถึงจากภายนอกได้
- Public URL จะเป็นแบบ `*.up.railway.app`
- หรือตั้งค่า custom domain ของตัวเอง

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