# Introduction

## Angular CLI
We're going to get started here by using a generic project created by the [Angular CLI](cli.angular.io).
This allows us to scaffold out a project and all of the build configuration automatically.

## StackBlitz
In order to avoid installing and configuring tools on your laptop, we're going to use 
[StackBlitz](https://stackblitz.com). StackBlitz is an online IDE that integrates with many of the
tools relevant to Angular projects (GitHub, TypeScript, Angular CLI, Webpack, NodeJS, SASS, etc.).
Additionally, StackBlitz provides code completion and other editor features via VS Code and other
custom extensions.

## Getting Started
1. Open [Step 0 in StackBlitz](http://stackblitz.com/github/devintent/rapid-mvp-workshop/tree/step-0)

This application doesn't do much. It's just an image and a list of helpful links. First let's wipe out
the default content.

1. Replace the content from the template in `/src/app/app.component.ts` with
  a `router-outlet` element. The result should be the following:
```ts
  template: `
    <router-outlet></router-outlet>
  `,
```
This will enable the router to project content into this component. Simply put,
this means that the router can display the appropriate content within this component
based on the current route (or URL) of the application.

### Now let's setup Angular Material
<img width="288" alt="add material to npm" src="https://user-images.githubusercontent.com/3506071/39678047-377d6534-513a-11e8-9770-760af467b645.png">

1. Under "Dependencies"->"npm packages"->"enter package name", type
`@angular/material` and press the ENTER key.

<img width="347" alt="add cdk peer dependency" src="https://user-images.githubusercontent.com/3506071/39678053-6b0001aa-513a-11e8-84eb-94dcb3291fd4.png">

1. StackBlitz automatically detects unmet peer dependencies and allows you to
resolve them with 1 button. Press "Install Missing Dependencies".

1. Add `hammerjs` to the NPM packages list to enable touch gestures

### Install the other dependencies that we'll need
1. Install the following NPM packages
    1. `@angular/flex-layout@6.0.0-beta.15`
    1. `@swimlane/ngx-charts`
    1. `moment`
    1. `rxjs-compat`


[Go to the Next Step](step-1.md)
