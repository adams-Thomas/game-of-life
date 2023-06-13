package src

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func RunGame(c *gin.Context) {
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

	newBoard := BuildBoard(gridSize)

	tempResponse := game{
		Board: newBoard,
	}
	c.JSON(200, tempResponse)
}
