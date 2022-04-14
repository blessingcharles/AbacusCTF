#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void generate_password(char *str, int len)
{

    char hash[] = {
        0x43, 0x12, 0x13, 0x21, 0x64, 0x42,
        0x13, 0x52, 0x15, 0x32, 0x19, 0x13,
        0x23, 0x61, 0x14, 0x51, 0x28, 0x12,
        0x13, 0x32, 0x12, 0x42};

    for (int i = 0; i < len; i++)
    {
        str[i] = str[i] ^ hash[i];

        printf("0x%x,", str[i]);
    }
}

void main(int argc, char **argv)
{

    char password[] = "abacus{fr13nd5f0r3v3r}";

    int password_len = strlen(password);
    generate_password(password, password_len);
}