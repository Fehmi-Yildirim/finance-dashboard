import fs from "node:fs";
import { importFile } from "../../index";

export async function importFixture(fixture) {

    const csv =
        fs.readFileSync(
            fixture.path,
            "utf8"
        );

    return importFile(csv);

}