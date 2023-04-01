#include <iostream>
#include <cstdlib>

#include <cstring>

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

void generate_password(char *str, int len, int rotation_count)
{
    unsigned char hash[] = {0x43, 0x12, 0x17, 0x42, 0x18, 0x12,
                            0x87, 0x32, 0x61, 0x14, 0x54, 0x91,
                            0x39, 0x21, 0x54, 0x21, 0x67, 0x50};

    for (int i = 0; i < len; i++)
    {
        for (int j = 0; j < rotation_count; j++)
        {
            str[i] = str[i] ^ hash[i];
        }
    }
    unsigned char *ustr = reinterpret_cast<unsigned char *>(str);

    printf("\n Len : 0x%d \n", reduce(hash, len));

    encrypt(ustr, len, reduce(hash, len) % 0xf0);

    for (int i = 0; i < len; i++)
    {
        printf("0x%x , ", ustr[i]);
    }
}

int main(int argc, char **argv)
{
    if (argc < 2)
    {
        fprintf(stderr, "%s<Password-to-encrypt>\n", argv[0]);
        exit(-1);
    }
    generate_password(argv[1], strlen(argv[1]), 2);
    return 0;
}