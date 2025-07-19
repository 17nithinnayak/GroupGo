import networkx as nx

def get_static_graph():

    return {
    "Bogadi": {"Saraswathipuram": 4},
     "Kuvempunagar": {
        "JSSSTU": 3,
        "ISKCON": 4,
        "Saraswathipuram": 3
    },
    "Saraswathipuram": {
        "Kuvempunagar": 3,
        "JSSSTU": 2,
        "Vontikoppal": 5,
        "Bogadi": 4
    },
      
   
      "ISKCON": {
        "Kuvempunagar": 4
    },

    "Vontikoppal": {
        "Saraswathipuram": 5
    },

    "JSSSTU": {
        "Saraswathipuram": 2,
        "Kuvempunagar": 3,
        "Vijaya Bank Circle": 3,
        "Aroma Bakery": 2,
        "SJCE": 1,
        "Vaishnavi Sweets": 4,
        "RTO Circle": 5,
        "Ramaswamy": 4
    },

    "Apolo": {
        "Ballal": 8,
        "Vijaya Bank Circle": 5
    },
    "Ballal": {
        "Apolo": 8,
        "RTO Circle": 2
    },
    "Vijaya Bank Circle": {
        "Kamakshi Hospital": 2,
        "JSSSTU": 3,
        "Apolo": 5,
        "Kavitha Bakery": 3
    },
    "Kamakshi Hospital": {
        "Kukkralli": 7,
        "Vijaya Bank Circle": 2
    },
    "Kukkralli": {
        "Mysuru University Main Gate": 5,
        "Kamakshi Hospital": 7
    },
    "Mysuru University Main Gate": {
        "Aroma Bakery": 2,
        "Kukkralli": 5
    },
    "Aroma Bakery": {
        "JSSSTU": 2,
        "Mysuru University Main Gate": 2
    },

    "SJCE": {
        "JSSSTU": 1,
        "Grandpa's Kitchen": 7
    },
    "Grandpa's Kitchen": {
        "SJCE": 7
    },

    "Vaishnavi Sweets": {
        "Kavitha Bakery": 2,
        "JSSSTU": 4
    },
    "Kavitha Bakery": {
        "Vaishnavi Sweets": 2,
        "Vijaya Bank Circle": 3
    },

    "RTO Circle": {
        "Ballal": 2,
        "Ramaswamy": 1,
        "JSSSTU": 5
    },
    "Ramaswamy": {
        "RTO Circle": 1,
        "JSSSTU": 4
    }
}
