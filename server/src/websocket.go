package src

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	// uuid "github.com/satori/go.uuid"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024 * 1024 * 1024,
	WriteBufferSize: 1024 * 1024 * 1024,
	//Solving cross-domain problems
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WsHandler(c *gin.Context) {
	// conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	// if err != nil {
	// 	c.JSON(400, err)
	// 	return
	// }

	// client := &Client{
	// 	id: uuid.Must(uuid.NewV4(), nil).String(),
	// 	socket: conn,
	// 	send: make(chan []byte),
	// }

	// manager
}
