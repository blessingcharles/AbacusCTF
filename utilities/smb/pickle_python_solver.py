import pickle
from Crypto.Util.number import long_to_bytes

file_contents = ""

with open("chutney" , "r") as f:
    file_contents = f.read()

file_contents = long_to_bytes(int(file_contents,16))
unpicked_list = pickle.loads(file_contents)

dir_name = ""

for i in range(0,20):
    dir_idx = f"emp_secret-{i}"

    for t in unpicked_list:
        if dir_idx == t[0]:
            dir_name += t[1]

print(f"[+]Cracked Employee Secret : {dir_name}")