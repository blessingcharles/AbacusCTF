#include <iostream>
#include <cstdlib>

#include <cstring>

using namespace std;

unsigned char reduce(unsigned char *data, size_t len)
{
    unsigned char result = 0;
    for (size_t i = 0; i < len; i++)
    {
        result ^= ((data[i] << (i % 4)) | (data[i] >> (8 - i % 4)));
        result += data[i] ^ i;
    }
    return result;
}

void encrypt(unsigned char *data, size_t len, unsigned char key)
{
    unsigned char *encryptedData = new unsigned char[len];
    memcpy(encryptedData, data, len);

    for (size_t i = 0; i < len; i++)
    {
        encryptedData[i] = ((encryptedData[i] ^ key) & 0x7F) | ((encryptedData[i] & 0x80) >> 1) | ((key & 0x01) << 7);
        key = ((key << 1) | (key >> 7)) ^ i;
    }

    memcpy(data, encryptedData, len);
    delete[] encryptedData;
}

void password_checker(char *str, int len, int rotation_count)
{
    unsigned char hash[] = {0x43, 0x12, 0x17, 0x42, 0x18, 0x12,
                            0x87, 0x32, 0x61, 0x14, 0x54, 0x91,
                            0x39, 0x21, 0x54, 0x21, 0x67, 0x50};

    unsigned char pass[] = {0x17, 0xfa, 0x26, 0x20, 0x35, 0xeb,
                            0x5, 0x1c, 0xe0, 0xdd, 0x25, 0x15,
                            0x8, 0x31, 0x62, 0x7c, 0x97, 0x2b};

    for (int i = 0; i < len; i++)
    {
        for (int j = 0; j < rotation_count; j++)
        {
            str[i] = str[i] ^ hash[i];
        }
    }

    unsigned char *ustr = reinterpret_cast<unsigned char *>(str);

    encrypt(ustr, len, reduce(hash, len) % 0xf0);
    for (int i = 0; i < 18; i++)
    {
        if (ustr[i] != pass[i])
        {
            printf("Password Checker Failed\n");
            exit(-1);
        }
    }
    printf("Lets Travel ,Hold your flags!");
}

int main(int argc, char **argv)
{
    if (argc < 2)
    {
        fprintf(stderr, "%s<Password>\n", argv[0]);
        exit(-1);
    }
    password_checker(argv[1], strlen(argv[1]), 2);
    return 0;
}