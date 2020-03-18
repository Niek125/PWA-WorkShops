module.exports = {
    "transpileDependencies": [
        "vuetify",
    ],
    devServer: {
        https: true,
    },
    pwa: {
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
        }
    },
}