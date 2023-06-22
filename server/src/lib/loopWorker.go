package lib

import (
	"fmt"
	"time"
)

type workerCommand struct {
	command string
	value   any
}

// Take in the initial board and a command struct
func worker(commands <-chan workerCommand) {
	fmt.Println("Starting")
	control := -1
	index := 0
	var gameBoard [][]int
	for control < 0 {
		select {
		case cmd := <-commands:
			if cmd.command == "start" {
				arrayType := fmt.Sprintf("%T", cmd.value)
				if arrayType != "[][]int" {
					fmt.Println("Wrong Value Type, should be 2d array of int")
					control = 5
					continue
				}

				gameBoard = cmd.value.([][]int)
			}

			if cmd.command == "stop" {
				control = 5
			}
		default:
			time.Sleep(250 * time.Millisecond)
			if gameBoard == nil {
				fmt.Println("No board received yet, waiting...")
				continue
			}
			gameBoard = Iteration(gameBoard)
			index++
			SendMessage(gameBoard)
		}
	}
	CloseConnection()
	fmt.Println("Stopping")
}

var commands = make(chan workerCommand)

func StartWorker(board [][]int) {
	go worker(commands)

	commands <- workerCommand{
		command: "start",
		value:   board,
	}
}

func StopWorker() {
	commands <- workerCommand{
		command: "stop",
		value:   "stop",
	}
}

func printBoard(board [][]int) {
	for _, row := range board {
		fmt.Println(row)
	}
}
