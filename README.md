# Sample project for leadscore.io

This is a simple contact list app for leadscore.io.

After cloning the repo, run `yarn` to install dependencies and start the development server using `yarn start`.

A production build can be created using `yarn run build`, and the test suite can be run using `yarn test`.

# Troubleshooting

If an unknown error occurs during login, a possible reason is that the browser blocks the request to the API.
This can only properly be changed with access to the server, but the problem can be circumvented by installing the [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/nlfbmbojpeacfghkpbjhddihlkkiljbi) Chrome extension.

If there are problems with running the code, the usual dance of running `yarn`, running deleting `node_modules`, running `yarn clean`, deleting `yarn.lock`, etc. should help.
