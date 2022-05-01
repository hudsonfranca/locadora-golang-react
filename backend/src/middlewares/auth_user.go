package middlewares

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/hudsonfranca/locadora/src/auth"
)

func IsAuthorized() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		headerToken, err := ctx.Cookie("Authorization")

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"status": http.StatusForbidden,
				"error":  "token invalido",
			})
			return
		}

		token, err := auth.ValidateJWT(headerToken)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"status": http.StatusForbidden,
				"error":  "token invalido",
			})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			ctx.Set("userId", claims["id"])
			ctx.Next()
		}
	}
}
