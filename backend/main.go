package main

import (
	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/router"
)

func main() {
	engine := gin.Default()

	db.IniDB()

	// router.Use(middlewares.IsAuthorized())

	router.InitializeRoutes(engine)

	engine.Run(":3001")
}
