#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void succeed()
{
    printf("Hurrah , you succeeded !.\n The password you cracked is the flag!! ; ) \n");
}

void failed()
{
    printf("Password Checker Failed\n");
    exit(-1);
}
void password_checker(char *str, int len)
{

    char hash[] = {
        0x43, 0x12, 0x13, 0x21, 0x64, 0x42,
        0x13, 0x52, 0x15, 0x32, 0x19, 0x13,
        0x23, 0x61, 0x14, 0x51, 0x28, 0x12,
        0x13, 0x32, 0x12, 0x42};

    char pass[] = {
        0x22, 0x70, 0x72, 0x42, 0x11, 0x31,
        0x68, 0x34, 0x67, 0x3, 0x2a, 0x7d,
        0x47, 0x54, 0x72, 0x61, 0x5a, 0x21,
        0x65, 0x1, 0x60, 0x3f};

    int user_pass_len = strlen(str);

    if (user_pass_len != len)
    {
        failed();
    }

    for (int i = 0; i < len; i++)
    {
        str[i] = (str[i] ^ hash[i]);
    }
    for (int i = 0; i < len; i++)
    {
        if (str[i] != pass[i])
        {
            failed();
        }
    }
    succeed();
}
void main(int argc, char **argv)
{
    if (argc < 2)
    {
        fprintf(stderr, "%s <Password> \n", argv[0]);
        exit(-1);
    }

    password_checker(argv[1], 22);
}