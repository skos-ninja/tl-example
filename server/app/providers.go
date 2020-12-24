package app

import (
	"context"
	"fmt"
	"net/http"
)

type ProvidersResponse []Provider

type Provider struct {
	ProviderID  string   `json:"provider_id"`
	DisplayName string   `json:"display_name"`
	Country     string   `json:"country"`
	LogoURL     string   `json:"logo_url"`
	Scopes      []string `json:"scopes"`
}

func (a *app) Providers(ctx context.Context) (*ProvidersResponse, error) {
	response := &ProvidersResponse{}
	err := performRequest(ctx, http.MethodGet, fmt.Sprint(authBaseURL, "/api/providers"), nil, nil, response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
