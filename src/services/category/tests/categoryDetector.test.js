import { describe, expect, test } from "vitest";
import detectCategory from "../categoryDetector";


describe("category detection", () => {

    test("detects salary", () => {

        const transaction = {
            name: "Werkgever",
            description: "Salaris januari",
            type: "income",
        };

        expect(
            detectCategory(transaction)
        ).toBe("salary");

    });


    test("detects energy", () => {

        const transaction = {
            name: "Eneco",
            description: "Maandelijkse incasso",
            type: "expense",
            metadata: {
                bank: {
                    code: "IC",
                },
            },
        };

        expect(
            detectCategory(transaction)
        ).toBe("energy");

    });


    test("detects food merchant", () => {

        const transaction = {
            name: "Albert Heijn",
            description: "",
            type: "expense",
        };

        expect(
            detectCategory(transaction)
        ).toBe("food");

    });


    test("falls back", () => {

        const transaction = {
            name: "Onbekend bedrijf",
            description: "",
            type: "expense",
        };

        expect(
            detectCategory(transaction)
        ).toBe("otherExpense");

    });

});