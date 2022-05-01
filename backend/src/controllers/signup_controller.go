package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/auth"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SignUp(ctx *gin.Context) {
	var user models.Users
	var payload models.Users
	var err error

	if err = ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  err.Error(),
		})
		return
	}

	if res := db.DB.Where("Email = ?", payload.Email).First(&user); !errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  "já existe um user com esse Email",
		})
		return
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  err.Error(),
		})
		return
	}

	payload.Password = string(bytes)

	created := db.DB.Create(&payload)

	if created.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  created.Error.Error(),
		})
		return
	}

	token, err := auth.GenerateJWT(payload.ID, payload.Email, payload.Role)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  err.Error(),
		})
		return
	}

	ctx.SetCookie(
		"Authorization",
		token,
		3600,
		"/",
		"localhost",
		false,
		false,
	)

	payload.Password = ""

	ctx.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"data":   &payload,
	})
}
