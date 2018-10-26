// asynchronously load libraries (used in dev. environment)
export const dynamicImportLibs = async () => {
    let [
        redshift,
        stellar,
        toolbox,
    ] = await Promise.all([
        import("../lib/redshift"),
        import("stellar-base"),
        import("@xcmats/js-toolbox"),
    ])
    return {
        redshift,
        stellar,
        toolbox,
    }
}
