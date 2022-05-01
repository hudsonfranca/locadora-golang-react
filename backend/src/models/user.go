package models

import (
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Name        string  `json:"name" gorm:"not null" binding:"required"`
	LastName    string  `json:"lastName" gorm:"not null" binding:"required"`
	CPF         string  `json:"cpf" gorm:"unique;not null" binding:"required"`
	Address     Address `json:"address" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Rent        []Rent  `json:"rent"`
	Password    string  `json:"password" gorm:"not null" binding:"required"`
	Email       string  `json:"email" gorm:"not null" binding:"required,email"`
	PhoneNumber string  `json:"phoneNumber" gorm:"not null" binding:"required"`
	Role        string  `json:"role" gorm:"not null" binding:"required"`
}
