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

    // Special for ABN_AMRO
    if (!result.description) {

        // REK:
        const rek = text.match(
            /^(.*?)\s+REK:\s*([A-Z]{2}[0-9A-Z]+)(.*)$/i
        );

        if (rek) {

            let beforeRek = rek[1].trim();

            const salaryMatch = beforeRek.match(
                /^(.*?)\s*\b(SALARIS|LOON|PENSIOEN)\b(.*)$/i
            );

            if (salaryMatch) {
                result.name = salaryMatch[1].trim();
                result.description = `${salaryMatch[2]}${salaryMatch[3]}`.trim();
                result.iban = rek[2];
                return result;

            } else {

                result.name = beforeRek;

                const remainder = rek[3].trim();

                result.description =
                    remainder ||
                    `REK: ${rek[2]}`;
            }

            return result;
        }

        // KENMERK (Reference)
        const kenmerk = text.match(/^(.*?)\s+KENMERK\s+(.+)$/i);

        if (kenmerk) {
            result.name = kenmerk[1].trim();
            result.description = `KENMERK ${kenmerk[2].trim()}`;
            return result;
        }

        // PAS... (Card number)
        const pas = text.match(/^(.*?)\s+(PAS\d+.*)$/i);

        if (pas) {
            result.name = pas[1].replace(/\s*KVK\s*\d+/, "").trim();
            result.description = `${pas[1].match(/KVK\s*\d+/)?.[0] || ""} ${pas[2]}`.trim();
            return result;
        }
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

    return "Unknown transaction";
}


function getCounterparty(row, mapping) {

    const raw =
        row[mapping.description] ??
        row[mapping.notes] ??
        row[mapping.name];


    const parsed =
        parseBankText(raw);


    const bankName =
        row["Naam tegenpartij"] ||
        row["Naam uiteindelijke partij"] ||
        row["Naam initiërende partij"];


    return {
        name:
            bankName ||
            parsed?.name ||
            "",

        iban:
            parsed?.iban ||
            row["Tegenrekening IBAN/BBAN"] ||
            "",

        paymentReference:
            parsed?.paymentReference ||
            row["Betalingskenmerk"] ||
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

    //console.log("ROW", row);
    //console.log("MAPPING", mapping);

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


    //console.log({
    //   rawName: getValue(row, mapping.name),
    //   counterparty,
    //   description
    //});

    const rawName =
        convertText(
            getValue(
                row,
                mapping.name
            )
        );

    const name =
        counterparty.name &&
            counterparty.name.length < rawName.length
            ? counterparty.name
            : rawName || description;

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