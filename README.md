# ABN Amro Assignment
For this project I decided to use Vue.js v3 in combination with TypeScript, Vuex and Vue Router. 

**Why Vue.js?** I chose Vue.JS since that is the framework currently being used by ABN Amro for the various applications. It is a framework in which I think I am quite familiar and like to use. I started with Vue.js v2 but started to use v3 when it was still on the @next branch. Now it has been released for quite a while and the support and available third-party components is growing every day.

**Why TypeScript?** Although it is not currently used by ABN Amro, I would like to showcase my knowledge in this language. It is a very useful language that prevents you from making common mistakes, for example; variables that could be null or of a completely different type than you might expect.

**Why Vuex?** Vuex makes it easier to re-use the previous state of the retrieved data and therefor preventing unnecessary calls to the API. It also makes it very easy to have your entire application know what is happening in a deeper underlying component, and have it react to certain changes.

**Why Vue Router?** Vue Router lets you separate the logic and view for different pages into their own (page-)components, which makes it very easy for a developer to find the right line of code to change.

## Project requirements (build with)
- Node v16 (NPM v8.5)
- Yarn v1.22

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Run tests
yarn test
