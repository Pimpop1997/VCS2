# BergDotBet Admin Panel

A comprehensive multi-feature admin panel for BergDotBet with user management, credit system, social media features, and pet-based ecosystem.

## Features

### Core Systems
- **User Management** - Complete admin panel for user registration, authentication, and role management
- **Credit Wallet System** - Digital wallet with transactions, transfers, and balance management
- **Social Media Platform** - Posts, comments, likes/dislikes system
- **Chat & Messaging** - Real-time messaging system with private and public rooms
- **Loan Request System** - Credit loan applications with approval workflow
- **Shop & Items** - Virtual item store with inventory management
- **Virtual Pet System** - Pet care simulation with rewards

### Technical Stack
- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Session-based auth with bcrypt
- **Deployment**: Railway, Vercel ready

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bergdotbet-admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   DATABASE_URL=your_supabase_connection_string
   NODE_ENV=development
   ```

4. **Run database migrations**
   ```bash
   npx drizzle-kit push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Deployment

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables:
   - `DATABASE_URL`
   - `NODE_ENV=production`
3. Deploy automatically

### Vercel Deployment
1. Import project to Vercel
2. Set environment variables
3. Deploy with `npm run build`

## Default Accounts

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Administrator

### Demo Account
- **Username**: `demo`
- **Password**: `demo123`
- **Role**: User
- **Initial Credit**: 5,000 THB

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Admin Dashboard
- `GET /api/admin/dashboard-stats` - System statistics
- `GET /api/admin/users` - User management
- `PATCH /api/admin/users/:id/status` - Update user status

### Credit System
- `GET /api/wallet/:userId` - Get wallet balance
- `POST /api/wallet/transfer` - Transfer credits
- `GET /api/transactions/:userId` - Transaction history

### Social Features
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `POST /api/posts/:id/comments` - Add comment
- `POST /api/posts/:id/like` - Like/dislike post

## Database Schema

The application uses 13 main tables:
- `users` - User accounts and profiles
- `credit_wallets` - Digital wallet system
- `credit_transactions` - Financial transactions
- `posts` - Social media posts
- `comments` - Post comments
- `post_likes` - Like/dislike system
- `messages` - Chat messages
- `login_logs` - Authentication logs
- `loan_requests` - Credit loan applications
- `shop_items` - Virtual store items
- `user_items` - User inventory
- `user_active_items` - Active item effects
- `pets` - Virtual pet system

## Configuration Files

- `vercel.json` - Vercel deployment configuration
- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Nixpacks build configuration
- `Dockerfile` - Container configuration
- `drizzle.config.ts` - Database ORM configuration

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Input validation with Zod
- SQL injection protection with Drizzle ORM
- Environment variable protection

## Monitoring & Logging

- Request/response logging
- Error handling middleware
- Health check endpoints
- Performance monitoring ready

## Thai Language Support

Complete Thai language interface including:
- Admin panel in Thai
- Error messages in Thai
- User feedback in Thai
- Number formatting for Thai Baht

## License

MIT License

## Support

For deployment issues, check the deployment guides:
- `RAILWAY_DEPLOYMENT_GUIDE.md`
- `VERCEL_DEPLOYMENT_GUIDE.md`
- `DEPLOYMENT_SECRETS.md` (for production setup)