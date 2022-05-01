package dto

import (
	"gorm.io/gorm"
)

type UpdateUser struct {
	gorm.Model
	Name        string        `json:"name"`
	LastName    string        `json:"lastName" `
	Address     UpdateAddress `json:"address"`
	Rent        []UpdateRent  `json:"rent"`
	PhoneNumber string        `json:"phoneNumber"`
	Role        string        `json:"role"`
}
