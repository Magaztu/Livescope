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