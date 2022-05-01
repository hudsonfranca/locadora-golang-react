package db

import (
	"github.com/hudsonfranca/locadora/src/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func IniDB() {
	dsn := "host=locadora-db user=postgres password=admin dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	var err error
	// DB, err = gorm.Open(sqlite.Open("locadoraDB.db"), &gorm.Config{})
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	err = DB.AutoMigrate(
		&models.Cars{},
		&models.Images{},
		&models.Users{},
		&models.Address{},
		&models.Rent{},
	)

	if err != nil {
		panic("failed to migrate database")
	}
}

// docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=admin -d postgres:alpine
