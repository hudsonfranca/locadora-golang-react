package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"path"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/db"
	"github.com/hudsonfranca/locadora/src/models"
	"github.com/rs/xid"
	"gorm.io/gorm"
)

func PostImage(ctx *gin.Context) {
	var image models.Images
	var car models.Cars
	guid := xid.New()

	form, _ := ctx.MultipartForm()
	files := form.File["upload[]"]

	id := ctx.Param("id")

	res := db.DB.First(&car, id)

	if errors.Is(res.Error, gorm.ErrRecordNotFound) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"error":  "carro não encontrado",
		})
		return
	}

	for _, file := range files {

		fileName := fmt.Sprintf("%s%s", guid.String(), filepath.Ext(file.Filename))

		dist := path.Join("./uploads", fileName)

		file.Filename = fileName

		err := ctx.SaveUploadedFile(file, dist)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status": http.StatusInternalServerError,
				"error":  err.Error(),
			})
			return
		}

		image.CarsID = car.ID
		image.Path = dist
		image.Name = fileName
		created := db.DB.Create(&image)

		if created.Error != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status": http.StatusInternalServerError,
				"error":  created.Error.Error(),
			})
			return
		}
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   fmt.Sprintf("%d uploads", len(files)),
	})
}
