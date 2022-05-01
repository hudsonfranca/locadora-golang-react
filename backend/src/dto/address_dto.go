package dto

import "gorm.io/gorm"

type UpdateAddress struct {
	gorm.Model
	StreetAddress string `json:"streetAddress"`
	ZipCode       string `json:"zipCode"`
	Number        int    `json:"number"`
	City          string `json:"city"`
	District      string `json:"district"`
	State         string `json:"state"`
	UserID        uint   `json:"userID"`
}
