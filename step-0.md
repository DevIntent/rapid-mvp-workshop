# Get Started

## Angular CLI

We're going to get started here by using a generic project created by the
[Angular CLI](https://github.com/DevIntent/rapid-mvp-workshop/tree/a06ff1d624b1cbbccb563e193edb310b01d0e5cd/docs/cli.angular.io). 
This allows us to scaffold out a project and all of the build configuration automatically.

## StackBlitz

In order to avoid installing and configuring tools on your laptop, we're going to use [StackBlitz](https://stackblitz.com). 
StackBlitz is an online IDE that integrates with many of the tools relevant to Angular projects \(GitHub, TypeScript,
Angular CLI, Webpack, NodeJS, SASS, etc.\). 
Additionally, StackBlitz provides code completion and other editor features via VS Code and other custom extensions.

## Getting Started

1. Open [Step 0 in StackBlitz](http://stackblitz.com/github/devintent/rapid-mvp-workshop/tree/step-0)

    This application doesn't do much. It's just an image and a list of helpful links. First let's wipe out the default content.

2. Replace the content from the template in `/src/app/app.component.ts` with
   a `router-outlet` element. 
   
   The result should be the following:
   ```typescript
   template: `
    <router-outlet></router-outlet>
   `,
   ```

   This will enable the router to project content into this component. Simply put,
   this means that the router can display the appropriate content within this component
   based on the current route \(or URL\) of the application.

### Now let's setup Angular Material

<img height="400px" alt="Add Material to NPM" src="https://user-images.githubusercontent.com/3506071/39678047-377d6534-513a-11e8-9770-760af467b645.png">

1. Under "Dependencies"-&gt;"npm packages"-&gt;"enter package name", type
   `@angular/material` and press the ENTER key.

    <img height="140px" alt="Add CDK peer dependency" src="https://user-images.githubusercontent.com/3506071/39678053-6b0001aa-513a-11e8-84eb-94dcb3291fd4.png">

1. StackBlitz automatically detects unmet peer dependencies and allows you to resolve them with 1 button. Press "Install Missing Dependencies".
1. Add `hammerjs` to the NPM packages list to enable touch gestures
1. Open `/src/main.ts` and add an import for `hammerjs` to load the library
    ```typescript
    import 'hammerjs';
    ```

    <img height="500px" alt="StackBlitz Context Menu" src="https://user-images.githubusercontent.com/3506071/39678192-ffb356a6-513c-11e8-8502-10fb02155ecc.png">

1. Right click on the `app/` folder to get the context menu. In this menu,
   select to generate a "Module".
1. When prompted, name it `material`.
1. Open `/src/app/app.module.ts` and add `MaterialModule` to the `imports` array.
1. Then add the following TypeScript import to remove the warning

   ```typescript
   import { MaterialModule } from './material/material.module';
   ```

1. Remove the contents of `/src/app/material/material.module.ts` and then paste in the
   following:

    ```typescript
    import { NgModule } from '@angular/core';
    import {
      MatAutocompleteModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule,
      MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
      MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule,
      MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
      MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule,
      MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule,
      MatTabsModule, MatToolbarModule, MatTooltipModule
    } from '@angular/material';
    
    @NgModule({
      imports: [
        MatAutocompleteModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSortModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
      ],
      exports: [
        MatAutocompleteModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSortModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
      ]
    })
    export class MaterialModule {
    }
    ```

    This imports all of the Angular Material modules and makes them available to use in your templates, components,
    and services.
    
    > **NOTE**: Importing all of the Material modules in one `MaterialModule` is only for prototyping. It will result in bundle
    bloating in a production app.

### Install the other dependencies that we'll need

Install the following NPM packages
 - `@angular/flex-layout@6.0.0-beta.15`
 - `@swimlane/ngx-charts`
 - `moment`
 - `rxjs-compat`

## Built-in Theming

Let's add an Angular Material component to very that we've set things up correctly.

1. Open `/src/app/app.component.ts` and add a toolbar before the `router-outlet`.

    ```typescript
    <mat-toolbar color="primary">Test</mat-toolbar>
    ```
1. You should see the text, but the toolbar is missing its coloring. Let's solve that by
using one of the built-in Material themes. In `/src/styles.scss`, import a theme:

    ```scss
    @import '~@angular/material/prebuilt-themes/indigo-pink.css';
    ```
    
    Angular Material comes with 4 built-in themes with formats of primary-accent where
    the primary color is used for common elements (toolbars, inputs, selects, etc.)
    and the accent color is used for important interactive components like buttons,
    slide toggles, radio buttons, checkboxes, etc.
    - indigo-pink
    - deeppurple-amber
    - pink-bluegrey
    - purple-green
    
    More details on theming in Angular Material can be found in the [Theming Guide](https://material.angular.io/guide/theming).
    
1. Now you should see an indigo toolbar, but it isn't full bleed (meaning that it doesn't
stretch to the left, right, and top edges of the page in this case). Let's fix this by
adding the following CSS just below that import:

    ```scss
    body {
      margin: 0;
    }
    ```

## Typography and Icons

1. Material Design comes with an open source icon set. Let's link it in the `<head>` of
our `/src/index.html`:

    ```html
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    ```
    You can quickly look up Material Design icons [here](https://material.io/tools/icons/).
    Note the filter input in the top left and the new icon themes on the left side.

    <img height="600px" alt="Material Design Icons page" src="https://user-images.githubusercontent.com/3506071/39853468-6ab9fe7c-53f0-11e8-9ff7-ec31823dbcfe.png">
    
1. Angular Material's typography uses the Roboto font by default. We need to link it, with
the font weights that we need to use, in the `/src/index.html`'s `<head>` as well:

    ```html
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    ```

1. Now we want to use Angular Material's typography across our whole app. So we'll add
`class="mat-typography"` to our `<html>` element. More details on Angular Material's typography
can be found in the [Typography Guide](https://material.angular.io/guide/typography).

[Go to the Next Step](step-1.md)
