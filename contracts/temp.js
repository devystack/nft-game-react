
for (let token in action.payload[0]?.balances) {
    const parsedToken = action.payload[0].balances[token].split(' ');
    if (parsedToken[0].includes('.')) {
        state.balances[parsedToken[1].toLowerCase()] = parseFloat(
            parsedToken[0]
        ).toFixed(4);
    }
}

[ "15.0000 PLASMA", "15.0000 PLASMA", "15.0000 PLASMA" ]
[ "49965.0500 FWF", "253.9900 FWW", "43227.7143 FWG", "15811.0348 GOLD", "24.8679 WOOD", "10023.4510 FOOD" ]


void atomicassets::internal_decrease_balance(
    name owner,
    asset quantity
) {
    auto balance_itr = balances.require_find(owner.value,
        "The specified account does not have a balance table row");

    vector <asset> quantities = balance_itr->quantities;
    bool found_token = false;
    for (auto itr = quantities.begin(); itr != quantities.end(); itr++) {
        if (itr->symbol == quantity.symbol) {
            found_token = true;
            check(itr->amount >= quantity.amount,
                "The specified account's balance is lower than the specified quantity");
            itr->amount -= quantity.amount;
            if (itr->amount == 0) {
                quantities.erase(itr);
            }
            break;
        }
    }
    check(found_token,
        "The specified account does not have a balance for the symbol specified in the quantity");

    //Updating the balances table
    if (quantities.size() > 0) {
        balances.modify(balance_itr, same_payer, [&](auto &_balance) {
            _balance.quantities = quantities;
        });
    } else {
        balances.erase(balance_itr);
    }
}


void token::open( const name& owner, const symbol& symbol, const name& ram_payer )
{
   require_auth( ram_payer );

   check( is_account( owner ), "owner account does not exist" );

   auto sym_code_raw = symbol.code().raw();
   stats statstable( get_self(), sym_code_raw );
   const auto& st = statstable.get( sym_code_raw, "symbol does not exist" );
   check( st.supply.symbol == symbol, "symbol precision mismatch" );

   accounts acnts( get_self(), owner.value );
   auto it = acnts.find( sym_code_raw );
   if( it == acnts.end() ) {
      acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = asset{0, symbol};
      });
   }
}

asset a;         a.symbol, a.quantity
symbol s;        s.name(), s.value
asset::from_string("4611686018427387903 TKN")
symbol_type symb = string_to_symbol(4, sym.c_str());