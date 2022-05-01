package models

import (
	"gorm.io/gorm"
)

type Address struct {
	gorm.Model
	StreetAddress string `gorm:"not null" json:"streetAddress" binding:"required"`
	ZipCode       string `gorm:"not null" json:"zipCode" binding:"required"`
	Number        int    `gorm:"not null" json:"number" binding:"required"`
	City          string `gorm:"not null" json:"city" binding:"required"`
	District      string `gorm:"not null" json:"district" binding:"required"`
	State         string `gorm:"not null" json:"state" binding:"required"`
	UsersID       uint   `json:"usersID" gorm:"not null"`
}
