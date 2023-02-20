import { Howl, SoundSpriteDefinitions } from "howler";
import {
  ExtensionType,
  LoadAsset,
  LoaderParserPriority,
  checkExtension,
  settings,
} from "pixi.js";

interface ISoundSpriteJson {
  urls: string[];
  sprite: SoundSpriteDefinitions;
}

function isSoundSpriteJson(resource: any): boolean {
  return (
    // eslint-disable-next-line no-prototype-builtins
    resource.hasOwnProperty("urls") && resource.hasOwnProperty("sprite")
  );
}

export const PixiHowlerSpriteLoader = {
  extension: {
    name: "Howler Sprite Loader",
    priority: LoaderParserPriority.Normal,
    type: ExtensionType.LoadParser,
  },
  test(url: string) {
    return checkExtension(url, ".json");
  },
  async load(url: string) {
    const response = await settings.ADAPTER.fetch(url);
    const spriteJson = await response.json();

    return spriteJson as ISoundSpriteJson;
  },

  testParse(asset: unknown, options: LoadAsset): Promise<boolean> {
    const isJsonSoundModel =
      checkExtension(options.src, ".json") && isSoundSpriteJson(asset);

    return Promise.resolve(isJsonSoundModel);
  },

  parse(asset: ISoundSpriteJson): Promise<Howl> {
    return new Promise((resolve, reject) => {
      const soundInst: Howl = new Howl({
        src: asset.urls,
        sprite: asset.sprite,
        onload: () => resolve(soundInst),
        onloaderror: (id, message) => reject(message),
      });
    });
  },
};
