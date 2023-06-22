package lib

func Iteration(board [][]int) [][]int {
	gridSize := len(board)

	newBoard := BuildBoard(len(board))
	for row_index, row := range board {
		for col_index, col := range row {
			liveNeighbours := 0

			for k := row_index - 1; k <= row_index+1; k++ {
				if k < 0 || k >= gridSize {
					continue
				}

				for l := col_index - 1; l <= col_index+1; l++ {
					if l < 0 || l >= gridSize {
						continue
					}

					cell := board[k][l]
					if cell == 1 {
						liveNeighbours++
					}
				}
			}

			liveNeighbours = liveNeighbours - col
			// fmt.Printf("row %v col %v", row_index, col_index)BuildBoard(size int)
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

	return newBoard
}
