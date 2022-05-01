package dto

import (
	"time"

	"gorm.io/gorm"
)

type UpdateRent struct {
	gorm.Model
	From   time.Time `json:"from"`
	To     time.Time `json:"to"`
	Status bool      `json:"status"`
	UserID uint      `json:"userID"`
	CarID  uint      `json:"carID"`
}
