import { importFile } from "./index";

export async function runImportTest(file) {

    console.clear();
    console.group("Import Test Result");

    try {
        const result = await importFile(file);

        console.log("ERRORS", result.errors);
        console.log("WARNINGS", result.warnings);
        console.log("PROFILE", result.profile);
        console.log("MAPPING", result.mapping);
        console.log("TRANSACTIONS", result.transactions);

        return result;
    } finally {
        console.groupEnd();
    }
}