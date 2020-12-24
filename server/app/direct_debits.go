package app

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/shopspring/decimal"
)

type DirectDebitsResponse struct {
	Results []DirectDebit `json:"results"`
}

type DirectDebit struct {
	DirectDebitID string    `json:"direct_debit_id"`
	Timestamp     time.Time `json:"timestamp"`
	Name          string    `json:"name"`
	Status        string    `json:"status"`

	PreviousPaymentTimestamp *time.Time       `json:"previous_payment_timestamp"`
	PreviousPaymentAmount    *decimal.Decimal `json:"previous_payment_amount"`

	Currency string      `json:"currency"`
	Meta     interface{} `json:"meta"`
}

func (a *app) DirectDebits(ctx context.Context, token, accountID string) (*DirectDebitsResponse, error) {
	headers := map[string]string{
		"Authorization": token,
	}
	response := &DirectDebitsResponse{}
	err := performRequest(ctx, http.MethodGet, fmt.Sprintf("%s/data/v1/accounts/%s/direct_debits", baseURL, accountID), headers, nil, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
