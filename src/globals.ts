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

export const playerData ={

  balance : 1000,
  currentBet : 0

}

// Z-index constants for proper layering
export const Z_INDEX = {
    BACKGROUND: 0,
    TABLE: 10,
    CARDS: 10,
    CHIPS: 20,
    POPUP_OVERLAY: 30,
    POPUPS: 40,
    BUTTONS: 50
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

