package src

import (
	"fmt"

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

	newBoard := BuildBoard(gridSize)
	for row_index, row := range curGame.Board {
		for col_index, col := range row {
			liveNeighbours := 0

			// for i := -1; i <= 1; i++ {
			// 	for j := -1; j <= 1; j++ {
			// 		row_i := row_index + i
			// 		col_j := col_index + j
			// 		if (row_i > 0 && row_i < gridSize) && (col_j > 0 && col_j < gridSize) {
			// 			liveNeighbours += curGame.Board[row_i][col_j]
			// 		}
			// 	}
			// }
			for k := row_index - 1; k <= row_index+1; k++ {
				if k < 0 || k >= gridSize {
					continue
				}

				for l := col_index - 1; l <= col_index+1; l++ {
					if l < 0 || l >= gridSize {
						continue
					}

					cell := curGame.Board[k][l]
					if cell == 1 {
						liveNeighbours++
					}
				}
			}

			liveNeighbours = liveNeighbours - col
			// fmt.Printf("row %v col %v", row_index, col_index)
			if col == 1 && liveNeighbours < 2 {
				newBoard[row_index][col_index] = 0
			} else if col == 1 && liveNeighbours > 3 {
				newBoard[row_index][col_index] = 0
			} else if col == 0 && liveNeighbours == 3 {
				newBoard[row_index][col_index] = 1
			} else {
				newBoard[row_index][col_index] = col
			}
		}
	}

	response := game{Board: newBoard}

	c.JSON(
		200,
		response,
	)
}

func BuildBoard(size int) [][]int {
	board := make([][]int, size)

	for i := 0; i < size; i++ {
		board[i] = make([]int, size)
		for j := 0; j < size; j++ {
			board[i][j] = 0
		}
	}

	return board
}
