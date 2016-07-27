## Install

```sh
npm install tweetlite-moco
```

## Usage

```sh
tweetlite use --src=~/.tweetlite/node_modules/tweetlite-moco
--commands=~/.tweetlite/ex_commands.js
--account=johndoe
--message=true
--mention=334xxx // johndoe user id
```
## Module Usage

```js
import TweetLite from 'tweetlite-core';
import mocoFN from 'tweetlite-moco';

const moco = mocoFN.use();
const TT = new TweetLite({conf})

moco.call(TT, {
	commands: `${__dirname}/commands.js`,
	message: true, // message mod actived
  	mention:`xxxx` // mention mod actived && need johndoe user id
})

```
