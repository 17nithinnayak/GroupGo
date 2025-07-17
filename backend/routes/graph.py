from fastapi import APIRouter
from backend.graph.static_graph import get_static_graph


router = APIRouter()

@router.get("/graph")
async def get_graph():
    graph = get_static_graph()
    nodes = list(graph.nodes)
    edges = [
        {
            "from": u,
            "to": v,
            "weight": graph[u][v]['weight']
        }
        for u,v in graph.edges
    ]

    return{
        "nodes": nodes,
        "edges": edges
    }