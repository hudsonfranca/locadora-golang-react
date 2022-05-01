package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/models"
	"gorm.io/gorm"
)

func GetAddressById(ctx *gin.Context) {
	var address models.Address

	id := ctx.Param("id")
	res := db.DB.First(&address, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &address,
	})
}

func GetAddress(ctx *gin.Context) {
	var address []models.Address

	res := db.DB.Find(&address)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return

	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &address,
	})
}
