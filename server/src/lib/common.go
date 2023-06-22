package lib

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
