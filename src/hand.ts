import { Container, Sprite } from "pixi.js";
import { Card } from "./cards";
import { Globals } from "./globals";
import { config } from "./appconfig";
import { Easing, Tween } from "tweedle.js";

const animateConfig =
{
    dealAnimationSpeed: 5000,
    overlapFactor: 0.7,
    cardScale: 0.2 * config.scaleFactor
}

export class Hand extends Container {
    cards: Card[] = [];
    splitHand: Hand | undefined = undefined;
    isActive: boolean = true;

    constructor(isActive: boolean) {
        super();
        this.isActive = isActive;
    }

    calculateValue(): number {
        let sum = 0;
        for (let i = 0; i < this.cards.length; i++) {
            sum += this.cards[i].value;
        }
        return sum;
    }

    /**
     * Create a card sprite
     * @param card - The card to create a sprite for
     */
    private createCardSprite(card: Card): void {
        const textureKey = card.faceUp ? card.spriteKey : 'cardBack';
        const sprite = new Sprite(Globals.resources[textureKey]);
        sprite.anchor.set(0.5);
        sprite.scale.set(animateConfig.cardScale);
        card.sprite = sprite;
        sprite.alpha = 0;
        new Tween(sprite)
            .to({ alpha: 1 }, 100)
            .start();
    }


    /**
 * Animate a card from the deck position to its position in the hand
 * @param card - The card to animate
 * @param hand - The hand the card is being dealt to
 */
    private animateCardToHand(card: Card, hand: Hand): void {
        if (!card.sprite) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const isPortrait = screenHeight > screenWidth;
        card.sprite.scale.set(animateConfig.cardScale);
        const { positions } = this.calculateCardPositions(hand, animateConfig.cardScale);
        const cardIndex = hand.cards.length - 1;
        const targetPosition = positions[cardIndex] || { x: 0, y: 0 };
        const targetX = targetPosition.x;
        const targetY = targetPosition.y;
        card.targetPosition = {
            x: targetX,
            y: targetY,
            index: cardIndex
        };
        card.sprite.zIndex = cardIndex;
        const deckX = 0;
        const deckY = isPortrait ? 0 : 0;
        card.sprite.position.set(deckX, deckY);
        const path = [
            { x: deckX, y: deckY },
            { x: targetX, y: targetY }
        ];
        this.animateAlongPath(card.sprite, path, animateConfig.dealAnimationSpeed);
    }

    /**
     * Animate a sprite along a path
     * @param sprite - The sprite to animate
     * @param path - Array of points defining the path
     * @param duration - Duration of the animation
     */
    private animateAlongPath(sprite: Sprite, path: { x: number, y: number }[], duration: number): void {
        const progress = { value: 0 };

        new Tween(progress)
            .to({ value: 1 }, duration)
            .easing(Easing.Cubic.Out)
            .onUpdate(() => {
                if (path.length === 2) {
                    const t = progress.value;
                    const p0 = path[0];
                    const p1 = path[1];

                    sprite.position.x = p0.x + t * (p1.x - p0.x);
                    sprite.position.y = p0.y + t * (p1.y - p0.y);
                }
            })
            .start();
    }

    /**
   * Calculate card positions for a hand
   * This is a helper method to ensure consistent positioning across all methods
   * @param hand - The hand to calculate positions for
   * @param cardScale - The scale to use for cards
   * @returns An array of positions for each card
   */
    private calculateCardPositions(hand: Hand, cardScale: number): { positions: { x: number, y: number }[], cardWidth: number, cardHeight: number } {
        const cardCount = hand.cards.length;
        if (cardCount === 0) return { positions: [], cardWidth: 0, cardHeight: 0 };
        const cardWidth = hand.cards[0].sprite?.width || 225 * cardScale; // Assuming card texture width is 225px
        const cardHeight = hand.cards[0].sprite?.height || cardWidth * 1.4;
        const overlapFactor = animateConfig.overlapFactor;
        const effectiveCardWidth = cardWidth / 2 * (1 - overlapFactor);
        const totalWidth = cardCount > 1 ? effectiveCardWidth * (cardCount - 1) + cardWidth : cardWidth;
        const startX = -totalWidth / 2 + cardWidth / 2;
        const positions: { x: number, y: number }[] = [];

        for (let index = 0; index < cardCount; index++) {
            const x = startX + index * effectiveCardWidth;
            const y = 0;

            positions.push({ x, y });
        } return { positions, cardWidth, cardHeight };
    }


    setActive(active : boolean = true)
    {this.cards.forEach((element)=>{element.sprite!.alpha = active ? 1 :0.5;})}
}