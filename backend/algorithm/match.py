from backend.db import rider_collection, match_collection, driver_collection
import heapq
from bson import ObjectId
from datetime import datetime
from backend.graph.static_graph import get_static_graph

graph = get_static_graph()
detour_threshold = 5

def parse_time(value):
    """Parse ISO format time string to datetime object."""
    return datetime.fromisoformat(value) if isinstance(value, str) else value

def dijkstra(start, end):
    queue = [(0, start, [])]
    visited = set()

    while queue:
        cost, node, path = heapq.heappop(queue)
        if node == end:
            return cost, path + [node]
        if node in visited:
            continue
        visited.add(node)

        for neighbor, weight in graph.get(node, {}).items():
            if neighbor not in visited:
                heapq.heappush(queue, (cost + weight, neighbor, path + [node]))
    return float("inf"), []


async def match_riders_to_drivers():
    matched_pairs = []
    riders = await rider_collection.find().to_list(None)
    drivers = await driver_collection.find().to_list(None)

    for rider in riders:
        if rider.get("matched_driver"):
            continue  # Already matched

        pickup = rider['pickup']
        destination = rider['destination']
        r_earliest = parse_time(rider['earliest_time'])
        r_latest = parse_time(rider['latest_time'])
        if r_earliest > r_latest:
            print(f"⚠️ Reversing rider time window for {rider['rider_id']}")
            r_earliest, r_latest = r_latest, r_earliest
        
        for driver in drivers:
            if driver["seats_available"] <= 0:
                continue

            start = driver["start"]
            departure = parse_time(driver["departure_time"])

            #if not (r_earliest <= departure <= r_latest):
                #print(f"Rider {rider['rider_id']} Window: {r_earliest} - {r_latest}")
                #print(f"Driver {driver['driver_id']} Departure: {departure}")
                #continue

            orig_cost, orig_path = dijkstra(start, "JSSSTU")
            print(f"\n🔍 Driver {driver['driver_id']} original path from {start} to JSSSTU: {orig_path}")
            print(f"🧭 Is pickup '{pickup}' in path? {pickup in orig_path}")

            if pickup in orig_path:
                driver_path = orig_path
                rider_path = orig_path[orig_path.index(pickup):]
                print(f"✅ Matching via shared path. Rider path: {rider_path}")
                await update_match(driver, rider, driver_path, rider_path)
                matched_pairs.append((rider["rider_id"], driver["driver_id"]))
                break


            print(f"➡️ Trying alternate Dijkstra route: {start} -> {pickup}")
            to_pickup_cost, to_pickup_path = dijkstra(start, pickup)
            print(f"📍 Path to pickup: {to_pickup_path} (cost {to_pickup_cost})")

            pickup_to_dest_cost, pickup_to_dest_path = dijkstra(pickup, "JSSSTU")
            print(f"📍 Path pickup -> JSSSTU: {pickup_to_dest_path} (cost {pickup_to_dest_cost})")

            if to_pickup_cost == float("inf") or pickup_to_dest_cost == float("inf"):
                print("❌ No valid path found, skipping rider.")
                continue

            detour_cost = to_pickup_cost + pickup_to_dest_cost
            print(f"💸 Detour cost: {detour_cost}, Original cost: {orig_cost}, Allowed: {orig_cost * detour_threshold}")

            if detour_cost <= orig_cost * detour_threshold:
                driver_path = to_pickup_path + pickup_to_dest_path[1:]
                rider_path = pickup_to_dest_path
                print(f"✅ Matched with detour. Driver path: {driver_path}, Rider path: {rider_path}")
                await update_match(driver, rider, driver_path, rider_path)
                matched_pairs.append((rider["rider_id"], driver["driver_id"]))
                break
            else:
                print("❌ Detour too large, not matching.")

        
               
    return {"matched": matched_pairs}




async def update_match(driver, rider, driver_path, rider_path):
    rider_id = rider["rider_id"]
    driver_id = driver["driver_id"]

   
    await driver_collection.update_one(
        {"driver_id": driver_id},
        {
            "$push": {
                "matched_riders": {
                    "rider_id": rider_id,
                    "pickup": rider["pickup"],
                    "path": driver_path
                }
            },
            "$inc": {"seats_available": -1}
        }
    )

    await rider_collection.update_one(
        {"rider_id": rider_id},
        {
            "$set": {
                "matched": True,
                "matched_driver": driver_id,
                "path": rider_path
            }
        }
    )
