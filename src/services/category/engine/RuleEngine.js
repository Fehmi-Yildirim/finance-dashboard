export function findMatchingRule(text, rules) {

    return [...rules]
        .sort(
            (a, b) =>
                (b.priority ?? 0) -
                (a.priority ?? 0)
        )
        .find(rule =>
            rule.keywords.some(
                keyword =>
                    text.includes(
                        keyword.toLowerCase()
                    )
            )
        );
}