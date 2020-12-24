package rpc

import (
	"net/http"

	"github.com/skos-ninja/tl-example/server/app"
)

type RPC interface {
	Accounts(w http.ResponseWriter, r *http.Request)
	Balance(w http.ResponseWriter, r *http.Request)
	Transactions(w http.ResponseWriter, r *http.Request)
	DirectDebits(w http.ResponseWriter, r *http.Request)
	StandingOrders(w http.ResponseWriter, r *http.Request)

	Providers(w http.ResponseWriter, r *http.Request)
	Exchange(w http.ResponseWriter, r *http.Request)
	Redirect(w http.ResponseWriter, r *http.Request)

	Health(w http.ResponseWriter, r *http.Request)
}

type rpc struct {
	app app.App
}

func New(app app.App) RPC {
	return &rpc{app}
}
