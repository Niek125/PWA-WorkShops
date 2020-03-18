<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                        transition="scale-transition"
                        width="40"
                />

                <v-img
                        alt="Vuetify Name"
                        class="shrink mt-1 hidden-sm-and-down"
                        contain
                        min-width="100"
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                        width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn
                    href="https://github.com/vuetifyjs/vuetify/releases/latest"
                    target="_blank"
                    text
            >
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <HelloWorld/>
        </v-content>
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld';

    export default {
        name: 'App',

        components: {
            HelloWorld,
        },

        data: () => ({
            //
        }),

        created() {
            //Setup libraries we want to use (installed them first with *npm install*)
            const webpush = require("web-push");
            const fetch = require("node-fetch");
            const prompts = require("prompts");

//Location of your subscribers file (normally they would be in a database)
            const yourSubscriberJSONFileURL =
                "https://i413747.hera.fhict.nl/data/subsribers.json";

//Place your keys here
            webpush.setVapidDetails(
                "mailto:n.sleddens@student.fontys.nl", //Subject VAPID
                "BCwHP9NAvndYcGZEIxRPerI4mYM2pWLlQq6wLYjim6zMvX-0dvRYIs53C2oUg_KLR_TwXS97gfhmzKA8J8n5s4U", // Public Key VAPID
                "F_rHbpvi4wLg2Utz0D6hkcNg41hQrdaNTfv2Jdw2r18" //Private Key VAPID
            );

            console.log(
                " ==========================================\n",
                "==       SEND PUSH NOTIFICATION         ==\n",
                "==========================================\n"
            );

//This allows you to fill in the titel and message of the notification in the CLI
            const questions = [
                {
                    type: "text",
                    name: "title",
                    message: "Push notification title"
                },
                {
                    type: "text",
                    name: "message",
                    message: "Push notification message"
                }
            ];

            (async () => {
                const answers = await prompts(questions);

                console.log(
                    "\n ==========================================\n",
                    "==    SENDING MESSAGE TO SUBSCRIBERS    ==\n",
                    "==========================================\n"
                );

                //Putting the promted title and message in variables to use
                let pushTitle = answers.title;
                let pushMessage = answers.message;

                //Send a notification to every subscriber
                fetch(yourSubscriberJSONFileURL)
                    .then(subscriberJSON => subscriberJSON.json())
                    .then(subscriberJSON => {
                        for (let subscriberEndpoint in subscriberJSON) {
                            //Setting up format of subcription for sending
                            const pushSubscription = {
                                endpoint: subscriberEndpoint,
                                keys: {
                                    auth: subscriberJSON[subscriberEndpoint]["keys"]["auth"],
                                    p256dh: subscriberJSON[subscriberEndpoint]["keys"]["p256dh"]
                                }
                            };
                            //Actual sending
                            webpush
                                .sendNotification(
                                    pushSubscription,
                                    `{"title":"${pushTitle}","message":"${pushMessage}"}`
                                )
                                .then(result => {
                                    console.log(`-- Message send to ${pushSubscription.endpoint}`);
                                })
                                .catch(error => {
                                    console.log(`-- Message NOT send to ${pushSubscription.endpoint}`);
                                });
                        }
                    });
            })();

        },
    };
</script>
