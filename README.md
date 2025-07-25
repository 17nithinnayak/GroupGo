# 🚗 GroupGo – Smart Carpooling for JSSSTU Students

**GroupGo** is an intelligent carpool matching system designed for students of **JSS Science and Technology University (JSSSTU)** in Mysuru. The platform connects riders and drivers heading in the same direction, optimizing routes to reduce travel time, traffic congestion, and environmental impact.

---

## 📌 Features

- 🔐 (Optional) Simple login with email & password
- 🛣️ Ride creation and ride requests (to/from JSSSTU)
- 🧠 Smart rider-driver matching using Dijkstra’s and Greedy algorithms
- 🗺️ Static map-based routing using a custom-built graph
- 🔔 Real-time ride status and notifications
- 👀 View available rides, match history, and seat availability

---

## 🧠 Tech Stack

### 🔙 Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB (MongoDB Atlas)
- **Routing & Logic**: Dijkstra’s algorithm for shortest path + Greedy logic for optimal rider-driver pairing
- **Core Matching**: Minimal detour-based matching with time/seat constraints

### 🌐 Frontend
- **Framework**: ReactJS + Tailwind CSS
- **Features**: Ride creation UI, map-based views, status updates, transitions via Framer Motion

---

## 📍 Map Area

GroupGo uses a **simplified static map** of areas around JSSSTU in Mysuru:
- Key Nodes: JSSSTU, Bogadi, Saraswathipuram, Vijaya Bank Circle, etc.
- Routes are modeled as a **graph** (nodes + weighted edges for travel distance)

---

## 🔁 Matching Algorithm

GroupGo’s core algorithm:
1. 🧭 **Dijkstra’s Algorithm**: Finds shortest paths between nodes
2. 🔄 **Greedy Match Logic**:
   - Matches riders to drivers minimizing detour and time delay
   - Ensures driver capacity, time constraints, and valid pickup points are considered

---

## ⚙️ Setup Instructions

### 🔽 Clone the Repo

```bash
git clone https://github.com/your-username/GroupGo.git
cd GroupGo

cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

cd frontend
npm install
npm run dev

```
