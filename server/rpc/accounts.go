package rpc

import (
	"encoding/json"
	"log"
	"net/http"
)

func (rpc *rpc) Accounts(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	if token == "" {
		log.Fatal("Missing token")
	}

	response, err := rpc.app.Accounts(r.Context(), token)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
