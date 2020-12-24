package rpc

import (
	"encoding/json"
	"net/http"
)

type RedirectResponse struct {
	URI string `json:"uri"`
}

func (rpc *rpc) Redirect(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	uri := rpc.app.RedirectURI()

	resp := &RedirectResponse{
		URI: uri,
	}
	json.NewEncoder(w).Encode(resp)
}
