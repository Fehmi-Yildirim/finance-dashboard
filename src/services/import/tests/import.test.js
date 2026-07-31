import { importFile } from "../index";

test("imports CSV file", async () => {

    const result =
        await importFile(file);

    expect(result.transactions)
        .toHaveLength(10);

});