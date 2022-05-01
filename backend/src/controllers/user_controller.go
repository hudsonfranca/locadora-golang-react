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

func PostUser(ctx *gin.Context) {
	var user models.Users
	var userCpf models.Users

	if e := ctx.ShouldBindJSON(&user); e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  e.Error(),
		})
		return
	}

	resp := db.DB.Where("cpf = ?", user.CPF).First(&userCpf)

	if !errors.Is(resp.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  "já existe um user com esse CPF",
		})
		return
	}

	res := db.DB.Create(&user)

	if res.Error != nil {
		ctx.JSON(http.StatusInternalServerError, res.Error)
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"data":   &user,
	})
}

func GetUsers(ctx *gin.Context) {
	var user []models.Users

	res := db.DB.Find(&user)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &user,
	})
}

func GetUserById(ctx *gin.Context) {
	var user models.Users

	id := ctx.Param("id")

	res := db.DB.Preload("Address").First(&user, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return

	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &user,
	})
}

func UpdateUser(ctx *gin.Context) {
	var user models.Users
	var payload dto.UpdateUser

	if e := ctx.ShouldBindJSON(&payload); e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": http.StatusBadRequest,
			"error":  e.Error(),
		})
		return
	}

	id := ctx.Param("id")
	res := db.DB.Preload("Address").First(&user, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return

	}

	if len(payload.LastName) > 0 {
		user.LastName = payload.LastName
	}

	if len(payload.PhoneNumber) > 0 {
		user.PhoneNumber = payload.PhoneNumber
	}

	if len(payload.Name) > 0 {
		user.Name = payload.Name
	}

	if len(payload.Address.StreetAddress) > 0 {
		user.Address.StreetAddress = payload.Address.StreetAddress
	}

	if len(payload.Address.ZipCode) > 0 {
		user.Address.ZipCode = payload.Address.ZipCode
	}

	if payload.Address.Number > 0 {
		user.Address.Number = payload.Address.Number
	}

	if len(payload.Address.City) > 0 {
		user.Address.City = payload.Address.City
	}

	if len(payload.Address.District) > 0 {
		user.Address.District = payload.Address.District
	}

	if len(payload.Address.State) > 0 {
		user.Address.State = payload.Address.State
	}

	updated := db.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&user)

	if updated.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  updated.Error.Error(),
		})
		return
	}
	user.Password = ""
	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &user,
	})
}

func DeleteUser(ctx *gin.Context) {
	var user models.Users

	id := ctx.Param("id")
	res := db.DB.First(&user, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  res.Error.Error(),
		})
		return

	}

	deleted := db.DB.Delete(&user)

	if deleted.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"error":  deleted.Error.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   &user,
	})
}

func AuthenticatedUser(ctx *gin.Context) {
	var user models.Users

	userId, _ := ctx.Get("userId")

	res := db.DB.Preload("Address").First(&user, userId)

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
		"data":   &user,
	})
}
