type Rule =
| { type: 'add'; value: number }
| { type: 'multiply'; value: number }
| { type: 'timeBonus'; maxPoints: number; timeElapsed: number; penalty: number };

type Bonus = {
value: number;
condition?: (score: number) => boolean;
};

export const calculateScore = (
baseScore: number,
rules: Rule[],
bonuses: Bonus[] = []
): number => {
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
