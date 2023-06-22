Conways Game of life
Server - Go
Client - NextJS

This is just a small app to learn conways game of life, get a bit more experience in NextJS and learn websockets and get a better understanding of threads in Go

This will never be hosted and some of the code is not the best. One day I may clean it up.

To run it yourself clone the code and use `docker-compose up` to run it. 

~~1. Build the client~~
~~2. Throw into Docker for funs~~
~~3. Learn the game of life~~
~~4. Build the server~~
~~5. Communication between client and server with sockets~~

<h5>
Links
</h5>

http://pi.math.cornell.edu/~lipa/mec/lesson6.html
https://github.com/charmbracelet/bubbletea
https://github.com/rivo/tview

Game rules:
1. If a live cell has one or no neighbours it dies -> solitude
2. If a live cell has four or more neighbours it dies -> overpopulation
3. If a live cell has two or three neighbours it lives
4. If a dead cell has two or three neighbours it revives