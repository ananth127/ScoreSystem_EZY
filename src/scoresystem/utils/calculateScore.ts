import { Rule, Bonus } from "../types/score"
import { Numeric } from "../types/baseValue"

export const calculateScore = (
    baseScore: Numeric,
    rules: Rule[],
    bonuses: Bonus[] = []
): Numeric => {
    let score = baseScore;

    rules.forEach(rule => {
        switch (rule.type) {
            case 'add':
                score += rule.value;
                break;
            case 'multiply':
                score *= rule.value;
                break;
            case 'timeBonus':
                score += Math.max(0, rule.maxPoints - (rule.timeElapsed * rule.penalty));
                break;
            default:
                break;
        }
    });

    bonuses.forEach(bonus => {
        if (bonus.condition && bonus.condition(score)) {
            score += bonus.value;
        } else if (!bonus.condition) {
            score += bonus.value;
        }
    });

    return Math.round(Math.max(0, score));
};
