import { transactionKey } from "../../transactionKey";
import {
    convertAmount,
    convertDate,
    convertText,
    determineType,
} from "./converters";
import detectCategory from "../../category/categoryDetector";

function getValue(row, column) {

    if (!column) {
        return null;
    }

    return row[column] ?? null;
}

function getAmountValue(row, mapping) {

    const fields = [
        mapping.amount,
        "Bedrag",
        "Bedrag (EUR)",
        "Mutatiebedrag",
        "Bedrag EUR",
        "Amount",
    ];

    for (const field of fields) {

        if (!field) {
            continue;
        }

        const value = row[field];

        if (
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
        ) {
            return value;
        }
    }

    return null;
}

function parseBankText(value) {

    if (!value) {
        return null;
    }

    const text = String(value).trim();

    const result = {
        name: "",
        description: "",
        iban: "",
        paymentReference: "",
    };


    const name = text.match(
        /Naam:\s*(.*?)\s+(Omschrijving:|IBAN:|Kenmerk:|Valutadatum:)/i
    );

    if (!name && !/Naam:|Omschrijving:|IBAN:|Kenmerk:/.test(text)) {
        result.name =
            text.split(/Pasvolgnr:|Kaartnr:/)[0].trim();
    }

    if (name) {
        result.name = name[1].trim();
    }

    const description = text.match(
        /Omschrijving:\s*(.*?)\s+(IBAN:|Kenmerk:|Valutadatum:|$)/i
    );

    if (description) {
        result.description = description[1].trim();
    }

    const iban = text.match(
        /IBAN:\s*([A-Z]{2}[0-9A-Z]+)/i
    );

    if (iban) {
        result.iban = iban[1].trim();
    }

    const reference = text.match(
        /Kenmerk:\s*(.*?)\s+(Valutadatum:|$)/i
    );

    if (reference) {
        result.paymentReference = reference[1].trim();
    }


    return result;
}


function getDescription(row, mapping) {

    const raw =
        row[mapping.description] ??
        row[mapping.notes] ??
        row[mapping.name];

    const parsed =
        parseBankText(raw);

    if (parsed?.description) {
        return parsed.description;
    }

    if (raw && String(raw).trim()) {
        return String(raw).trim();
    }

    return "Onbekende transactie";
}


function getCounterparty(row, mapping) {

    const raw =
        row[mapping.description] ??
        row[mapping.notes] ??
        row[mapping.name];


    const parsed =
        parseBankText(raw);


    return {
        name:
            row[mapping.name] ??
            parsed?.name ??
            row["Naam tegenpartij"] ??
            row["Naam uiteindelijke partij"] ??
            row["Naam initiërende partij"] ??
            "",

        iban:
            parsed?.iban ??
            row["Tegenrekening IBAN/BBAN"] ??
            "",

        paymentReference:
            parsed?.paymentReference ??
            row["Betalingskenmerk"] ??
            "",
    };
}

function buildTransaction(row, mapping) {
    const rawAmount =
        convertAmount(
            getAmountValue(
                row,
                mapping
            )
        );

    const type =
        determineType(
            rawAmount,
            getValue(
                row,
                mapping.direction
            )
        );

    const amount =
        Math.abs(rawAmount);

    const counterparty =
        getCounterparty(
            row,
            mapping
        );

    const description =
        getDescription(
            row,
            mapping
        );

    const name =
        convertText(
            getValue(
                row,
                mapping.name
            )
        )
        ||
        counterparty.name
        ||
        description;

    const balance = convertAmount(getValue(row, mapping.balance));

    const notes =
        convertText(
            getValue(
                row,
                mapping.notes
            )
        );

    const date = convertDate(getValue(row, mapping.date));
    const account = convertText(getValue(row, mapping.account));

    const transaction = { date, name, description, amount, balance, account, type, counterparty, notes };

    transaction.category = detectCategory(transaction);
    transaction.id = transactionKey(transaction);

    return transaction;
}

export function createTransaction(row, mapping) {
    return buildTransaction(row, mapping);
}