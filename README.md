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
}
Bot.start(main, config)
```
