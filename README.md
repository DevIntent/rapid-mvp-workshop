# rapid-mvp-workshop
This workshop is designed to help you learn how to use a set of Angular
tools for prototyping and building functional [MVPs](https://en.wikipedia.org/wiki/Minimum_viable_product).

## Firegrow
The theoretical product that we'll be building in this workshop is
Firegrow. This product is designed to solve a problem that many new
parents encounter. They need to keep track of the growth of their children.

There are many free apps that do this currently, but the usability and user experience
of these apps is often frustrating. These apps could also disappear at
any time, taking the data with them. Additionally, they require you to send off
data about your children to some unknown company's servers. Deploying your own version
of this this app, enables you to store the data in a database that you control and
gives you freedom to add features or tweak the UX. 

Finally, this seemed like a really good fit for an MVP workshop because the concept is 
easy for most anyone to grasp and it exercises the key features found in many business
applications (i.e. forms, charts, etc.). You should be able to extend this application
and change just a few concepts to create a whole new app that tracks something like 
meals, workouts, writing sessions, meditation, etc.

## Phase 1
In the first phase, we'll just focus on building out the interaction
and the UI. We'll use mock data and localStorage to simulate a database
so that we can stay focused on the design, layout, and interaction.
In this phase, we'll cover some of the following technologies:

1. [Angular CLI](cli.angular.io)
1. [Angular Material](https://material.angular.io)
1. Angular [Flex Layout](https://github.com/angular/flex-layout)
1. [HTML 5 localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
1. Angular [Reactive Forms](https://angular.io/guide/reactive-forms)
1. [ngx-charts](https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical) (to visualize data with [D3.js](https://d3js.org))

## Phase 2
In the second phase, we'll get more functional by adding features from
[Firebase](https://firebase.google.com) to allow us to deploy the app,
attach a database, add user authentication, and enable storing files.
In this phase, we'll cover some of the following technologies:

1. Firebase Hosting
1. [AngularFire2](https://github.com/angular/angularfire2)
1. Firebase Realtime Database
1. Firebase Auth
1. Firebase Cloud Storage

## Start the Tutorial
1. Open [Getting Started](docs/step-0.md)
1. Follow the guidance in each step
1. Use the link at the end of each step to move to the next step
