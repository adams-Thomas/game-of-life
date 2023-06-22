package src

import (
	"fmt"
	"game-of-life-server/src/lib"

	"github.com/gin-gonic/gin"
)

func StartGame(c *gin.Context) {
	var curGame game

	if err := c.BindJSON(&curGame); err != nil {
		fmt.Println(err)
		return
	}

	gridSize := len(curGame.Board)
	if gridSize < 1 {
		c.JSON(
			400,
			gin.H{
				"message": "Invalid board/grid size",
			},
		)
		return
	}

	lib.StartWorker(curGame.Board)

	c.JSON(200, gin.H{
		"status": "game started",
	})
}
