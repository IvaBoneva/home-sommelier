const DESCRIPTORS =
  "(?:(?:light|dark|white|gold|golden|spiced|aged|silver|dry|sweet|red|premium)\\s+)*";

const alcohol = (names: string) =>
  new RegExp(`\\b${DESCRIPTORS}(?:${names})\\b`, "i");

const SUBSTITUTES: [RegExp, string][] = [
  [/\bblue cura[cç]ao\b/i, "blue raspberry syrup"],
  [alcohol("sparkling wine|champagne|prosecco"), "sparkling grape juice"],
  [alcohol("whiskey|whisky|bourbon|scotch"), "cold black tea"],
  [alcohol("brandy|cognac"), "grape juice"],
  [alcohol("triple sec|cointreau|cura[cç]ao|grand marnier"), "orange juice"],
  [alcohol("kahlua|coffee liqueur"), "cold brew coffee"],
  [alcohol("campari|aperol"), "blood orange soda"],
  [alcohol("vermouth"), "white grape juice"],
  [alcohol("liqueur"), "fruit syrup"],
  [alcohol("bitters"), "orange zest"],
  [alcohol("vodka"), "sparkling water"],
  [alcohol("gin"), "tonic water"],
  [alcohol("rum"), "apple juice"],
  [alcohol("tequila"), "lime soda"],
  [alcohol("wine"), "grape juice"],
  [alcohol("beer"), "ginger ale"],
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
