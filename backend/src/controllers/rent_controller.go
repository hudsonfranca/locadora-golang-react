package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/dto"
	"github.com/hudsonfranca/locadora/src/models"
	"gorm.io/gorm"
)

// Cria um novo Registro de rent
func PostRent(ctx *gin.Context) {
	var rent models.Rent

	if e := ctx.ShouldBindJSON(&rent); e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  e.Error(),
		})
		return
	}

	created := db.DB.Create(&rent)

	if created.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  created.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &rent,
	})
}

func GetRentByID(ctx *gin.Context) {
	var rent models.Rent

	id := ctx.Param("id")

	res := db.DB.First(&rent, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &rent,
	})
}

func GetRented(ctx *gin.Context) {
	var rent []models.Rent

	res := db.DB.Find(&rent)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &rent,
	})
}

func GetRentedByUserId(ctx *gin.Context) {
	var user models.Users

	id := ctx.Param("id")

	res := db.DB.Preload("Rent").First(&user, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	user.Password = ""

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &user.Rent,
	})
}

func UpdateRent(ctx *gin.Context) {
	var rent models.Rent
	var payload dto.UpdateRent

	if e := ctx.ShouldBindJSON(&payload); e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  e.Error(),
		})
		return
	}

	id := ctx.Param("id")

	res := db.DB.First(&rent, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	if !payload.From.IsZero() {
		rent.From = payload.From
	}

	if !payload.To.IsZero() {
		rent.To = payload.To
	}

	if payload.UserID > 0 {
		rent.UsersID = payload.UserID
	}

	if payload.CarID > 0 {
		rent.CarsID = payload.CarID
	}

	if payload.Status {
		rent.Status = payload.Status
	}

	updated := db.DB.Save(&rent)

	if updated.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  updated.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &rent,
	})
}

func DeleteRent(ctx *gin.Context) {
	var rent models.Rent

	id := ctx.Param("id")

	res := db.DB.First(&rent, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	deleted := db.DB.Delete(&rent)

	if deleted.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  deleted.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &rent,
	})
}
