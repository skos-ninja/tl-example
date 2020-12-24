import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import { BankCallback } from './banks/BankCallback';
import { AccountDetails } from './account/AccountDetails';
import { BankRedirect } from './banks/BankRedirect';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <div>Home</div>
            </Route>

            <Route path="/add-account">
                <BankRedirect />
            </Route>

            <Route path="/callback">
                <BankCallback />
            </Route>

            <Route path="/banks/:tokenId/:accountId">
                <AccountDetails />
            </Route>
        </Switch>
    )
}