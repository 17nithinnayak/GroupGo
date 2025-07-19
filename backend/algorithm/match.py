


# from backend.db import rider_collection, match_collection, driver_collection
# import heapq
# from bson import ObjectId
# from datetime import datetime
# from backend.graph.static_graph import get_static_graph

# graph = get_static_graph()
# detour_threshold = 8

# def parse_time(value):
#     """Parse ISO format time string to datetime object."""
#     return datetime.fromisoformat(value) if isinstance(value, str) else value

# def location_valid(loc):
#     """Check if a location is in the static graph."""
#     return loc in graph

# def dijkstra(start, end):
#     if not location_valid(start):
#         raise KeyError(f"Start location '{start}' not found in graph.")
#     if not location_valid(end):
#         raise KeyError(f"End location '{end}' not found in graph.")

#     queue = [(0, start, [])]
#     visited = set()

#     while queue:
#         cost, node, path = heapq.heappop(queue)
#         if node == end:
#             return cost, path + [node]
#         if node in visited:
#             continue
#         visited.add(node)

#         for neighbor, weight in graph[node].items():
#             if neighbor not in visited:
#                 heapq.heappush(queue, (cost + weight, neighbor, path + [node]))
#     return float("inf"), []

# async def match_riders_to_drivers():
#     matched_pairs = []
#     riders = await rider_collection.find().to_list(None)
#     drivers = await driver_collection.find().to_list(None)

#     for rider in riders:
#         if rider.get("matched_driver"):
#             continue  # Already matched

#         pickup = rider['pickup']
#         destination = rider['destination']
#         r_earliest = parse_time(rider['earliest_time'])
#         r_latest = parse_time(rider['latest_time'])
#         if r_earliest > r_latest:
#             print(f"⚠️ Reversing rider time window for {rider['rider_id']}")
#             r_earliest, r_latest = r_latest, r_earliest

#         # Validate pickup & destination
#         if not location_valid(pickup):
#             # print(f"❌ Skipping rider {rider['rider_id']} — invalid pickup location: {pickup}")
#             continue
#         if not location_valid(destination):
#             # print(f"❌ Skipping rider {rider['rider_id']} — invalid destination: {destination}")
#             continue

#         for driver in drivers:
#             if driver["seats_available"] <= 0:
#                 continue

#             start = driver["start"]
#             departure = parse_time(driver["departure_time"])

#             if not location_valid(start):
#                 print(f"❌ Skipping driver {driver['driver_id']} — invalid start location: {start}")
#                 continue

#             if not (r_earliest <= departure <= r_latest):
#                 print(f"Rider {rider['rider_id']} Window: {r_earliest} - {r_latest}")
#                 print(f"Driver {driver['driver_id']} Departure: {departure}")
#                 continue

#             try:
#                 orig_cost, orig_path = dijkstra(start, "JSSSTU")
#             except KeyError as e:
#                 print(f"🚫 Dijkstra error for driver {driver['driver_id']}: {e}")
#                 continue

#             print(f"\n🔍 Driver {driver['driver_id']} original path from {start} to JSSSTU: {orig_path}")
#             print(f"🧭 Is pickup '{pickup}' in path? {pickup in orig_path}")

#             if pickup in orig_path:
#                 driver_path = orig_path
#                 rider_path = orig_path[orig_path.index(pickup):]
#                 print(f"✅ Matching via shared path. Rider path: {rider_path}")
#                 await update_match(driver, rider, driver_path, rider_path)
#                 matched_pairs.append((rider["rider_id"], driver["driver_id"]))
#                 break

#             print(f"➡️ Trying alternate Dijkstra route: {start} -> {pickup}")
#             try:
#                 to_pickup_cost, to_pickup_path = dijkstra(start, pickup)
#                 pickup_to_dest_cost, pickup_to_dest_path = dijkstra(pickup, "JSSSTU")
#             except KeyError as e:
#                 print(f"🚫 Dijkstra error: {e}")
#                 continue

#             print(f"📍 Path to pickup: {to_pickup_path} (cost {to_pickup_cost})")
#             print(f"📍 Path pickup -> JSSSTU: {pickup_to_dest_path} (cost {pickup_to_dest_cost})")

#             if to_pickup_cost == float("inf") or pickup_to_dest_cost == float("inf"):
#                 print("❌ No valid path found, skipping rider.")
#                 continue

#             detour_cost = to_pickup_cost + pickup_to_dest_cost
#             print(f"💸 Detour cost: {detour_cost}, Original cost: {orig_cost}, Allowed: {orig_cost * detour_threshold}")

#             if detour_cost <= orig_cost * detour_threshold:
#                 driver_path = to_pickup_path + pickup_to_dest_path[1:]
#                 rider_path = pickup_to_dest_path
#                 print(f"✅ Matched with detour. Driver path: {driver_path}, Rider path: {rider_path}")
#                 await update_match(driver, rider, driver_path, rider_path)
#                 matched_pairs.append((rider["rider_id"], driver["driver_id"]))
#                 break
#             else:
#                 print("❌ Detour too large, not matching.")

#     return {"matched": matched_pairs}

