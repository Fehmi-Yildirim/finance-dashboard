import {
    transactionKey
} from "../../transactionKey";

import {
    convertAmount,
    convertDate,
    convertText,
    determineType
}
    from "./converters";


/**
 * Gets a mapped value from a row.
 *
 * @param {Object} row
 * @param {string|null} column
 * @returns {*}
 */
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

        "Amount"

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
        paymentReference: ""

    };


    const name =
        text.match(
            /Naam:\s*(.*?)\s+(Omschrijving:|IBAN:|Kenmerk:|Valutadatum:)/i
        );


    if (!name && !/Naam:|Omschrijving:|IBAN:|Kenmerk:/.test(text)) {

        result.name =
            text.split(/Pasvolgnr:|Kaartnr:/)[0].trim();

    }


    if (name) {

        result.name =
            name[1].trim();

    }


    const description =
        text.match(
            /Omschrijving:\s*(.*?)\s+(IBAN:|Kenmerk:|Valutadatum:|$)/i
        );


    if (description) {

        result.description =
            description[1].trim();

    }


    const iban =
        text.match(
            /IBAN:\s*([A-Z]{2}[0-9A-Z]+)/i
        );


    if (iban) {

        result.iban =
            iban[1].trim();

    }


    const reference =
        text.match(
            /Kenmerk:\s*(.*?)\s+(Valutadatum:|$)/i
        );


    if (reference) {

        result.paymentReference =
            reference[1].trim();

    }


    return result;

}


function getDescription(row, mapping) {

    const descriptionRaw =
        row[mapping.description] ??
        row[mapping.notes];

    const nameRaw =
        row[mapping.name];


    const parsed =
        parseBankText(
            descriptionRaw ?? nameRaw
        );


    if (
        parsed &&
        parsed.description
    ) {

        return parsed.description;

    }


    if (
        descriptionRaw &&
        String(descriptionRaw).trim()
    ) {

        return String(descriptionRaw).trim();

    }


    return "Onbekende transactie";

}


function getCounterparty(row, mapping) {

    const descriptionRaw =
        row[mapping.description] ??
        row[mapping.notes];

    const nameRaw =
        row[mapping.name];


    const parsed =
        parseBankText(
            descriptionRaw ?? nameRaw
        );


    return {

        name:
            nameRaw ??
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
            ""

    };

}


/**
 * Creates a normalized transaction.
 *
 * @param {Object} row
 * @param {Object} mapping
 * @returns {Object}
 */
export function createTransaction(
    row,
    mapping
) {

    const rawAmount =
        convertAmount(
            getAmountValue(
                row,
                mapping
            )
        );


    const amount =
        Math.abs(rawAmount);


    const type =
        determineType(
            rawAmount,
            getValue(
                row,
                mapping.direction
            )
        );


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


    const transaction = {

        date:
            convertDate(
                getValue(
                    row,
                    mapping.date
                )
            ),


        name:
            convertText(
                getValue(
                    row,
                    mapping.name
                )
            )
            ||
            counterparty.name
            ||
            description,


        description,

        amount,

        balance:
            convertAmount(
                getValue(
                    row,
                    mapping.balance
                )
            ),


        account:
            convertText(
                getValue(
                    row,
                    mapping.account
                )
            ),


        type,

        counterparty,

        notes:
            convertText(
                getValue(
                    row,
                    mapping.notes
                )
            )

    };


    transaction.id =
        transactionKey(
            transaction
        );


    return transaction;

}