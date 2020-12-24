package rpc

import (
	"encoding/json"
	"net/http"
)

func (rpc *rpc) Providers(w http.ResponseWriter, r *http.Request) {
	response, err := rpc.app.Providers(r.Context())
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
