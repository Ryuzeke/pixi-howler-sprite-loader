# pixi-howler-sprite-loader

## Installation
```sh
npm i pixi-howler-sprite-loader
```

## Usage
```ts
import { PixiHowlerSpriteLoader } from "pixi-howler-sprite-loader";
import { extensions, Assets } from "pixi.js";
extensions.add(PixiHowlerSpriteLoader);

async function load() {
    const myAudio:Howl = await Assets.load('Game/sounds/game-sprite.json');
    
    // or get the sound if you already loaded it
    // const myAudio:Howl = Assets.get('Game/sounds/game-sprite.json');

    myAudio.play("sound-1")
}

load();
```

