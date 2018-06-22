// determine runtime environment
// devEnv() -> true/false
export const devEnv = () =>
    Object.prototype.hasOwnProperty.call(sessionStorage, "dev") ||
    // eslint-disable-next-line
    process.env.NODE_ENV !== "production"




// asynchronously load libraries (used in dev. environment)
export const dynamicImportLibs = async () => {
    let [
        mnemonic,
        toolbox,
    ] = await Promise.all([
        import("./mnemonic"),
        import("@xcmats/js-toolbox"),
    ])
    return {
        mnemonic,
        toolbox,
    }
}