# async def update_match(driver, rider, driver_path, rider_path):
#     rider_id = rider["rider_id"]
#     driver_id = driver["driver_id"]

#     await driver_collection.update_one(
#         {"driver_id": driver_id},
#         {
#             "$push": {
#                 "matched_riders": {
#                     "rider_id": rider_id,
#                     "pickup": rider["pickup"],
#                     "path": driver_path
#                 }
#             },
#             "$inc": {"seats_available": -1}
#         }
#     )

#     await rider_collection.update_one(
#         {"rider_id": rider_id},
#         {
#             "$set": {
#                 "matched": True,
#                 "matched_driver": driver_id,
#                 "path": rider_path
#             }
#         }
#     )



# from backend.db import rider_collection, match_collection, driver_collection
# import heapq
# from bson import ObjectId
# from datetime import datetime
# from backend.graph.static_graph import get_static_graph
# from dateutil.parser import parse as flexible_parse  # ✅ added for robust date parsing

# graph = get_static_graph()
# detour_threshold = 8

# def parse_time(value):
#     """Parse date/time robustly into datetime object."""
#     if isinstance(value, str):
#         try:
#             return datetime.fromisoformat(value)  # strict ISO
#         except ValueError:
#             try:
#                 return flexible_parse(value)  # handles '2025-07-18 05:22', etc.
#             except Exception as e:
#                 raise ValueError(f"❌ Failed to parse time: {value} — {e}")
#     return value

# def location_valid(loc):
#     """Check if a location is in the static graph."""
#     return loc in graph

# def dijkstra(start, end):
#     if not location_valid(start):
#         raise KeyError(f"Start location '{start}' not found in graph.")
#     if not location_valid(end):
#         raise KeyError(f"End location '{end}' not found in graph.")

#     queue = [(0, start, [])]
#     visited = set()

#     while queue:
#         cost, node, path = heapq.heappop(queue)
#         if node == end:
#             return cost, path + [node]
#         if node in visited:
#             continue
#         visited.add(node)

#         for neighbor, weight in graph[node].items():
#             if neighbor not in visited:
#                 heapq.heappush(queue, (cost + weight, neighbor, path + [node]))
#     return float("inf"), []

# async def match_riders_to_drivers():
#     matched_pairs = []
#     riders = await rider_collection.find().to_list(None)
#     drivers = await driver_collection.find().to_list(None)

#     for rider in riders:
#         if rider.get("matched_driver"):
#             continue  # Already matched

#         pickup = rider['pickup']
#         destination = rider['destination']
#         r_earliest = parse_time(rider['earliest_time'])
#         r_latest = parse_time(rider['latest_time'])
#         if r_earliest > r_latest:
#             print(f"⚠️ Reversing rider time window for {rider['rider_id']}")
#             r_earliest, r_latest = r_latest, r_earliest

#         if not location_valid(pickup):
#             continue
#         if not location_valid(destination):
#             continue

#         for driver in drivers:
#             if driver["seats_available"] <= 0:
#                 continue

#             start = driver["start"]
#             departure = parse_time(driver["departure_time"])

#             if not location_valid(start):
#                 print(f"❌ Skipping driver {driver['driver_id']} — invalid start location: {start}")
#                 continue

#             if not (r_earliest <= departure <= r_latest):
#                 print(f"Rider {rider['rider_id']} Window: {r_earliest} - {r_latest}")
#                 print(f"Driver {driver['driver_id']} Departure: {departure}")
#                 continue

#             try:
#                 orig_cost, orig_path = dijkstra(start, "JSSSTU")
#             except KeyError as e:
#                 print(f"🚫 Dijkstra error for driver {driver['driver_id']}: {e}")
#                 continue

#             print(f"\n🔍 Driver {driver['driver_id']} original path from {start} to JSSSTU: {orig_path}")
#             print(f"🧭 Is pickup '{pickup}' in path? {pickup in orig_path}")

#             if pickup in orig_path:
#                 driver_path = orig_path
#                 rider_path = orig_path[orig_path.index(pickup):]
#                 print(f"✅ Matching via shared path. Rider path: {rider_path}")
#                 await update_match(driver, rider, driver_path, rider_path)
#                 matched_pairs.append((rider["rider_id"], driver["driver_id"]))
#                 break

#             print(f"➡️ Trying alternate Dijkstra route: {start} -> {pickup}")
#             try:
#                 to_pickup_cost, to_pickup_path = dijkstra(start, pickup)
#                 pickup_to_dest_cost, pickup_to_dest_path = dijkstra(pickup, "JSSSTU")
#             except KeyError as e:
#                 print(f"🚫 Dijkstra error: {e}")
#                 continue

#             print(f"📍 Path to pickup: {to_pickup_path} (cost {to_pickup_cost})")
#             print(f"📍 Path pickup -> JSSSTU: {pickup_to_dest_path} (cost {pickup_to_dest_cost})")

#             if to_pickup_cost == float("inf") or pickup_to_dest_cost == float("inf"):
#                 print("❌ No valid path found, skipping rider.")
#                 continue

