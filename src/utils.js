// asynchronously load libraries (used in dev. environment)
export const dynamicImportLibs = async () => {
    let [
        redshift,
        sjcl,
        stellar,
        toolbox,
    ] = await Promise.all([
        import("./lib/src/index"),
        import("sjcl"),
        import("stellar-base"),
        import("@xcmats/js-toolbox"),
    ])
    return {
        redshift,
        sjcl,
        stellar,
        toolbox,
    }
}
