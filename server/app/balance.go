package app

import (
	"context"
	"fmt"
	"net/http"

	"github.com/shopspring/decimal"
)

type BalanceResponse struct {
	Results []Balance `json:"results"`
}

type Balance struct {
	Currency  string          `json:"currency"`
	Available decimal.Decimal `json:"available"`
	Current   decimal.Decimal `json:"current"`
	Overdraft decimal.Decimal `json:"overdraft"`
}

func (a *app) Balance(ctx context.Context, token, accountID string) (*BalanceResponse, error) {
	headers := map[string]string{
		"Authorization": token,
	}
	response := &BalanceResponse{}
	err := performRequest(ctx, http.MethodGet, fmt.Sprintf("%s/data/v1/accounts/%s/balance", baseURL, accountID), headers, nil, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
