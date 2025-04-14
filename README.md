## 🛠️ How to Run the Project Locally

### 📦 Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/sikandar-saleem/pingcrm-migration
   cd pingcrm-migration/backend
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate # for mac/linux
   venv\Scripts\activate # for Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### 🌐 Frontend

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/sikandar-saleem/pingcrm-migration
   cd pingcrm-migration/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your API URL:
   ```
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🧩 Database

- **Database Used:** PostgreSQL  
- **Connection:** Use Neon as the managed PostgreSQL provider.
- Backend is configured to connect using the `postgresql://neondb_owner:npg_2EmoWXU6Rlct@ep-winter-meadow-a4y4ckk2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require`

---

## 🚀 Deployment URLs

- **Frontend (Vercel):** [[https://your-frontend.vercel.app](https://pingcrm-fe.vercel.app/)]([https://your-frontend.vercel.app](https://pingcrm-fe.vercel.app/)) 
- **Backend (Railway):** [http://pingcrm-be-production.up.railway.app/api/v1/companies](http://pingcrm-be-production.up.railway.app/api/v1/companies)


> ⚠️ The backend is fully functional and connected to the live database.

---

## 📝 Notes

### ✅ Completed
- [x] Basic frontend and backend setup
- [x] Implemented companies' CRUD
- [x] Implemented contacts CRUD, association with company
- [x] Search company or contact by name
- [x] Pagination
- [x] API integration between frontend and backend
- [x] Deployed both frontend and backend

## ⏱️ Time Spent

> Roughly **5 hours** in total, split across:
- Frontend: 2.5 hours
- Backend: 2 hours
- Debugging & Deployment: 0.5 hours

---

## 🤖 AI Tools Used

- ChatGPT (OpenAI) – for code snippets, bug fixes, and explanations
- GitHub Copilot – assisted in writing repetitive code
```
