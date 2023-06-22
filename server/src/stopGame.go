package src

import (
	"game-of-life-server/src/lib"

	"github.com/gin-gonic/gin"
)

func StopGame(c *gin.Context) {
	lib.StopWorker()

	c.JSON(200, gin.H{
		"status": "stopped",
	})
}
