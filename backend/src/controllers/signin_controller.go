package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/auth"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/dto"
	"github.com/hudsonfranca/locadora/src/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SignIn(ctx *gin.Context) {
	var user models.Users
	var authentication dto.Authentication
	var err error

	if err = ctx.ShouldBindJSON(&authentication); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  err.Error(),
		})
		return
	}

	res := db.DB.Where("Email = ?", authentication.Email).First(&user)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusForbidden, gin.H{
			"status": http.StatusForbidden,
			"error":  "email ou senha incorretos",
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(authentication.Password))

	if err != nil {
		ctx.JSON(http.StatusForbidden, gin.H{
			"status": http.StatusForbidden,
			"error":  "email ou senha incorretos",
		})
		return
	}

	token, err := auth.GenerateJWT(user.ID, user.Email, user.Role)

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

	user.Password = ""

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &user,
	})

}
