// determine runtime environment
// devEnv() -> true/false
export const devEnv = () =>
    Object.prototype.hasOwnProperty.call(sessionStorage, "dev") ||
    // eslint-disable-next-line
    process.env.NODE_ENV !== "production"




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
