package dto

import "gorm.io/gorm"

type UpdateCar struct {
	gorm.Model
	CarModel        string        `json:"carModel"`
	Price           float64       `json:"price"`
	Seats           int           `json:"seats"`
	Transmission    string        `json:"transmission"`
	AirConditioning bool          `json:"airConditioning"`
	Doors           int           `json:"doors"`
	Status          bool          `json:"status"`
	Rent            []UpdateRent  `json:"rent"`
	Images          []UpdateImage `json:"images"`
}
