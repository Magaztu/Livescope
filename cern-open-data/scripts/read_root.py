#I will:
# - Open a ROOT file
# - List whatever is inside
# - Trust the process

import uproot
import os # It won't recognize the path (prolly cuz of the isolated env)

current_dir = os.path.dirname(os.path.abspath(__file__))
root_file_path = os.path.join(current_dir, "..", "data", "data_C.GamGam.root")
root_file_path = os.path.normpath(root_file_path)

#root_file_path = "../data/data_C.GamGam.root"
#LiveScope\cern-open-data\data\data_C.GamGam.root

file = uproot.open(root_file_path)

# Esto debería enlistar las 'llaves' u objetos
print("Keys in ROOT file: ", file.keys())

tree = file["mini"]
print("Branches in 'mini' tree: ", tree.keys())

Names = [
    "eventNumber",
    "lep_n", "lep_pt", "lep_eta", "lep_phi", "lep_E", "lep_charge",
    "photon_n", "photon_pt", "photon_eta", "photon_phi", "photon_E",
    "met_et", "met_phi"
]

data = {} #This is a dictionary

import awkward as ak

for Name in Names:
    print(f"Reading branch: {Name}")
    try:
        data[Name] = tree[Name].array(library="ak").tolist()
    except Exception as e:
        print(f"Failed to read branch {Name}, bcuz {e}")

import json

output_path = os.path.join(current_dir, "..", "output", "event_data.json")
output_path = os.path.normpath(output_path)

with open(output_path,"w") as fi:
    json.dump(data, fi, indent=2) # Seems like -with- statement is used with open() to prevent errors

print(f"Everything's good to go!! \nData exported to {output_path}")

#Dangit, we hit a wall, seems like i'll have to use 'awkward' library (btw Pratyush Das ty for everthing you've contributed on the net tyttyytyt)
#I'll leave this for l8r tho