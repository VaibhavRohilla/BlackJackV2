
import { Scene } from "./scene";
import { logger } from "./utils/logger";
import { Table } from "./table";
import { POPUP } from "./globals";
import { EndScreen } from "./endScreen";
import { chipsManager } from "./chipsManager";
import { MenuPopup } from "./MenuPopup";
import { ShopPopup } from "./ShopPopup";

/**
 * Main game scene that manages the blackjack table and game logic
 */
export class TableManager extends Scene {
    table: Table = new Table();
    endScreen: EndScreen | undefined = undefined;
    chipsManager : chipsManager = new chipsManager();
    menuPopup : MenuPopup = new MenuPopup();
    shopPopup : ShopPopup = new ShopPopup(()=>{},()=>{});

    constructor() {
        super(false);
        this.setupGame();
    }

    setupGame()
    {
        this.addChildToFullScene(this.table);
        this.addChildToFullScene(this.chipsManager);
        this.addChildToFullScene(this.shopPopup);
        this.addChildToFullScene(this.menuPopup);
        this.shopPopup.open();

        // this.callEndScreen();
    }


    callEndScreen() {
        this.endScreen = new EndScreen(POPUP.WON);
        this.addChildToFullScene(this.endScreen);
    }

    recievedMessage(msgType: string, msgParams: any): void {
        // Log message reception for debugging
        logger.debug(msgType, msgParams);
    }

    public update(): void {
        // logger.debug("MainScene update",dt);
    }

    public resize(): void {
        super.resize();
        this.chipsManager.resize();
        this.menuPopup.resize();

        if (this.endScreen) this.endScreen.resize();
        this.table.resize();
    }
}
