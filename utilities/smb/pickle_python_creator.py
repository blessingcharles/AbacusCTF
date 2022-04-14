import pickle
import random
from Crypto.Util.number import bytes_to_long

obfuscated_dirname = "abacus{1p4v#dr45ht1}"

obs_list = []

for idx , char in enumerate(obfuscated_dirname):
    obs_list.append((f"dir_name-{idx}" , char))

random.shuffle(obs_list)
pickled = pickle.dumps(obs_list)
converted_thing = hex(bytes_to_long(pickled))[2:]

print(converted_thing)

with open ("chutney" , "w") as f:
    f.write(converted_thing)
    