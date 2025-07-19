from fastapi import APIRouter, HTTPException
from backend.models.user import User
from backend.utils.auth import hash_password, verify_password
from backend.db import get_database

router = APIRouter()

@router.post("/register")
async def register_user(user: User):
    users = get_database()["users"]
    existing = await users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    
    hashed_pw = hash_password(user.password)
    await users.insert_one({"email": user.email, "password": hashed_pw})
    return {"message": "User registered successfully."}

# @router.post("/login")
# async def login_user(user: User):
#     users = get_database()["users"]
#     db_user = await users.find_one({"email": user.email})
#     if not db_user or not verify_password(user.password,db_user["password"]):
#         raise HTTPException(status_code=400, detail="Invalid email or password.")
#     return {"message": "Login successful."}
@router.post("/login")
async def login_user(user: User):
    print("📥 Login request received:", user.email)

    users = get_database()["users"]
    db_user = await users.find_one({"email": user.email})
    
    if not db_user:
        print("❌ User not found")
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    if not verify_password(user.password, db_user["password"]):
        print("❌ Password mismatch")
        raise HTTPException(status_code=400, detail="Invalid email or password.")

    print("✅ Login successful for", user.email)
    return {"message": "Login successful."}
