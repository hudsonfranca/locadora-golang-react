package dto

import "gorm.io/gorm"

type UpdateImage struct {
	gorm.Model
	Name  string `json:"name"`
	Path  string `json:"path"`
	Url   string `json:"url" gorm:"-:all"`
	CarID uint   `json:"carID"`
}
