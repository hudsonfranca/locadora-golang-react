package controllers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/dto"
	"github.com/hudsonfranca/locadora/src/models"
	"gorm.io/gorm"
)

func PostCar(ctx *gin.Context) {
	var car models.Cars
	// ctx = ctx.Request.Context()

	if e := ctx.ShouldBindJSON(&car); e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  e.Error(),
		})
		return
	}

	created := db.DB.Create(&car)

	if created.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  created.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &car,
	})
}

func GetCars(ctx *gin.Context) {
	var cars []models.Cars

	res := db.DB.Where("status = ?", true).Preload("Images").Find(&cars)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	setImageUrl(cars, ctx.Request.Host)

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &cars,
	})

}

func GetCarById(ctx *gin.Context) {
	var car models.Cars

	id := ctx.Param("id")

	res := db.DB.Preload("Images").First(&car, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	for i, _ := range car.Images {
		car.Images[i].Url = fmt.Sprintf("%s/%s", ctx.Request.Host, car.Images[i].Path)
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &car,
	})
}

func UpdateCar(ctx *gin.Context) {
	var car models.Cars
	var payload dto.UpdateCar

	if e := ctx.ShouldBindJSON(&payload); e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  e.Error(),
		})
		return
	}

	id := ctx.Param("id")
	res := db.DB.First(&car, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	if payload.CarModel != "" {
		car.CarModel = payload.CarModel
	}

	if payload.Seats > 0 {
		car.Seats = payload.Seats
	}

	if payload.Status != car.Status {
		car.Status = payload.Status
	}

	if payload.Transmission != "" {
		car.Transmission = payload.Transmission
	}

	if payload.Price > 0 {
		car.Price = payload.Price
	}

	if payload.Doors > 0 {
		car.Doors = payload.Doors
	}

	if payload.AirConditioning {
		car.AirConditioning = payload.AirConditioning
	}

	updated := db.DB.Save(&car)

	if updated.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  updated.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &car,
	})

}

func DeleteCar(ctx *gin.Context) {
	var car models.Cars

	id := ctx.Param("id")

	res := db.DB.First(&car, id)
	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
	}

	deleted := db.DB.Delete(&car)

	if deleted.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  deleted.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &car,
	})
}

func setImageUrl(cars []models.Cars, host string) {
	for i, _ := range cars {
		for j, _ := range cars[i].Images {
			cars[i].Images[j].Url = fmt.Sprintf("%s/%s", host, cars[i].Images[j].Path)
		}
	}
}
