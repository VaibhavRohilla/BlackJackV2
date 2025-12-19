import { Container, Sprite } from "pixi.js";
import { Globals } from "./globals";
import { config } from "./appconfig";

export class Table extends Container {
    table: Sprite = new Sprite();
    tableText: Sprite = new Sprite();
    constructor() {
        super();
        this.setupTable();


    }

   


    setupTable() {
        this.table = new Sprite(Globals.resources["Table/table"]);
        this.tableText = new Sprite(Globals.resources["Table/table_text"])
        this.table.anchor.set(0.5);
        this.tableText.anchor.set(0.5);
        this.addChild(this.table);
        this.addChild(this.tableText);

    }

    resize() {
        this.table.scale.set(0.5 * config.scaleFactor);
        this.tableText.scale.set(1 * config.scaleFactor)
        this.tableText.position.y = (-this.table.height / 4)
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
    }

}