#             detour_cost = to_pickup_cost + pickup_to_dest_cost
#             print(f"💸 Detour cost: {detour_cost}, Original cost: {orig_cost}, Allowed: {orig_cost * detour_threshold}")

#             if detour_cost <= orig_cost * detour_threshold:
#                 driver_path = to_pickup_path + pickup_to_dest_path[1:]
#                 rider_path = pickup_to_dest_path
#                 print(f"✅ Matched with detour. Driver path: {driver_path}, Rider path: {rider_path}")
#                 await update_match(driver, rider, driver_path, rider_path)
#                 matched_pairs.append((rider["rider_id"], driver["driver_id"]))
#                 break
#             else:
#                 print("❌ Detour too large, not matching.")

#     return {"matched": matched_pairs}

# async def update_match(driver, rider, driver_path, rider_path):
#     rider_id = rider["rider_id"]
#     driver_id = driver["driver_id"]

#     await driver_collection.update_one(
#         {"driver_id": driver_id},
#         {
#             "$push": {
#                 "matched_riders": {
#                     "rider_id": rider_id,
#                     "pickup": rider["pickup"],
#                     "path": driver_path
#                 }
#             },
#             "$inc": {"seats_available": -1}
#         }
#     )

#     await rider_collection.update_one(
#         {"rider_id": rider_id},
#         {
#             "$set": {
#                 "matched": True,
#                 "matched_driver": driver_id,
#                 "path": rider_path
#             }
#         }
#     )
from backend.db import rider_collection, driver_collection
import heapq
from bson import ObjectId
from datetime import datetime
from backend.graph.static_graph import get_static_graph
from dateutil.parser import parse as flexible_parse

graph = get_static_graph()
detour_threshold = 8

def parse_time(value):
    if isinstance(value, str):
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            return flexible_parse(value)
    return value

def location_valid(loc):
    return loc in graph

def dijkstra(start, end):
    if not location_valid(start) or not location_valid(end):
        raise KeyError(f"Invalid location in graph: {start} or {end}")
    
    queue = [(0, start, [])]
    visited = set()

    while queue:
        cost, node, path = heapq.heappop(queue)
        if node == end:
            return cost, path + [node]
        if node in visited:
            continue
        visited.add(node)
        for neighbor, weight in graph[node].items():
            if neighbor not in visited:
                heapq.heappush(queue, (cost + weight, neighbor, path + [node]))
    return float("inf"), []

async def match_riders_to_drivers():
    matched_pairs = []
    riders = await rider_collection.find().to_list(None)
    drivers = await driver_collection.find().to_list(None)

    for rider in riders:
        if rider.get("matched_driver"):
            continue

        pickup = rider['pickup']
        destination = rider['destination']
        r_earliest = parse_time(rider['earliest_time'])
        r_latest = parse_time(rider['latest_time'])

        if r_earliest > r_latest:
            r_earliest, r_latest = r_latest, r_earliest

        if not location_valid(pickup) or not location_valid(destination):
            continue

        for driver in drivers:
            if driver["seats_available"] <= 0:
                continue

            start = driver["start"]
            departure = parse_time(driver["departure_time"])

            if not location_valid(start):
                continue
            if not (r_earliest <= departure <= r_latest):
                continue

            try:
                orig_cost, orig_path = dijkstra(start, "JSSSTU")
            except KeyError:
                continue

            if pickup in orig_path:
                driver_path = orig_path
                rider_path = orig_path[orig_path.index(pickup):]
                await update_match(driver, rider, driver_path, rider_path)
                matched_pairs.append({
                    "rider_id": rider["rider_id"],
                    "driver_id": driver["driver_id"],
                    "pickup": pickup,
                    "rider_path": rider_path,
                    "driver_path": driver_path,
                })
                break

            try:
                to_pickup_cost, to_pickup_path = dijkstra(start, pickup)
                pickup_to_dest_cost, pickup_to_dest_path = dijkstra(pickup, "JSSSTU")
            except KeyError:
                continue

            if to_pickup_cost == float("inf") or pickup_to_dest_cost == float("inf"):
                continue

            detour_cost = to_pickup_cost + pickup_to_dest_cost

            if detour_cost <= orig_cost * detour_threshold:
                driver_path = to_pickup_path + pickup_to_dest_path[1:]
                rider_path = pickup_to_dest_path
                await update_match(driver, rider, driver_path, rider_path)
                matched_pairs.append({
                    "rider_id": rider["rider_id"],
                    "driver_id": driver["driver_id"],
                    "pickup": pickup,
                    "rider_path": rider_path,
                    "driver_path": driver_path,
                })
                break

    return {"matched": matched_pairs}
    
async def update_match(driver, rider, driver_path, rider_path):
    await driver_collection.update_one(
        {"driver_id": driver["driver_id"]},
        {
            "$push": {
                "matched_riders": {
                    "rider_id": rider["rider_id"],
                    "pickup": rider["pickup"],
                    "path": driver_path
                }
            },
            "$inc": {"seats_available": -1}
        }
    )

    await rider_collection.update_one(
        {"rider_id": rider["rider_id"]},
        {
            "$set": {
                "matched": True,
                "matched_driver": driver["driver_id"],
                "path": rider_path
            }
        }
    )
