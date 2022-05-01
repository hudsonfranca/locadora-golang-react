package models

import (
	"time"

	"gorm.io/gorm"
)

type Rent struct {
	gorm.Model
	From    time.Time `gorm:"not null" json:"from" binding:"required"`
	To      time.Time `gorm:"not null" json:"to" binding:"required"`
	Status  bool      `gorm:"not null" json:"status" binding:"required"`
	UsersID uint      `json:"usersID" binding:"required"`
	CarsID  uint      `json:"carsID" binding:"required"`
}
