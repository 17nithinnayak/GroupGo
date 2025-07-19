
# @router.post("/match")
# async def trigger_match():
#     try:
#         # Assume this returns a list of matched drivers like: [{"driver_id": 1, "name": "Alice", ...}, ...]
#         matches = await match_riders_to_drivers()
        
#         return JSONResponse(
#             status_code=200,
#             content={
#                 "message": "Matching process triggered successfully.",
#                 "matches": matches  # ✅ Essential for frontend to render
#             }
#         )
#     except Exception as e:
#         print("🚨 Error in /match:")
#         traceback.print_exc()
#         return JSONResponse(
#             status_code=500,
#             content={
#                 "error": str(e),
#                 "message": "Matching failed.",
#                 "matches": []  # Still return matches field to prevent frontend crash
#             }
#         )
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from backend.algorithm.match import match_riders_to_drivers

router = APIRouter()

@router.post("/match")
async def trigger_match():
    try:
        result = await match_riders_to_drivers()

        if not result["matched"]:
            return {
                "status": "success",
                "message": "No matches found.",
                "matched": []
            }

        return {
            "status": "success",
            "message": "Matching process completed.",
            "matched": result["matched"]  # this includes rider_id, driver_id, paths
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={
            "status": "error",
            "message": str(e)
        })
