# nuobinarybot

binary bot<br/>
demo <br/>

| Deploy  | Hostane                          |
| ------- | -------------------------------- |
| Vercel  | https://nuobinarybot.vercel.app  |
| Netlify | https://nuobinarybot.netlify.app |

# Documentation

## Bot function Library

```js
Bot = {
  start: function(callback, config),
  stop : function(),
  buy  : function(object),
  log  : function(string, string | color | undefined),
  display: function(string),
  notify : function(string, success | warn | error),
  utils  : {
    getWormColor: function(number[])
  }
}
```

Ex:

```js
function main(e) {
  console.log(e);
}
var config = {};
Bot.start(main, config);
```

## Configuration

```ts
type Config = {
  expired: number;
  name: string;
  limitAccounts: string[]; // ["*"] = allow-all
  market: string;
};
```

> Bot Start

```js
function main(event) {
  console.log(event);
  switch (event.msg_type) {
    case "login":
      break;
    case "price":
      break;
  }
}
Bot.start(main, config);
```

## Event Data receipt

```ts
type EventData = {
  msg_type: string;
  // msg_type = "login"
  id: string; // CR123456, VRTC12345678
  balance: number;
  currency: string;
  // msg_type = "price"
  price: string;
  market: string;
  epoch: string; // 00:00:00 (UTC-Time)
  // msg_type = "open_positions"
  trade_status: string;
  profit: number;
  sold: string;
  payout: number;
  desc: string;
  amount: number;
  reff_id: number;
  contract: string;
  // msg_type = "balance"
  balance: number;
  // msg_type = "prices_history"
  prices: number[];
  pip_size: number;
  // msg_type = "error"
  message: string;
  code: string;
};
```

| Event        | Data                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| msg_type     | "login", "price", "open_positions", "balance","price_history", "error"                  |
| id           | CR123456, VRTC123456                                                                    |
| balance      | 10.000                                                                                  |
| currency     | "USD", "EUR", "LTC", "BTC", etc                                                         |
| price        | "9863.454"                                                                              |
| market       | "R_10","R_25","R_100","R_75","RDBULL","RDBEAR" ,etc                                     |
| epoch        | 00:00:00                                                                                |
| trade_status | "open", "won", "lost"                                                                   |
| profit       | 0.92, -1                                                                                |
| sold         | "Resale of this contract is not offered." ", "This contract has been sold."             |
| payout       | 1.92                                                                                    |
| desc         | "Win payout if Volatility 100 Index after 10 ticks is strictly higher than entry spot." |
| amount       | 1                                                                                       |
| reff_id      | 411680393788                                                                            |
| contract     | "RISE", "FALL", etc                                                                     |
| balance      | 10.000                                                                                  |
| prices       | [98424.142, 98545.242]                                                                  |
| pip_size     | 3 of price "9863.454"                                                                   |
| message      | string                                                                                  |
| code         | string                                                                                  |

## buy param

```ts
type param = {
  amount: number;
  contract: string;
  duration: number;
  duration_unit: string;
  barrier?: string;
  prediction?: string;
};
```

### example

| prop          | input                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| amount        | 1, 0.35, 0.004                                                                         |
| contract      | ['DIFFER', 'MATCH', 'RISE', 'FALL', 'HIGHER', 'LOWER', 'ODD', 'EVEN', 'UNDER', 'OVER'] |
| duration      | 1 - 10 for "t", 1 - 60 for "s"                                                         |
| duration_unit | 't','s','m','h' ( 't'=tick, 's'=second, 'm'=minute, 'h'=hour )                         |
| barrier       | '-0.0254', '+1.242' for contract ( TOUCH, NO TOUCH, HIGHER, LOWER )                    |
| prediction    | 0 - 9 for contract digit ( differ, match, even, odd, under, over)                      |
