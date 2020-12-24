package app

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/shopspring/decimal"
)

type TransactionsResponse struct {
	Results []Transaction `json:"results"`
}

type Transaction struct {
	TransactionID string    `json:"transaction_id"`
	Timestamp     time.Time `json:"timestamp"`
	Description   string    `json:"description"`

	TransactionType           string   `json:"transaction_type"`
	TransactionCategory       string   `json:"transaction_category"`
	TransactionClassification []string `json:"transaction_classification"`
	MerchantName              string   `json:"merchant_name"`

	Amount   decimal.Decimal `json:"amount"`
	Currency string          `json:"currency"`
	Meta     interface{}     `json:"meta"`

	RunningBalance struct {
		Amount   decimal.Decimal `json:"amount"`
		Currency string          `json:"currency"`
	} `json:"running_balance,omitempty"`
}

func (a *app) Transactions(ctx context.Context, token, accountID string) (*TransactionsResponse, error) {
	headers := map[string]string{
		"Authorization": token,
	}
	response := &TransactionsResponse{}
	err := performRequest(ctx, http.MethodGet, fmt.Sprintf("%s/data/v1/accounts/%s/transactions", baseURL, accountID), headers, nil, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
