export const serializeBigInt = (value) => {
    return JSON.parse(
        JSON.stringify(value, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
};