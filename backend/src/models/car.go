package models

import (
	"gorm.io/gorm"
)

type Cars struct {
	gorm.Model
	CarModel        string   `gorm:"not null" json:"carModel" binding:"required"`
	Price           float64  `gorm:"not null" json:"price" binding:"required"`
	Seats           int      `gorm:"not null" json:"seats" binding:"required"`
	Transmission    string   `gorm:"not null" json:"transmission" binding:"required"`
	AirConditioning bool     `gorm:"not null" json:"airConditioning" binding:"required"`
	Doors           int      `gorm:"not null" json:"doors" binding:"required"`
	Status          bool     `gorm:"not null" json:"status" binding:"required"`
	Rent            []Rent   `json:"rent"`
	Images          []Images `json:"images"`
}
