# คู่มือการอัปโหลดไปยัง GitHub และ Deploy ไปยัง Vercel

## 📋 ขั้นตอนการเตรียมโค้ด

### 1. ตรวจสอบไฟล์ที่จำเป็น
ตรวจสอบว่ามีไฟล์เหล่านี้ในโปรเจ็กต์:
- ✅ `vercel.json` - การกำหนดค่า Vercel
- ✅ `.gitignore` - ไฟล์ที่ไม่ต้องอัปโหลด
- ✅ `README.md` - เอกสารโปรเจ็กต์
- ✅ `.env.example` - ตัวอย่างตัวแปรสภาพแวดล้อม
- ✅ `deploy-instructions.md` - คู่มือการ deploy

## 🚀 ขั้นตอนการอัปโหลดไปยัง GitHub

### ขั้นตอนที่ 1: สร้าง Repository ใหม่
1. ไปที่ [GitHub](https://github.com)
2. คลิก "New repository"
3. ตั้งชื่อ: `bergdotbet-admin`
4. เลือก "Public" หรือ "Private"
5. ไม่ต้องเลือก "Initialize this repository"
6. คลิก "Create repository"

### ขั้นตอนที่ 2: อัปโหลดโค้ด
```bash
# เริ่มต้น Git repository
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit แรก
git commit -m "🎉 Initial commit: BergDotBet B.B Admin Panel"

# เชื่อมต่อกับ GitHub (แทนที่ YOUR_USERNAME ด้วยชื่อผู้ใช้ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/bergdotbet-admin.git

# ตั้งชื่อ branch หลัก
git branch -M main

# Push ขึ้น GitHub
git push -u origin main
```

## 🌐 ขั้นตอนการ Deploy ไปยัง Vercel

### ขั้นตอนที่ 1: เตรียมฐานข้อมูล Supabase
1. ไปที่ [Supabase Dashboard](https://supabase.com/dashboard/projects)
2. คลิก "New project"
3. ตั้งชื่อโปรเจ็กต์: "BergDotBet Admin"
4. ตั้งรหัสผ่านฐานข้อมูล (จดไว้)
5. เลือก Region ที่ใกล้ที่สุด
6. คลิก "Create new project"

### ขั้นตอนที่ 2: ตั้งค่าฐานข้อมูล
1. ไปที่ "Settings" > "Database"
2. คัดลอก Connection String จาก "Connection pooling"
3. แทนที่ `[YOUR-PASSWORD]` ด้วยรหัสผ่านที่ตั้งไว้
4. ไปที่ "SQL Editor"
5. รันคำสั่ง SQL จากไฟล์ `deploy-instructions.md`

### ขั้นตอนที่ 3: Deploy ไปยัง Vercel
1. ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
2. คลิก "New Project"
3. เลือก "Import Git Repository"
4. เลือก repository `bergdotbet-admin` ที่สร้างไว้
5. กำหนดค่าการ build:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

### ขั้นตอนที่ 4: ตั้งค่า Environment Variables
ใน Vercel Dashboard:
1. ไปที่ "Settings" > "Environment Variables"
2. เพิ่มตัวแปรเหล่านี้:
   - `DATABASE_URL`: Connection string จาก Supabase
   - `SESSION_SECRET`: สตริงสุ่ม 64 ตัวอักษร
   - `NODE_ENV`: `production`

### ขั้นตอนที่ 5: Deploy
1. คลิก "Deploy"
2. รอให้ build เสร็จ (ประมาณ 2-3 นาที)
3. คลิกที่ URL ที่ได้รับ

## 🔧 การแก้ไขปัญหาที่อาจเกิดขึ้น

### ปัญหา Build Failed
```bash
# ตรวจสอบ dependencies
npm install

# ตรวจสอบ TypeScript errors
npm run check

# Build ใน local
npm run build
```

### ปัญหาฐานข้อมูล
1. ตรวจสอบ CONNECTION_STRING ใน Supabase
2. ตรวจสอบว่ารัน SQL script ครบถ้วน
3. ตรวจสอบ Environment Variables ใน Vercel

### ปัญหา Authentication
1. ตรวจสอบ SESSION_SECRET ใน Environment Variables
2. ลองล็อกอินด้วย admin/admin123
3. ตรวจสอบ Network requests ใน Browser DevTools

## 📱 การทดสอบหลัง Deploy

### 1. ทดสอบการล็อกอิน
- ไปที่ `/login`
- ใช้ admin/admin123
- ควรเข้าไปยังหน้า Dashboard

### 2. ทดสอบ API
- ตรวจสอบ Network tab ใน DevTools
- API calls ควรส่งคืน status 200
- ข้อมูลควรโหลดได้ปกติ

### 3. ทดสอบฟีเจอร์
- สร้างผู้ใช้ใหม่
- ทดสอบระบบกระเป๋าเงิน
- ทดสอบร้านค้า
- ทดสอบระบบโพสต์

## 🔄 การอัปเดตโค้ด

```bash
# แก้ไขโค้ด
# ...

# Commit การเปลี่ยนแปลง
git add .
git commit -m "✨ Add new feature"

# Push ไปยัง GitHub
git push origin main

# Vercel จะ auto-deploy ใหม่อัตโนมัติ
```

## 📞 การขอความช่วยเหลือ

หากพบปัญหา:
1. ตรวจสอบ Vercel Build Logs
2. ตรวจสอบ Browser Console
3. ตรวจสอบ Network requests
4. ดู Documentation ใน README.md

## 🎯 URL ที่สำคัญ

หลังจาก deploy เสร็จ:
- **เว็บไซต์**: `https://your-project.vercel.app`
- **แผงแอดมิน**: `https://your-project.vercel.app/admin`
- **Login**: `https://your-project.vercel.app/login`

## 🔐 ข้อมูลการเข้าใช้งาน

- **Username**: admin
- **Password**: admin123
- **สิทธิ์**: Administrator

⚠️ **สำคัญ**: เปลี่ยนรหัสผ่านทันทีหลังจากล็อกอินครั้งแรก!