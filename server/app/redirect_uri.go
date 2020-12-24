package app

import (
	"net/url"
	"strings"
)

var providers = []string{
	"all-ob-all",
	"all-oauth-all",
	"uk-cs-mock",
	"all-stet-all",
	"all-oidc-all",
	"all-http-all",
	"all-fints-all",
	"all-xs2a-all",
	"all-polishapi-all",
}

var scopes = []string{
	"info",
	"accounts",
	"balance",
	"cards",
	"transactions",
	"direct_debits",
	"standing_orders",
	"offline_access",
}

func (a *app) RedirectURI() string {
	u, _ := url.Parse(authBaseURL)

	values := u.Query()
	values.Set("response_type", "code")
	values.Set("client_id", a.clientID)
	values.Set("redirect_uri", a.redirectURI)
	values.Set("providers", strings.Join(providers, " "))
	values.Set("scope", strings.Join(scopes, " "))

	u.RawQuery = values.Encode()

	return u.String()
}
