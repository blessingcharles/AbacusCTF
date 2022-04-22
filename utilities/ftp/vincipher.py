import collections
import hashlib
import itertools
import string

lowercase = collections.deque(string.ascii_lowercase + string.digits)

def encrypt(message : str, key , multiplier : int):
    compressed_message = message.lower()

    for punctuation in str(string.punctuation + ' '):
        compressed_message = compressed_message.replace(punctuation,'')


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


username = "thomasthecat"
secret = "zaqw"

encrypted_text = encrypt(username , secret , -1)

hex_digest = "6314b5b113d8c149d79aa42360ee31e4" # md5 of username

print(encrypted_text)

for p in itertools.permutations(string.ascii_lowercase , 4):
    key = ''.join(p)
    decrypted = decrypt(encrypted_text , key)
    
    s = hashlib.md5()
    s.update(decrypted.encode())
    cur_hash = s.hexdigest()

    if cur_hash == hex_digest:
        print(decrypted)
        break

    

