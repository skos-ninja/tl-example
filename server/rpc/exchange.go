package rpc

import (
	"encoding/json"
	"net/http"
)

type ExchangeRequest struct {
	Code string `json:"code"`
}

type ExchangeResponse struct {
	AccessToken string `json:"access_token"`
}

func (rpc *rpc) Exchange(w http.ResponseWriter, r *http.Request) {
	var req ExchangeRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		panic(err)
	}

	token, err := rpc.app.ExchangeCode(r.Context(), req.Code)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	resp := &ExchangeResponse{
		AccessToken: token,
	}
	json.NewEncoder(w).Encode(resp)
}
