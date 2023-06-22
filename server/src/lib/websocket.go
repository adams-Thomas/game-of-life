package lib

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var ws *websocket.Conn

func InitConnection(c *gin.Context) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	var err error
	ws, err = upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println(err)
	}
}

func CloseConnection() {
	if ws == nil {
		fmt.Println("Websocket not initialized")
		return
	}

	err := ws.Close()
	if err != nil {
		fmt.Println("Error closing connection")
		fmt.Println(err)
	}
}

type gameBoard struct {
	Board [][]int `json:"board"`
}

func SendMessage(board [][]int) {
	if ws == nil {
		fmt.Println("Websocket not initialized")
		return
	}

	data := gameBoard{
		Board: board,
	}
	marshalled, _ := json.Marshal(data)

	err := ws.WriteMessage(websocket.BinaryMessage, marshalled)
	if err != nil {
		fmt.Println(err)
	}
}
