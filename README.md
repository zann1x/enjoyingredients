[![Netlify Status](https://api.netlify.com/api/v1/badges/73f01ed1-7664-42a8-9f0a-d53c2cc646cb/deploy-status)](https://app.netlify.com/sites/thirsty-goldstine-7e53d0/deploys)

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
    cd ../enjoyingredients
    npm start
    ```

1. **Open the source code and start editing!**

    The site is now running at `http://localhost:8000`.
    
    The GraphQL Tool can be accessed at `http://localhost:8000/___graphql`.

### Local development with Ghost

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

    Add a integration for Gatsby in Ghost and copy the generated Content API Key into .ghost.json. Also update the API URL in this file for the development config.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.
    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.
