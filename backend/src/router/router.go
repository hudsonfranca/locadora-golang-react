package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/controllers"
	"github.com/hudsonfranca/locadora/src/middlewares"
)

func InitializeRoutes(route *gin.Engine) {

	route.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3333"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3333"
		},
		MaxAge: 12 * time.Hour,
	}))

	route.POST("/car", controllers.PostCar)
	route.GET("/car", controllers.GetCars)
	route.GET("/car/:id", controllers.GetCarById)
	route.PATCH("/car/:id", controllers.UpdateCar)
	route.DELETE("/car/:id", controllers.DeleteCar)

	route.GET("/address", controllers.GetAddress)
	route.GET("/address/:id", controllers.GetAddressById)

	route.POST("/user", controllers.PostUser)
	route.GET("/user", controllers.GetUsers)
	route.GET("/user/:id", controllers.GetUserById)
	route.PATCH("/user/:id", controllers.UpdateUser)
	route.DELETE("/user/:id", controllers.DeleteUser)

	route.POST("/rent", controllers.PostRent)
	route.GET("/rent", controllers.GetRented)
	// route.GET("/rent/:id", controllers.GetRentByID)
	route.GET("/rent/user/:id", controllers.GetRentedByUserId)
	route.PATCH("/rent/:id", controllers.UpdateRent)
	route.DELETE("/rent/:id", controllers.DeleteRent)

	route.POST("/signup", controllers.SignUp)
	route.POST("/signin", controllers.SignIn)

	route.POST("/image/car/:id", controllers.PostImage)

	route.Static("/uploads", "./uploads")

	authUser := route.Group("/auth")
	authUser.Use(middlewares.IsAuthorized())
	authUser.GET("/authenticated", controllers.AuthenticatedUser)

}
