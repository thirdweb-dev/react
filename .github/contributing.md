# Contributing to thirdweb React SDK

Thanks for considering contributing to thirdweb React SDK.

Below, you'll find a guide on how to set up the repository locally so you can test your changes and submit them to the repository for review by our engineering team.

To develop locally:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account.

2. [Clone](https://help.github.com/articles/cloning-a-repository/) your fork to your local device.

3. Create a new branch:
   ```
   git checkout -b MY_BRANCH_NAME
   ```

### Getting Started

You're ready to start making changes to the code! Where do you start?

We suggest taking a look at the [index.ts](/packages/thirdweb-react/src/index.ts) file, to begin with. This gives you a very broad overview of everything that is exported from our React SDK.

From this file, you can view where each of the hooks and components is defined, and add/modify the code you have in mind accordingly.

## Testing Your Changes Locally

Below is a guide on how to test the changes you made in the SDK locally.

<br/>

### Install Dependencies & Build

You'll first need to install the dependencies for your local development environment.

Change directory to the src:

```bash
cd /packages/thirdweb-react/
```

Install dependencies:

```bash
yarn install
```

Now build the project:

```bash
yarn build
```

<br/>

### Use Yalc to Test Your Changes

We use [yalc](https://www.npmjs.com/package/yalc) to test our changes locally on a test project.

Yalc allows you to export a version of the SDK with your changes locally, and install this version of the SDK in a test project, where you can test your changes.

1. Install yalc globally:

   ```
   yarn global add yalc
   ```

2. Build Your changes each time you make a change you want to test:

   ```
   yarn build
   ```

3. Publish and push the SDK to yalc:

   ```
   yalc push
   ```

4. In a **different** project (where you will be testing your changes), install the SDK version you just built from yalc. If you dont have another project to test with, create one using `npx thirdweb create`.
   ```
   yalc add @thirdweb-dev/react
   ```

You'll now notice in the `package.json` file of your test project, the version of the `@thirdweb-dev/react` dependency is now the version you just built; the value should be `file:.yalc/@thirdweb-dev/react`. You'll also have a `.yalc` folder containing the exported SDK.

From this test project, you can test to see if your changes are working as expected.

<br/>

### Development Loop

You will likely want to change stuff, test it, and then repeat this process until you're happy with your changes.

After following the process above to initialize this connection between the local SDK and your test project, you can simply run both:

- `yarn build`
- `yalc push`

from the React SDK repo, which will push the changes you've made to any test projects that are using your yalc version of the SDK.

> Note: If you're using Next.js in the test project, you might need to delete the `.next` folder from the root each time you run `dev`.

<br/>

## Publish Your Changes

Alright! You're happy with your changes and ready to publish them to the SDK.

1. Commit your changes:

   ```
   git commit -am "My commit message"
   ```

2. Push your changes to the SDK:

   ```
    git push origin MY_BRANCH_NAME
   ```

3. Create a [pull request](https://www.atlassian.com/git/tutorials/making-a-pull-request) to the `main` branch of the official (not your fork) SDK repo.
