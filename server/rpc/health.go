package rpc

import (
	"encoding/json"
	"net/http"
)

func (rpc *rpc) Health(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}
