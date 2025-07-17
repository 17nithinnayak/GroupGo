import traceback
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from backend.algorithm.match import match_riders_to_drivers

router = APIRouter()

@router.post("/match")
async def trigger_match():
    try:
        await match_riders_to_drivers()
        return {"message": "Matching process triggered successfully."}
    except Exception as e:
        print("🚨 Error in /match:")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
    