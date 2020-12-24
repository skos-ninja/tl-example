package app

import (
	"context"
	"net/http"
)

const authBaseURL = "https://auth.truelayer.com"
const baseURL = "https://api.truelayer.com"

type App interface {
	Accounts(ctx context.Context, token string) (*AccountResponse, error)
	Balance(ctx context.Context, token, accountID string) (*BalanceResponse, error)
	Transactions(ctx context.Context, token, accountID string) (*TransactionsResponse, error)
	DirectDebits(ctx context.Context, token, accountID string) (*DirectDebitsResponse, error)
	StandingOrders(ctx context.Context, token, accountID string) (*StandingOrdersResponse, error)

	Providers(ctx context.Context) (*ProvidersResponse, error)
	ExchangeCode(ctx context.Context, code string) (string, error)
	RedirectURI() string
}

type app struct {
	clientID, clientSecret, redirectURI string
	client                              *http.Client
}

func New(clientID, clientSecret, redirectURI string) App {
	return &app{
		clientID:     clientID,
		clientSecret: clientSecret,
		redirectURI:  redirectURI,
		client:       http.DefaultClient,
	}
}
