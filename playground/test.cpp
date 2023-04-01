#include <iostream>
#include <cstring>

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

void decrypt(unsigned char *data, size_t len, unsigned char key)
{
    unsigned char *decryptedData = new unsigned char[len];
    memcpy(decryptedData, data, len);

    for (size_t i = 0; i < len; i++)
    {
        key = ((key << 1) | (key >> 7)) ^ i;
        decryptedData[i] = ((decryptedData[i] & 0x7F) << 1) | ((decryptedData[i] & 0x01) << 7) | ((key & 0x80) >> 7);
        decryptedData[i] ^= key;
    }

    memcpy(data, decryptedData, len);
    delete[] decryptedData;
}

int main()
{
    unsigned char data[] = {0x74, 0x68, 0x6f, 0x6d, 0x61, 0x73};
    unsigned char key = 0x140;
    size_t len = sizeof(data) / sizeof(unsigned char);

    std::cout << "Input data: ";
    for (size_t i = 0; i < len; i++)
    {
        std::cout << std::hex << (int)data[i] << " ";
    }
    std::cout << std::endl;

    encrypt(data, len, key);

    std::cout << "Encrypted data: ";
    for (size_t i = 0; i < len; i++)
    {
        std::cout << std::hex << (int)data[i] << " ";
    }
    std::cout << std::endl;

    decrypt(data, len, key);

    std::cout << "Decrypted data: ";
    for (size_t i = 0; i < len; i++)
    {
        std::cout << std::hex << (int)data[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}
