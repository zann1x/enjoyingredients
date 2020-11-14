[![Netlify Status](https://api.netlify.com/api/v1/badges/73f01ed1-7664-42a8-9f0a-d53c2cc646cb/deploy-status)](https://app.netlify.com/sites/enjoyingredients/deploys)

<h1 align="center">
  EnjoyIngredients
</h1>

## 🚀 Quick start

1. **Install node.js in version ^12.10**

1. **Install Gatsby**

    ```shell
    npm install -g gatsby-cli
    ```

1. **Start the Blog**

    ```shell
    npm start
    ```

1. **Open the source code and start editing!**

    The site is now running at `http://localhost:8000`.

    The GraphQL Tool can be accessed at `http://localhost:8000/___graphql`.

### 👻 Local development with Ghost

1. **Install Ghost CMS**

    ```shell
    npm install -g ghost-cli
    ```

1. **Start ghost**

    Make a folder for Ghost and start it locally.

    ```shell
    mkdir ghost && cd ghost
    ghost install local
    ```

1. **Finish the setup of Ghost**

    Enter `http://localhost:2368/ghost/` and finish the setup there.

1. **Update the Content API key**

    Add a integration for Gatsby in Ghost and copy the generated Content API Key into `.ghost.json`. Also update the API URL to `http://localhost:2368` in this file for the development config.
