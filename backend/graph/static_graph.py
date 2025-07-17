import networkx as nx

def get_static_graph():
    G = nx.Graph()

    G.add_edge("Bogadi", "Saraswathipuram", weight=4)
    G.add_edge("Saraswathipuram", "Kuvempunagar", weight=3)
    G.add_edge("Saraswathipuram", "JSSSTU", weight=2)
    G.add_edge("Saraswathipuram", "Vontikoppal", weight=5)
    G.add_edge("Kuvempunagar", "JSSSTU", weight=3)
    G.add_edge("Vontikoppal", "Saraswathipuram", weight=5)  
    G.add_edge("JSSSTU", "Kuvempunagar", weight=3)         
    
    return G
