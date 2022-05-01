package auth

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type AuthCustomClaims struct {
	Id    uint   `json:"id"`
	Email string `json:"email"`
	Role  string `json:"role"`
	jwt.StandardClaims
}

const Secretkey = "secret"

func GenerateJWT(id uint, email, role string) (string, error) {

	claims := &AuthCustomClaims{
		id,
		email,
		role,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 48).Unix(),
			Issuer:    "teste",
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	s := []byte(Secretkey)
	t, err := token.SignedString(s)

	if err != nil {
		return "", err
	}

	return t, nil
}

func ValidateJWT(encodedToken string) (*jwt.Token, error) {
	return jwt.Parse(encodedToken, func(t *jwt.Token) (interface{}, error) {
		if _, isValid := t.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, fmt.Errorf("token inválido")
		}
		return []byte(Secretkey), nil
	})
}
