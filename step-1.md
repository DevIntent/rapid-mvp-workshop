# Create a Component

1. Open [Step 1 in StackBlitz](https://stackblitz.com/edit/step-1?file=src%2Fapp%2Fapp.component.ts)

<img height="500px" alt="Create Component" src="https://user-images.githubusercontent.com/3506071/39678192-ffb356a6-513c-11e8-8502-10fb02155ecc.png">

1. Right click on the `app/` folder to get the context menu. In this menu,
   select to generate a new "Component".

1. When prompted for the component name, type `add-child` and press the ENTER key.

    You should see a new `.scss` and `.ts` file under the `add-child/` folder now. However, the
    component doesn't show in the app preview to the right.

1. This is because we need to hook the component up to the router. Open `/src/app-routing.module.ts`.

1. We need to add the component to a route and import the component into the module. Add the
  following import and update the routes as seen below.

    ```typescript
    import { AddChildComponent } from './add-child/add-child.component';
 
    const routes: Routes = [
      {path: '', component: AddChildComponent},
      {path: 'add', component: AddChildComponent}
    ];
    ```
    The routes are examined in order, the first match is activated and following matches are
    ignored. The route with an empty path represents the app's root route 
    (i.e. https://rapid-mvp-workshop.firebaseapp.com/). This means that our home page will now
    display the new `AddChildComponent`. The second route here also makes this component
    available at `/add`. This is useful in case we change the default route. We'll still have
    a valid route to the `AddChildComponent`.

    You should see "add-child Works!" in your app preview.

1. Now we need to make this add child component do something useful. The first thing that it
needs to do is allow the user to select the gender of the child. We'll do this using a couple
cards. Let's add the boy card and some containers (for layout) first:

    In `/src/app/add-child.component.ts` change the `template` to:
    ```typescript
    template: `
      <div class="container" fxLayout="column" fxLayoutAlign="start center">
        <div id="genderSelection" fxLayout="column" fxLayout.gt-sm="row"
             fxLayoutAlign="center center" fxLayoutGap="24px" fxFlex>
          <mat-card id="boy" (click)="addBoy()" aria-label="Add a boy">
            <mat-card-content fxLayout="row" fxLayoutAlign="center center">
              
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button color="primary">Add a boy</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    `,
    ```
    In `/src/app/add-child.component.scss` add the following:
    ```scss
    :host {
      display: flex;
      height: 100%;
      width: 100%;
    }
    .container {
      margin-top: 24px;
      width: 100%;
    
      #genderSelection {
        width: 100%;
        margin-bottom: 48px;
    
        .mat-card {
          width: 192px;
          cursor: pointer;
        }
      }
    }
    ```
    You should now see a card with a flat button for "Add a boy".
    
    First, take note of how the card is built. There is a `mat-card` parent that can contain
    a number of card elements like `mat-card-content` and `mat-card-actions`. We take advantage
    of the `mat-card-actions` API here to align the button at the end (right side in a RTL
    or Right To Left locale). You can find out more about `mat-card` and its elements on its
    [docs page](https://material.angular.io/components/card/overview#basic-card-sections).
    There you can see that `align="start"` is the other option for `mat-card-actions` button
    alignment.
    
    We make the card clickable by adding a `click` event handler. Angular uses a shorthand for
    these event handlers by surrounding the event name with parenthesis. This supports native
    events or custom events. We'll add this `addBoy()` function later. For interactive elements
    that aren't native elements (like `<button>`), you'll want to add a useful
    `aria-label` to support accessibility (a11y).

    We're using a `mat-button` as well. This component uses a native `button` element in order
    to gain all of the benefits of native buttons (a11y, default behaviors/styles, etc.).
    Additionally, we use the `color="primary"` theme API. This is common across most all of the
    Angular Material components. It tells the component weather it should use the primary,
    accent, or warn palette.
    
    Now you are probably wonder what all of these `fx*` attributes are all about. These are
    part of the Angular Flex Layout library. For now, the interesting Flex Layout attributes
    are on `genderSelection`: `fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="center center" fxLayoutGap="24px" fxFlex`.
    The first two [fxLayout](https://github.com/angular/flex-layout/wiki/fxLayout-API)
    attributes tell the component to use a column layout by default,
    but when on screens that are greater than small, use a row layout. See the
    [fxLayout docs](https://github.com/angular/flex-layout/wiki/fxLayout-API) for more details.
    
    The size definitions of the screens can be found in Flex Layout's
    [Responsive API docs](https://github.com/angular/flex-layout/wiki/Responsive-API).
    
    The [fxFlex](https://github.com/angular/flex-layout/wiki/fxFlex-API) attribute indicates
    that this component should "Resize to fill the available space along the main-axis flow
    of its parent container." In a row layout, the main-axis would be horizontal. There are
    a lot of details in the [fxFlex docs](https://github.com/angular/flex-layout/wiki/fxFlex-API).
    It is highly recommended that you review them, even if you don't fully understand it all.
    If you want to better grasp Flexbox CSS Layouts, then I would recommend checking out
    [Flexbox Zombies](https://mastery.games/p/flexbox-zombies) after this workshop.
    
    Note that Flex Layout attributes without `Layout` in them, apply to the element itself.
    Flex Layout attributes with `Layout` in them, apply to the children of the element.
    
    The [fxLayoutAlign](https://github.com/angular/flex-layout/wiki/fxLayoutAlign-API) 
    attribute here is indicating that the children of this component
    should be aligned in the center of the main axis and the center of the cross axis.
    The reason that this uses the axis terminology is because these axes can change when
    the layout changes from row to column and vice versa. So it can't just be vertically
    and horizontally. See the
    [fxLayoutAlign docs](https://github.com/angular/flex-layout/wiki/fxLayoutAlign-API)
    for more details.
    
    Finally, [fxLayoutGap](https://github.com/angular/flex-layout/wiki/fxLayoutGap-API) here tells
    the system to add a margin of `24px` between elements in this layout. This automatically
    accounts for row vs column layouts. See the
    [fxLayoutGap docs](https://github.com/angular/flex-layout/wiki/fxLayoutGap-API)
    for more details.
    
    Just one note about the SCSS that we added. We're using a special `:host` pseudo selector here.
    This allows styling the element that hosts the component, rather than some child element within
    the component. You can learn more in the Angular's [Component Stying Docs](https://angular.io/guide/component-styles#host).

    Now if you are starting to understand how Flex Layouts are supposed to work, you should
    be wondering why your new card isn't centered! doh! This is actually a very common issue.
    The attributes don't cause any build errors or failures if the module and library aren't
    included in the app! In Step 0, we only imported the library via NPM. However, we didn't
    register the module with Angular.
    
1. Add the `FlexLayoutModule` to your imports in `/src/app/app.module.ts`:

    ```typescript
    imports: [
      FlexLayoutModule,
    ],
    ```    
1. Add the TypeScript import at the top of the `/src/app/app.module.ts` file:

    ```typescript
    import { FlexLayoutModule } from '@angular/flex-layout';
    ```
    Hooray! Your card should now be centered!

1. Now we'll add the card for selecting a girl. In `/src/app/add-child.component.ts`
add the following the `template` after the end of the boy card:

    ```html
    <mat-card id="girl" (click)="addGirl()" aria-label="Add a girl">
      <mat-card-content fxLayout="row" fxLayoutAlign="center center">
        
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button color="accent">Add a girl</button>
      </mat-card-actions>
    </mat-card> 
    ```
    Nothing special here. You should see a second card for adding a girl with a button that
    uses the `accent` palette. If the screen is larger than small (959px), then you should
    see two cards side by side. If the screen is small or smaller, then you should see one
    card above another card. You can use [Chrome DevTools device mode](https://developers.google.com/web/tools/chrome-devtools/device-mode/)
    to emulate this and test different size screens.

Now that we've got our first component created. We need to step back a little bit and do some
optimizations so that our future workflow will be more efficient.

Here's the [completed Step 1](https://stackblitz.com/edit/step-1-complete?file=src/app/add-child/add-child.component.ts)
on StackBlitz if you run into any problems.

[Go to the Next Step](step-2.md)
