import { describe, test, expect } from "vitest";
import goldenTransactions from "./golden-transactions.json";
import { loadFixtures } from "./helpers/loadFixtures";
import { importFixture } from "./helpers/importFixture";
import { toComparableList } from "./helpers/toComparable";

describe(
    "CSV import",
    () => {

        const fixtures =
            loadFixtures();

        for (const fixture of fixtures) {

            test(

                `${fixture.name} imports correctly`,

                async () => {

                    const result =
                        await importFixture(
                            fixture
                        );

                    expect(
                        toComparableList(
                            result.transactions
                        )
                    ).toEqual(
                        goldenTransactions
                    );

                }

            );

        }

    }

);