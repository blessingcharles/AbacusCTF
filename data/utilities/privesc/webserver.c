#include <unistd.h>
#include <stdio.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <ctype.h>
#include <time.h>

#define PORT 8036
#define BUFF_SIZE 1024
#define SA struct sockaddr_in

char *html = "[ Enter your thoughts ]\n";
int create_server(SA address)
{

    int sock_fd;
    if ((sock_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
    {
        fprintf(stderr, "failed to accept");
        exit(EXIT_FAILURE);
    }

    if (bind(sock_fd, (struct sockaddr *)&address,
             sizeof(address)) < 0)
    {
        fprintf(stderr, "failed to accept");
        exit(EXIT_FAILURE);
    }
    if (listen(sock_fd, 3) < 0)
    {
        fprintf(stderr, "failed to accept");
        exit(EXIT_FAILURE);
    }
    return sock_fd;
}

void print_banner(int year , int starts , int dummy){

    printf("[+] Welcome To Abacus CTF %d : starts : %d \n" , year , starts);
}

void subroutine(){
    __asm__("pop %rsi");
    __asm__("ret");
    __asm__("pop %rdx");
    __asm__("ret");
}

int handle_client(int new_socket)
{
    char buffer[64] = {0};
    memset(buffer, 0, 64);

    write(new_socket, html, strlen(html));
    recv(new_socket, buffer, BUFF_SIZE, 0);

    return 0;
}

int main(int argc, char **argv)
{
    int server_fd, new_socket;
    SA address;
    int addrlen = sizeof(address);

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = inet_addr("127.0.0.1");
    address.sin_port = htons(PORT);

    server_fd = create_server(address);

    printf("server file descriptor : %d \n", server_fd);
    printf("Multithreaded th3h04x webserver listening on : %d\n", PORT);
    int year = 2022 , start = 24 , tempf = 8;
    print_banner(year , start , tempf   );

    while (1)
    {
        if ((new_socket = accept(server_fd, (struct sockaddr *)&address,
                                 (socklen_t *)&addrlen)) < 0)
        {
            fprintf(stderr, "failed to accept");
            exit(EXIT_FAILURE);
        }
        printf("\n--------------------------------------------------------------------------\n");
        printf("new client --> spawning new child with fd : %d\n",new_socket);
        if (fork() == 0)
        {
            // child process
            close(server_fd);
            time_t t;
            time(&t);
            printf("Client Connected successfully  at %s\n", ctime(&t));
            handle_client(new_socket);
            send(new_socket, "connection closed\n", strlen("connection closed\n"), 0);
            return 0;
        }
        close(new_socket);
    }
    return 0;
}