# nuobinarybot
binary bot<br/>
demo <br/>

| Deploy | Hostane |
| ------ | ------ |
| Vercel | https://nuobinarybot.vercel.app |
| Netlify | https://nuobinarybot.netlify.app |

```ts
type Config = {
  expired: number
  name: string
  limitAccounts: string[] // ["*"] = allow-all
  market: string
}
```
```js
function main(event){
  console.log(event)
  switch(event.msg_type){
    case "login":
         break
    case "price":
         break
  }
}
Bot.start(main, config)
```
Event-Data
```ts
type EventData{
  msg_type: string
  // msg_type = "login"
  id: string // CR123456, VRTC12345678
  balance: number
  // msg_type = "price"
  price: string
  market: string
  epoch: string // 00:00:00 (UTC-Time)
  // msg_type = "open_positions"
  trade_status: string
  profit: number
  sold: string
  payout: number
  desc: string 
  amount: number
  reff_id: number
  contract: string
  // msg_type = "balance"
  balance: number
  // msg_type = "prices_history"
  prices: number[]
  pip_size: number
  // msg_type = "error"
  message: string
  code: string
}
```
