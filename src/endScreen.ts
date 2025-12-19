import { Container, Graphics, Sprite } from "pixi.js";
import { Globals, POPUP } from "./globals";
import { Easing, Tween } from "tweedle.js";
import { config } from "./appconfig";

export class EndScreen extends Container {
    popup: Sprite = new Sprite();
    overlay = new Graphics();
    isBreating: Tween<any> | null = null


    constructor(public popupCase: POPUP) {
        super();
        this.setupScreen();
    }

    setupScreen() {
        this.setupOverlay();
        this.setupPopup();
    }

    setupOverlay() {
        this.overlay.rect(0, 0, window.innerWidth, window.innerHeight)
            .fill({ color: 0x000000, alpha: 0.7 })
        this.overlay.position.set(-window.innerWidth / 2, -window.innerHeight / 2)
        this.addChild(this.overlay);
    }

    setupPopup() {
        this.popup = new Sprite(Globals.resources[this.popupCase])
        this.popup.anchor.set(0.5);
        this.popup.scale.set(0);
        this.popup.position.y -= window.innerHeight / 12;

        this.addChild(this.popup);
        this.tweenUp();
    }

    tweenUp() {
        const scale = 0.4 * config.scaleFactor;
        new Tween(this.popup.scale)
            .to({ x: scale, y: scale }, 2000)
            .easing(Easing.Elastic.Out)
            .onComplete(() => {
                this.breathTween();
            })
            .start();
    }

    breathTween() {
        const scale = 0.4 * config.scaleFactor;
        this.isBreating = new Tween({ t: Math.PI * 2 })
            .to({ t: 0 }, 2000)
            .onUpdate(({ t }) => {
                const s = scale + Math.sin(t) * 0.05 * scale; // 5% breathing
                this.popup.scale.set(s);
            })
            .repeat(Infinity)
            .start();
    }

    tweenDown() {
        const scale = 0;
        if (this.isBreating) this.isBreating.stop();
        new Tween(this.popup.scale)
            .to({ x: scale, y: scale }, 2000)
            .easing(Easing.Elastic.In)
            .onComplete(() => {
                this.destroy();
            })
            .start();
    }
    
    resize() {
        this.overlay.clear();
        this.overlay.rect(0, 0, window.innerWidth, window.innerHeight)
        .fill({ color: 0x000000, alpha: 0.5 })
        this.overlay.position.set(-window.innerWidth / 2, -window.innerHeight / 2);
        this.popup.position.y -= window.innerHeight / 12;

        if (this.isBreating) {
            this.isBreating.stop();
            this.breathTween();
        }
    }
}