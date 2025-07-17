import networkx as nx

def get_static_graph():

    return {
        "Bogadi": {"Saraswathipuram": 4},
        "Saraswathipuram": {
            "Kuvempunagar": 3,
            "JSSSTU": 2,
            "Vontikoppal": 5
        },
        "Kuvempunagar": {"JSSSTU": 3},
        "Vontikoppal": {"Saraswathipuram": 5},
        "JSSSTU": {"Kuvempunagar": 3}  # optional back path
    }
