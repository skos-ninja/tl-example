package rpc

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func (rpc *rpc) DirectDebits(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	token := r.Header.Get("Authorization")
	if token == "" {
		log.Fatal("Missing token")
	}

	response, err := rpc.app.DirectDebits(r.Context(), token, vars["account"])
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
