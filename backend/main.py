from fastapi import FastAPI
from backend.db import get_database
from backend.routes.rides import router as rides_router
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.graph import router as graph_router
from backend.routes.match import router as match_router
from backend.routes.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "GroupGo API is working 🚗"}

@app.on_event("startup")
async def startup():
    db = get_database()
    app.state.db = db
    print("MongoDB connected ✅")

app.include_router(rides_router)
app.include_router(graph_router)
app.include_router(match_router)
app.include_router(auth_router)