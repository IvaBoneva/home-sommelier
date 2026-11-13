const SUBSTITUTES: [RegExp, string][] = [
  [/\b(sparkling wine|champagne|prosecco)\b/i, "sparkling grape juice"],
  [/\b(whiskey|whisky|bourbon|scotch)\b/i, "cold black tea"],
  [/\b(brandy|cognac)\b/i, "grape juice"],
  [/\b(triple sec|cointreau|curacao|grand marnier)\b/i, "orange juice"],
  [/\b(kahlua|coffee liqueur)\b/i, "cold brew coffee"],
  [/\b(campari|aperol)\b/i, "blood orange soda"],
  [/\bvermouth\b/i, "white grape juice"],
  [/\bliqueur\b/i, "fruit syrup"],
  [/\bbitters\b/i, "orange zest"],
  [/\bvodka\b/i, "sparkling water"],
  [/\bgin\b/i, "tonic water"],
  [/\brum\b/i, "apple juice"],
  [/\btequila\b/i, "lime soda"],
  [/\bwine\b/i, "grape juice"],
  [/\bbeer\b/i, "ginger ale"],
];

export interface MocktailIngredient {
  text: string;
  isReplaced: boolean;
}

export const toMocktailIngredients = (
  ingredients: string[],
): MocktailIngredient[] =>
  ingredients.map((ingredient) => {
    const substitute = SUBSTITUTES.find(([pattern]) =>
      pattern.test(ingredient),
    );

    if (!substitute) {
      return { text: ingredient, isReplaced: false };
    }

    const [pattern, replacement] = substitute;
    return { text: ingredient.replace(pattern, replacement), isReplaced: true };
  });
