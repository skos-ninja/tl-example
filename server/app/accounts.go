package app

import (
	"context"
	"fmt"
	"net/http"
)

type AccountResponse struct {
	Results []Account `json:"results"`
}

type Account struct {
	AccountID   string `json:"account_id"`
	AccountType string `json:"account_type"`
	DisplayName string `json:"display_name"`
	Currency    string `json:"currency"`

	AccountNumber struct {
		IBAN     string `json:"iban"`
		Number   string `json:"number"`
		SortCode string `json:"sort_code"`
		SwiftBic string `json:"swift_bic"`
	} `json:"account_number"`

	Provider struct {
		ProviderID string `json:"provider_id"`
	} `json:"provider"`
}

func (a *app) Accounts(ctx context.Context, token string) (*AccountResponse, error) {
	headers := map[string]string{
		"Authorization": token,
	}
	response := &AccountResponse{}
	err := performRequest(ctx, http.MethodGet, fmt.Sprint(baseURL, "/data/v1/accounts"), headers, nil, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
