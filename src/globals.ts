import { Application } from "pixi.js";
import { SceneManager } from "./scenemanager";
import { Howl } from "howler";
import { isMobile } from "pixi.js";
import { MyEmitter } from "./myemitter";

export interface globalDataType {
  resources: Record<string, any>;
  emitter: MyEmitter | undefined;
  sceneManager: SceneManager | undefined;
  isMobile: boolean;
  // fpsStats: Stats | undefined;
  app: Application | undefined;
  soundResources: { [key: string]: Howl };
}

export const Globals: globalDataType = {
  resources: {},
  emitter: undefined,
  sceneManager : undefined,
  get isMobile() {
    //  return true;
    return isMobile.any;
  },
  // fpsStats: undefined,
  app: undefined,
  soundResources: {},
};


export enum POPUP  {
INSURANCE ="popups/BlackJack_insurance",
BLACKJACK= "popups/BlackJackPopup",
BURST ="popups/burstPopup",
LOST="popups/LoosePopup",
NOINSURANCE="popups/NoBlackJack_insurance",
PUSH="popups/PushPopup",
SURRENDER="popups/surrenderPopup",
WON="popups/WonPopup"
};

