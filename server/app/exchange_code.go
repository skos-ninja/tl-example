package app

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

type tokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	TokenType    string `json:"token_type"`
	RefreshToken string `json:"refresh_token"`
}

func (a *app) ExchangeCode(ctx context.Context, code string) (string, error) {
	form := url.Values{}
	form.Set("grant_type", "authorization_code")
	form.Set("client_id", a.clientID)
	form.Set("client_secret", a.clientSecret)
	form.Set("redirect_uri", a.redirectURI)
	form.Set("code", code)

	headers := map[string]string{
		"Content-Type": "application/x-www-form-urlencoded",
	}
	exchangeCode := &tokenResponse{}
	err := performRequest(ctx, http.MethodPost, fmt.Sprint(authBaseURL, "/connect/token"), headers, strings.NewReader(form.Encode()), exchangeCode)
	if err != nil {
		return "", err
	}

	return exchangeCode.AccessToken, nil
}
