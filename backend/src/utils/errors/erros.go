package errors

import "net/http"

type Erro struct {
	Message string
	Status  int
	Error   string
}

func NewInternalServerError(message string) *Erro {
	return &Erro{
		Message: message,
		Status:  http.StatusInternalServerError,
		Error:   "internal_server_error",
	}
}

func NewNotFound(message string) *Erro {
	return &Erro{
		Message: message,
		Status:  http.StatusNotFound,
		Error:   "not_found",
	}
}

func NewBadRequest(message string) *Erro {
	return &Erro{
		Message: message,
		Status:  http.StatusBadRequest,
		Error:   "bad_request",
	}
}
