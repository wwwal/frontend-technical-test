# Exercise
To complete the exercise, I made a sketch and splited the chat into several components.
Using arrow fuction components, hooks, state, props..
I used `material-ui` to gain some time regarding the visual part

# Dependencies
- MUI: as mentionned above, and it's a package I like and know
- axios: use to consume API
- i18next: for translation
- redux: first step for further improvements
- react-cookie: for the authentication

# Bonus
## Delete
I added buttons to delete conversations, this always fails and permits to test the error handling

## New conversation
I added a `ChatDirectory` component to display users and select one to start a conversation or continue the one already existing.


## Authentication
1. I modified the middleware `conversations.js` to use a a bearer token as authorization.
With this token, I can redirect to a 401 response if the token is not set or the user not found.
And I filtered the conversations based on it.
2. I set axios headers to pass autorization on each request and used a cookie to store and get the token. As it would be stored if a login function were implemented. **So to try the application with a different user you can add a new cookie under your localhost domain with `user` as key and the token you want from the db as value.**

## Performances
I implemented redux within the application to store the current user informations and conversations.
The idea is to stock what we already got and this can enlight the next requests made to the API using update timestamps.
It is also useful because it allows to dispatch errors from anywhere.

## Api error handling
I created a component `GlobalAlert` to display every error messages dispatched within any component or hook.

## Testing
I didn't test everything I made but to show that I can:
1. I created a test on the store
2. I created a test for the `Chat` component and to do that I used providers outside the app
3. I modified the `getLoggedUserId` existing test and to do that I used a mockup of a `react-redux` function

## Translations
This wasn't in the bonus list but I thought that regarding the current evolution of LBC, it was a good idea to add translations.
I didn't add a lang selector but the browser lang should be recognized and if not, just change the default lang in the config (`lng: 'fr'`) to check the differences between en and fr.

## Accessibility
I used material ui arialabel props on different component (buttons, input)

## Other
1. In the middleware `conversations.js`, I modified the response and the related type `Conversation` to add a boolean flag to notice if the other user is online. This boolean is used in the list to show a badge next to the recipient avatar
2. I also simplified the `Conversation` type regarding the recipient/sender informations. We don't need both, we know the current user, so I only left the `recipientId` and `recipientNickname` with the correct values

# Known improvements
1. The use of redux should be improved, as mentionned before, with new routes on the API side
2. The style part is not perfect, as I said I used MUI quickly. Some style rules could be prettier. But I think I pass enough time on the exercise to show what I can do. I hope so!