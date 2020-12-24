package app

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/shopspring/decimal"
)

type StandingOrdersResponse struct {
	Results []StandingOrder `json:"results"`
}

type StandingOrder struct {
	Frequency string      `json:"frequency"`
	Status    string      `json:"status"`
	Timestamp time.Time   `json:"timestamp"`
	Currency  string      `json:"currency"`
	Meta      interface{} `json:"meta"`

	NextPaymentDate   *time.Time       `json:"next_payment_date"`
	NextPaymentAmount *decimal.Decimal `json:"next_payment_amount"`

	FirstPaymentDate   *time.Time       `json:"first_payment_date"`
	FirstPaymentAmount *decimal.Decimal `json:"first_payment_amount"`

	FinalPaymentDate   *time.Time       `json:"final_payment_date"`
	FinalPaymentAmount *decimal.Decimal `json:"final_payment_amount"`

	Reference string `json:"reference"`
	Payee     string `json:"payee"`
}

func (a *app) StandingOrders(ctx context.Context, token, accountID string) (*StandingOrdersResponse, error) {
	headers := map[string]string{
		"Authorization": token,
	}
	response := &StandingOrdersResponse{}
	err := performRequest(ctx, http.MethodGet, fmt.Sprintf("%s/data/v1/accounts/%s/standing_orders", baseURL, accountID), headers, nil, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
