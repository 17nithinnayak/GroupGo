from fastapi import APIRouter, HTTPException
from backend.models.driver import Driver
from backend.db import driver_collection, rider_collection
from backend.algorithm.match import match_riders_to_drivers
from datetime import datetime
from backend.models.rider import Rider

router = APIRouter()


@router.post("/create_ride")
async def create_ride(driver: Driver):
    existing = await driver_collection.find_one({"driver_id": driver.driver_id})
    if existing:
        raise HTTPException(status_code=400, detail="Driver ID already exists.")
    
    if isinstance(driver.departure_time, str):
        driver.departure_time = datetime.fromisoformat(driver.departure_time)

    driver_doc = driver.dict()
    driver_doc["matched_riders"] = []
    driver_doc["seats_available"] = driver.seats_available

    await driver_collection.insert_one(driver_doc)

    await match_riders_to_drivers()
    return {"message": "Driver ride created and matching triggered."}


@router.post("/request_ride")
async def request_ride(rider: Rider):
    existing = await rider_collection.find_one({"rider_id": rider.rider_id})
    if existing:
        raise HTTPException(status_code=400, detail="Rider ID already exists.")
    
    if isinstance(rider.earliest_time, str):
        rider.earliest_time = datetime.fromisoformat(rider.earliest_time)
    if isinstance(rider.latest_time, str):  
        rider.latest_time = datetime.fromisoformat(rider.latest_time)

    rider_doc = rider.dict()
    rider_doc["matched"] = False

    await rider_collection.insert_one(rider_doc)

    #await match_riders_to_drivers()
    return {"message": "Rider request submitted and matching triggered."}


@router.get("/rides")
async def list_rides():
    drivers_cursor = driver_collection.find()
    riders_cursor = rider_collection.find()

    drivers = []
    async for d in drivers_cursor:
        d["_id"] = str(d["_id"])  
        drivers.append(d)

    riders = []
    async for r in riders_cursor:
        r["_id"] = str(r["_id"])
        riders.append(r)

    return {
        "drivers": drivers, 
        "riders": riders
    }


@router.post("/reset")
async def reset_rides():
    await driver_collection.delete_many({})
    await rider_collection.delete_many({})
    return {"message": "All rides and riders have been reset."}


