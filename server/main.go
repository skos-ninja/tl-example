package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/skos-ninja/tl-example/server/app"
	"github.com/skos-ninja/tl-example/server/rpc"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	var dir string
	var clientID string
	var clientSecret string
	var redirectURI string

	flag.StringVar(&dir, "dir", "build", "The ui directory to serve files from. Defaults to the current dir")
	flag.StringVar(&clientID, "client-id", "jakeoliver-2f1d02", "")
	flag.StringVar(&clientSecret, "client-secret", "", "")
	flag.StringVar(&redirectURI, "redirect-uri", "http://localhost:3000/callback", "")
	flag.Parse()
	r := mux.NewRouter()

	app := app.New(clientID, clientSecret, redirectURI)
	routes := rpc.New(app)

	r.HandleFunc("/api/health", routes.Health)

	api := r.PathPrefix("/api").Methods("POST").Subrouter()
	api.HandleFunc("/exchange", routes.Exchange)
	api.HandleFunc("/redirect", routes.Redirect)
	api.HandleFunc("/providers", routes.Providers)
	api.HandleFunc("/accounts", routes.Accounts)
	api.HandleFunc("/balance/{account}", routes.Balance)
	api.HandleFunc("/transactions/{account}", routes.Transactions)
	api.HandleFunc("/direct_debits/{account}", routes.DirectDebits)
	api.HandleFunc("/standing_orders/{account}", routes.StandingOrders)

	// SPA handler
	spa := rpc.NewSPA(dir, "index.html")
	r.PathPrefix("/").Handler(spa)

	loggedRouter := handlers.LoggingHandler(os.Stdout, r)
	recoveryRouter := handlers.RecoveryHandler()(loggedRouter)
	srv := &http.Server{
		Handler: recoveryRouter,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Printf("Server listening on %s", srv.Addr)
	log.Fatal(srv.ListenAndServe())
}
