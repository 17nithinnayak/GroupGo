from backend.db import rider_collection, match_collection, driver_collection
import heapq
from bson import ObjectId
from datetime import datetime
from backend.graph.static_graph import get_static_graph

graph = get_static_graph()
detour_threshold = 1.5

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

        for neighbor, weight in graph.nodes.get(node, {}).items():
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

        for driver in drivers:
            if driver["seats_available"] <= 0:
                continue

            start = driver["start"]
            departure = parse_time(driver["departure_time"])

            if not (r_earliest <= departure <= r_latest):
                continue

            orig_cost, orig_path = dijkstra(start, "JSSSTU")
            if pickup in orig_path:
                driver_path = orig_path
                rider_path = orig_path[orig_path.index(pickup):]
                await update_match(driver, rider, driver_path, rider_path)
                matched_pairs.append((rider["rider_id"], driver["driver_id"]))
                break

            to_pickup_cost, to_pickup_path = dijkstra(start, pickup)
            pickup_to_dest_cost, pickup_to_dest_path = dijkstra(pickup, "JSSSTU")

            if to_pickup_cost == float("inf") or pickup_to_dest_cost == float("inf"):
                continue

            detour_cost = to_pickup_cost + pickup_to_dest_cost
            if detour_cost <= orig_cost * detour_threshold:
                driver_path = to_pickup_path + pickup_to_dest_path[1:]
                rider_path = pickup_to_dest_path
                await update_match(driver, rider, driver_path, rider_path)
                matched_pairs.append((rider["rider_id"], driver["driver_id"]))
                break
        
               
    return {"matched": matched_pairs}




async def update_match(driver, rider, driver_path, rider_path):
    rider_id = rider["rider_id"]
    driver_id = driver["driver_id"]

    await rider_collection.update_one(
        {"rider_id": rider_id},
        {
            "$set": {
                "matched_driver": driver_id,
                "path": rider_path
            }
        }
    )

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
