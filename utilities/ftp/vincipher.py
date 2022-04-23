import collections
import hashlib
import itertools
import string

lowercase = collections.deque(string.ascii_lowercase + string.digits)

def encrypt(message : str, key , multiplier : int):
    compressed_message = message.lower()

    cycler = itertools.cycle(key.lower())
    long_key = ''.join([next(cycler) for _ in range(len(compressed_message))])
    coded = []

    for number in range(len(long_key)):
        cipher_letter = compressed_message[number]
        key_letter = long_key[number]

        key_index = string.ascii_lowercase.index(key_letter)
        cipher_index = string.ascii_lowercase.index(cipher_letter)

        lowercase = collections.deque(string.ascii_lowercase)
        lowercase.rotate(multiplier * key_index)
        new_alphabet = ''.join(list(lowercase))
        new_character = new_alphabet[cipher_index]
        coded.append(new_character)

    return ''.join(coded)

def decrypt(message , key):
    return encrypt(message , key , 1)


username = "thomasthecatoonz"
secret = "zaqw"

encrypted_text = encrypt(username , secret , -1)

hex_digest = "5c86511993d156bb079996d6abbe5aa83698602d321e37c49324915074002ae7a1af7c2909f1d840ad47bdb3b8cacd419f6b3ba889c58725c1d14e93453ed473" # md5 of username

print(encrypted_text)

for p in itertools.permutations(string.ascii_lowercase , 4):
    key = ''.join(p)
    decrypted = decrypt(encrypted_text , key)
    
    s = hashlib.sha512()
    s.update(decrypted.encode())
    cur_hash = s.hexdigest()

    if cur_hash == hex_digest:
        print(decrypted)
        break

    

