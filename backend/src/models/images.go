package models

import (
	"gorm.io/gorm"
)

type Images struct {
	gorm.Model
	Name   string `gorm:"not null" json:"name" binding:"required"`
	Path   string `gorm:"not null" json:"path" binding:"required"`
	Url    string `json:"url" gorm:"-:all"`
	CarsID uint   `json:"carsID" binding:"required"`
}
