import { Sprite } from "pixi.js";

/**
 * Represents a playing card with suit, rank, and value
 * @example
 *   const playerCard1: Card = {
            suit: 'hearts',
            rank: '10',
            value: 10,
            spriteKey: `${this.getSuitPrefix('hearts')}10`,
            faceUp: true
        };
 */
export interface Card {
    /** Card's suit (hearts, diamonds, clubs, spades) */
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
    
    /** Card's rank (A, 2-10, J, Q, K) */
    rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
    
    /** Card's value in blackjack (1-11 for A, 10 for face cards, rank value for others) */
    value: number;
    
    /** Card's sprite key in the resources */
    spriteKey: string;
    
    /** Whether the card is face up or face down */
    faceUp: boolean;
    
    /** Card's sprite */
    sprite?: Sprite;
    
    /** Card's target position in the hand (for repositioning during resize) */
    targetPosition?: {
        x: number;
        y: number;
        index: number; // Index in the hand
    };
}

  /**
     * Get the prefix for a suit to use in sprite keys
     * @param suit - The card suit
     * @returns The prefix for the suit
     */
    export function getSuitPrefix(suit: 'hearts' | 'diamonds' | 'clubs' | 'spades'): string {
        switch (suit) {
            case 'hearts': return 'h';
            case 'diamonds': return 'd';
            case 'clubs': return 'c';
            case 'spades': return 's';
        }
    }
    
