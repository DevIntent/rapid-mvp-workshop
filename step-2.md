# Custom Theming and SCSS

1. Open [Step 2 in StackBlitz](https://stackblitz.com/edit/step-2?file=src%2Fapp%2Fadd-child%2Fadd-child.component.ts)

    We've made some updates to the app for you. We'll recap them now...
    
1. Notice that we've added content to each card in the `mat-card-content` element. You should see the
files related to this new Component in `/src/app/avatar/`. We'll look into those a little later.

    ```html
    <app-avatar gender="male" [emoji]="defaultBoyEmoji"
                opacity="0.7" fxLayout="column"
                fxLayoutAlign="start center"></app-avatar>
    ```
    This `app-avatar` is a custom element and Angular Component. Custom Elements are detailed in the
    following [article](https://developers.google.com/web/fundamentals/web-components/customelements)
    but Angular hides a lot of this complexity from developers. This `app-avatar` selector is
    defined in the `@Component` decorator's `selector` field.
    
    This Component takes a number of [Inputs](https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding)
    as attributes. When the `[]`s are used, this means that the argument is evaluated
    (i.e. `[emoji]="defaultBoyEmoji"`), when they aren't used the attribute is just set to the
    provided `string` (i.e. `gender="male"`). Note that the component's class now has fields for
    `defaultBoyEmoji` and `defaultGirlEmoji`.
    
    In `/src/app/add-child/add-child.component.scss`, take note that we've replaced some of the
    values with SCSS variables (i.e. `$base-spacing`) which is defined in a 
    [SASS Partial](https://sass-lang.com/guide). You can see that file in `/src/_variables.scss`.

1. Take a quick look at `/src/app/avatar/avatar.component.ts` and ask any questions that you
may have. It's a simple component, but it uses a number of interesting features in order to
be re-usable.

## Global Styles

In many Material Design apps, it is preferable to capitalize the text within buttons. Our app
does not currently do this since Angular Material leaves this up to the developer. Now let's
make this change globally across our app.

1. In `/src/styles.scss`, add:

    ```scss
    .mat-button {
      text-transform: uppercase;
    }
    ```
    > **NOTE**: You should always style Angular Material components using classes and not elements
     (i.e. `.mat-button` vs. `mat-button`).

## Custom Theming

1. Take a look at the theme definition in `/src/_theme.scss`.
1. You can see where the primary and accent themes are defined. They are using the same default
indigo and pink theme.
1. Let's change the theme by modifying to be the following:

    ```scss
    $app-primary: mat-palette($mat-cyan);
    $app-accent: mat-palette($mat-pink, 300, 100, 900);
    ```
    You should see the impact of the indigo -> cyan change as well as the pink color becoming
    slightly lighter.

1. Take a look at `/src/app/avatar.component.scss`.
1. We're using the `mat-color` mixin from Angular Material here to apply a color from our palette
to one of our custom elements (rather than an Angular Material component). In this case, it
is used to dynamically change the `background-color` of the card content based on the passed in
gender. 

You can see the completed step 2 [here](https://stackblitz.com/edit/step-2-complete?file=src%2F_theme.scss).
