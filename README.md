# BergDotBet B.B - แพลตฟอร์มโซเชียลมีเดียและแผงควบคุมผู้ดูแลระบบ

## 📋 ภาพรวมโปรเจ็กต์

BergDotBet B.B เป็นแพลตฟอร์มโซเชียลมีเดียแบบครบครันที่มาพร้อมระบบแผงควบคุมผู้ดูแลระบบขั้นสูง รองรับการจัดการผู้ใช้ ระบบกระเป๋าเงิน ร้านค้า สัตว์เลี้ยงเสมือน และคำขอสินเชื่อ

## 🚀 ฟีเจอร์หลัก

### 👥 การจัดการผู้ใช้
- ระบบสมัครสมาชิกและเข้าสู่ระบบที่ปลอดภัย
- การจัดการโปรไฟล์ผู้ใช้
- ระบบสิทธิ์ผู้ดูแลระบบ
- ติดตามประวัติการเข้าสู่ระบบ

### 💰 ระบบกระเป๋าเงิน
- กระเป๋าเงินดิจิทัลสำหรับแต่ละผู้ใช้
- การโอนเครดิตระหว่างผู้ใช้
- ประวัติธุรกรรมแบบละเอียด
- ระบบรายงานการเงิน

### 🛒 ร้านค้าเสมือน
- ไอเทมหลากหลายประเภท (ธีม, ไอคอน, แบดจ์, เฟรม)
- ระบบความหายากของไอเทม
- การจัดการสินค้าคงคลัง
- ระบบซื้อขายแบบเรียลไทม์

### 🐾 ระบบสัตว์เลี้ยงเสมือน
- สร้างและดูแลสัตว์เลี้ยง
- ระบบเลเวลและประสบการณ์
- กิจกรรมให้อาหาร เล่น และพัก
- รางวัลเครดิตจากการดูแลสัตว์เลี้ยง

### 📱 โซเชียลมีเดีย
- โพสต์ข้อความและรูปภาพ
- ระบบคอมเมนต์และไลค์
- ฟีดข่าวแบบเรียลไทม์
- การแชทส่วนตัวและกลุ่ม

### 💳 ระบบสินเชื่อ
- คำขอสินเชื่อออนไลน์
- การประเมินสิทธิ์อัตโนมัติ
- ติดตามสถานะการอนุมัติ
- ระบบชำระคืนและดอกเบี้ย

### 🛠️ แผงควบคุมผู้ดูแลระบบ
- ภาพรวมสถิติระบบ
- จัดการผู้ใช้และสิทธิ์
- ติดตามธุรกรรมการเงิน
- ประวัติการเข้าสู่ระบบ
- จัดการร้านค้าและไอเทม

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/UI** - Component Library
- **TanStack Query** - Data Fetching
- **Wouter** - Client-side Routing
- **React Hook Form** - Form Management

### Backend
- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **TypeScript** - Type Safety
- **Drizzle ORM** - Database ORM
- **Bcrypt** - Password Hashing
- **Zod** - Schema Validation

### ฐานข้อมูล
- **PostgreSQL** - ฐานข้อมูลหลัก
- **Supabase** - Database Hosting

### การ Deploy
- **Vercel** - Hosting Platform
- **GitHub** - Version Control

## 📁 โครงสร้างโปรเจ็กต์

```
bergdotbet-admin/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── pages/          # Page Components
│   │   ├── hooks/          # Custom Hooks
│   │   ├── lib/            # Utility Functions
│   │   └── modules/        # Feature Modules
│   └── index.html
├── server/                 # Backend Application
│   ├── index.ts           # Main Server File
│   ├── routes.ts          # API Routes
│   ├── storage.ts         # Database Operations
│   └── vite.ts            # Vite Configuration
├── shared/                 # Shared Types & Schemas
│   └── schema.ts          # Database Schema
├── migrations/             # Database Migrations
├── docs/                   # Documentation
├── vercel.json            # Vercel Configuration
└── deploy-instructions.md  # Deployment Guide
```

## 🚀 การติดตั้งและรัน

### ข้อกำหนดเบื้องต้น
- Node.js 18 หรือสูงกว่า
- PostgreSQL Database (Supabase)
- npm หรือ yarn

### การติดตั้ง
```bash
# Clone repository
git clone <repository-url>
cd bergdotbet-admin

# ติดตั้ง dependencies
npm install

# ตั้งค่า environment variables
cp .env.example .env
# แก้ไข .env ด้วยข้อมูลฐานข้อมูลของคุณ

# รัน database migrations
npm run db:push

# เริ่มเซิร์ฟเวอร์ development
npm run dev
```

### ตัวแปรสภาพแวดล้อม
```env
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your-64-character-random-string
NODE_ENV=development
```

## 👤 บัญชีผู้ดูแลระบบเริ่มต้น

- **ชื่อผู้ใช้**: admin
- **รหัสผ่าน**: admin123
- **สิทธิ์**: ผู้ดูแลระบบ

⚠️ **สำคัญ**: เปลี่ยนรหัสผ่านเริ่มต้นทันทีหลังจาก deploy

## 📊 ฐานข้อมูล

### ตารางหลัก
- `users` - ข้อมูลผู้ใช้
- `credit_wallets` - กระเป๋าเงินดิจิทัล
- `credit_transactions` - ประวัติธุรกรรม
- `posts` - โพสต์โซเชียลมีเดีย
- `comments` - ความคิดเห็น
- `messages` - ข้อความแชท
- `shop_items` - สินค้าในร้าน
- `pets` - สัตว์เลี้ยงเสมือน
- `loan_requests` - คำขอสินเชื่อ

## 🔒 ความปลอดภัย

- การเข้ารหัสรหัสผ่านด้วย bcrypt
- การตรวจสอบสิทธิ์แบบ session-based
- การป้องกัน XSS และ SQL Injection
- การตรวจสอบข้อมูลด้วย Zod Schema
- HTTPS บังคับใช้ใน production

## 📈 การติดตาม

- สถิติผู้ใช้แบบเรียลไทม์
- การติดตามธุรกรรมการเงิน
- ประวัติการเข้าสู่ระบบ
- รายงานการใช้งานระบบ

## 🤝 การมีส่วนร่วม

1. Fork โปรเจ็กต์
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📞 การสนับสนุน

หากพบปัญหาหรือมีคำถาม:
- เปิด Issue ใน GitHub Repository
- ตรวจสอบ Documentation ใน `/docs`
- ดูคู่มือการ Deploy ใน `deploy-instructions.md`

## 📄 License

โปรเจ็กต์นี้อยู่ภายใต้ MIT License - ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียด

## 🏗️ สถานะการพัฒนา

- ✅ ระบบผู้ใช้และการยืนยันตัวตน
- ✅ แผงควบคุมผู้ดูแลระบบ
- ✅ ระบบกระเป๋าเงินและการเงิน
- ✅ ร้านค้าและระบบซื้อขาย
- ✅ โซเชียลมีเดียและการแชท
- ✅ ระบบสัตว์เลี้ยงเสมือน
- ✅ ระบบคำขอสินเชื่อ
- ✅ ความปลอดภัยและการป้องกัน
- ✅ Responsive Design
- ✅ Production Ready

---

สร้างด้วย ❤️ สำหรับชุมชน BergDotBet