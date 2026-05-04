
### Project name :
##### FoodHub 🍱 | Advanced Full-Stack Multi-Vendor Food Ordering Platform

### Project description :
##### FoodHub is a modern full-stack multi-vendor food ordering platform where customers can discover meals, place orders, and track deliveries, providers can manage menus and orders, and admins can control users, categories, and platform operations through a secure, responsive, and scalable system.

### Quick Links
 - Frontend Repo    : https://github.com/sujonbiswasdev/frontend-next-level-assignment-4.git
- Backend Repo     :https://github.com/sujonbiswasdev/backend-next-level-assignment-4.git
- Frontend Live    : https://frontend-next-level-assingment-4.vercel.app
- Backend Live     : https://backend-next-level-assignment-4.vercel.app

### 🎨 Design System & UI/UX
- **Multi-Theme System**: Default (Modern SaaS), Midnight (Dark Premium), Emerald (Fresh Startup)
- **Design Tokens**: CSS Variables for consistent theming
- **Responsive Design**: Mobile-first approach with perfect stacking
- **Animations**: Smooth Framer Motion animations (fade-in, fade-up, scale-in, stagger)
- **Component Library**: Reusable shadcn/ui components (Button, Card, Input, Modal, etc.)

### Key Features
🔐 Advanced Authentication & Authorization

- Secure JWT-based authentication system
- Role-based access control (Customer, Provider, Admin)
- Protected routes and private dashboards
- Persistent login sessions
- Secure logout and token handling
- Social login (BetterAuth)

🍽️ Meal Management
- Browse all available meals
- View meal details with image gallery
- Search meals by name
- Filter by category, cuisine, dietary preferences, and price
- Featured meals section
- Browse meals from multiple providers
- Skeleton loaders for better UX

🛒 Cart & Checkout
- Add meals to cart
- Update quantity or remove items
- Delivery address form
- Cash on Delivery checkout
- Order confirmation system
- Dynamic price calculation

🔍 Advanced Search & Filter
- Real-time search functionality
- Multiple filter options
- Sorting capabilities
- Pagination support
- Backend-powered filtering

📊 Dashboard System (Role-Based)
- **User Dashboard**: Order history, profile management, favorites
- **Provider Dashboard**: Menu management, order tracking, analytics
- **Admin Dashboard**: User management, category control, platform analytics
- Real-time charts and statistics
- Data tables with filtering and pagination

📄 Content Pages
- **Home**: Hero section, features, stats, testimonials, FAQ, newsletter
- **About**: Company story, team, values, impact metrics
- **Contact**: Contact form, business information, social links
- **Blog**: Food industry insights and platform updates
- **Help/Support**: FAQ, terms, privacy policy

### 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Query (for caching)
- Zustand (state management)

**Backend:**
- Express.js (REST API)
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- BetterAuth
- Zod validation
- Multer (file uploads)

**DevOps:**
- Vercel (Frontend deployment)
- Railway/Render (Backend deployment)
- Cloudinary (Image storage)

### 🚀 Getting Started

1. **Clone the repositories**
```bash
git clone https://github.com/sujonbiswasdev/frontend-next-level-assignment-4.git
git clone https://github.com/sujonbiswasdev/backend-next-level-assignment-4.git
```

2. **Install dependencies**
```bash
# Frontend
cd frontend-next-level-assignment-4
npm install

# Backend
cd backend-next-level-assignment-4
npm install
```

3. **Environment Setup**
- Copy `.env.example` to `.env`
- Configure database URL, JWT secrets, API keys

4. **Database Setup**
```bash
# Backend
npx prisma generate
npx prisma db push
npm run seed:admin
```

5. **Run Development Servers**
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

### 🎯 Demo Credentials

**Admin Account:**
- Email: admin@foodhub.com
- Password: admin123

**Test User:**
- Email: user@foodhub.com
- Password: user123

**Provider Account:**
- Email: provider@foodhub.com
- Password: provider123

### 📱 Features Overview

- **Responsive Design**: Works perfectly on all devices
- **Performance Optimized**: Lazy loading, image optimization, caching
- **SEO Friendly**: Proper meta tags, structured data
- **Accessibility**: WCAG compliant components
- **Security**: Input validation, XSS protection, secure headers
- **Scalability**: Modular architecture, clean code structure

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### 📄 License

This project is licensed under the MIT License.

👨‍🍳 Provider Features
- Add new meals
- Edit meal information
- Delete meals
- Manage incoming orders
- Update order status

🛡️ Admin Features
- Manage all users
- Suspend or activate accounts
- View all orders
- Manage meal categories
- Monitor platform activity

⭐ Review System
- Add reviews
- Give star ratings
- Edit reviews
- Delete reviews

💳 Payment
- Secure payment integration

⚠️ Error Handling
- Form validation
- Clear error messages
- Loading states 
🎨 UI/UX
- Clean and modern design
- Fully responsive layout
- Consistent colors and spacing
- User-friendly navigation
- Fast and smooth experience

### 🛠️ Technology Stack
Frontend
- Next.js
- Tailwind CSS
- shadcn

Backend
- Node.js
- Express.js
- Prisma ORM
Database
- PostgreSQL
Authentication
- JWT
Payment
 - Stripe

Deployment
- Vercel (Frontend)
- vercel(Backend)

## Setup Instructions
- (frontend) : git clone https://github.com/sujonbiswasdev/frontend-next-level-assignment-4.git
- (backend) : git clone https://github.com/sujonbiswasdev/backend-next-level-assignment-4.git

### Backend Setup
- cd backend-next-level-assignment-4
- pnpm install
- Create .env file:
```typescript
DATABASE_URL='postgresql://username:password@localhost:5432/mydatabase?schema=public'

BETTER_AUTH_SECRET=hD7G9Cuksel0tG6Jv7FOLD4Qn8BYNhqC
BETTER_AUTH_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
PORT=5000

ACCESS_TOKEN_SECRET=KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
REFRESH_TOKEN_SECRET=refreshtokendata
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d

APP_USER='example@gmail.com'
APP_PASS=jkll ddss dsas degc

EMAIL="admin_email_example@gmail.com"
PASSWORD="admin_email_example"
GOOGLE_CLIENT_ID=google-client-id-example.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=google-client-secret-example
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=demo_cloud_name
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=cloudinary_secret_example



SMTP_USER=example@gmail.com
SMTP_PASS=sadx dswd dagx saeg
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_FROM=example@gmail.com

STRIPE_SECRET_KEY=sk_test_example_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_example_webhook_secret
```

Run the cmd:
- pnpm dlx prisma migrate reset
- pnpm dlx prisma migrate dev

- pnpm dlx prisma generate
- pnpm dev

### Frontend Setup

- cd frontend-next-level-assignment-4
- pnpm install
- Create .env file:

```typescript

BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://loacalhost:3000

ACCESS_TOKEN_SECRET=accestoken_secret
REFRESH_TOKEN_SECRET=refreshtoken_secret

NEXT_PUBLIC_test=sdfsfsf

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

pnpm dev















 



