package src

import (
	"fmt"

	"game-of-life-server/src/lib"

	"github.com/gin-gonic/gin"
)

type game struct {
	Board [][]int `json:"board"`
}

// Needs to take in a 2d array of some size
func SingleIteration(c *gin.Context) {
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

	newBoard := lib.Iteration(curGame.Board)
	response := game{Board: newBoard}

	c.JSON(
		200,
		response,
	)
}
