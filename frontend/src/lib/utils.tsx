// asynchronously load libraries (used in dev. environment)
export const dynamicImportLibs = async () => {
    let [
        redshift,
        stellar,
        toolbox,
    ] = await Promise.all([
        import("@stellar-fox/redshift"),
        import("@stellar/stellar-sdk"),
        import("@xcmats/js-toolbox"),
    ])
    return {
        redshift,
        stellar,
        toolbox,
    }
}
