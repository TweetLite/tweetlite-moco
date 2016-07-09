## Install

```sh
npm install twitbot-moco
```

## Usage

```sh
twitbot use --src=~/.twitbot/node_modules/twitbot-moco
--commands=~/.twitbot/ex_commands.js
--account=johndoe
--message=true
--mention=334xxx // johndoe user id
```
## Module Usage

```js
import Twitbot from 'twitbot-core';
import mocoFN from 'twitbot-moco';

const moco = mocoFN.use();
const TT = new Twitbot({conf})

moco.call(TT, {
	commands: `${__dirname}/commands.js`,
	message: true, // message mod actived
  mention:`xxxx` // mention mod actived && need johndoe user id
})

```
