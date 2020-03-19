<template>
    <v-app>

<!--        <v-app-bar-->
<!--                app-->
<!--                color="primary"-->
<!--                dark-->
<!--        >-->
<!--            <div class="d-flex align-center">-->
<!--                <v-img-->
<!--                        alt="Vuetify Logo"-->
<!--                        class="shrink mr-2"-->
<!--                        contain-->
<!--                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
<!--                        transition="scale-transition"-->
<!--                        width="40"-->
<!--                />-->

<!--                <v-img-->
<!--                        alt="Vuetify Name"-->
<!--                        class="shrink mt-1 hidden-sm-and-down"-->
<!--                        contain-->
<!--                        min-width="100"-->
<!--                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
<!--                        width="100"-->
<!--                />-->
<!--            </div>-->

<!--            <v-spacer></v-spacer>-->

<!--            <v-btn-->
<!--                    href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
<!--                    target="_blank"-->
<!--                    text-->
<!--            >-->
<!--                <span class="mr-2">Latest Release</span>-->
<!--                <v-icon>mdi-open-in-new</v-icon>-->
<!--            </v-btn>-->
<!--        </v-app-bar>-->

<!--        <v-content>-->
            <div id="install-banner" v-if="deferredPrompt">
                <button @onClick="promptInstall">Add to home screen</button>
            </div>
            <h1>test</h1>
<!--            <HelloWorld/>-->
<!--        </v-content>-->

    </v-app>
</template>

<script>
    import {BeforeInstallPromptEvent} from "vue-pwa-install";
    // import HelloWorld from './components/HelloWorld';

    export default {
        name: 'App',

        // components: {
        //     HelloWorld,
        // },
        methods: {
            promptInstall() {
                // Show the prompt:
                this.deferredPrompt.prompt();

                // Wait for the user to respond to the prompt:
                this.deferredPrompt.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("User accepted the install prompt");
                    } else {
                        console.log("User dismissed the install prompt");
                    }

                    this.deferredPrompt = null;
                });
            }
        },

        data() {
            return {
                deferredPrompt: BeforeInstallPromptEvent | null,
            }
        },
    };
</script>
