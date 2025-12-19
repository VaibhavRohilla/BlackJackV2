
import { Scene } from "./scene";
import { logger } from "./utils/logger";
import { Table } from "./table";
import { EndScreen } from "./endScreen";
import { POPUP } from "./globals";

/**
 * Main game scene that manages the blackjack table and game logic
 */
export class TableManager extends Scene {
    table: Table = new Table();
    endScreen: EndScreen | undefined = undefined;

    constructor() {
        super(false);
    }

    setupGame()
    {
        this.addChildToFullScene(this.table);
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
        if (this.endScreen) this.endScreen.resize();
        this.table.resize();
    }
}
