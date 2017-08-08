# Tvinder Workshop Guide
A Step by step process to building a simple Vue.js app

## Core concepts: 
* Scaffolding a Vue.js app with plain JS
* Vue.js Components
* Passing Data with Props
* Computed Properties
* Methods
* Data Binding
* Events / Event Handling

## Steps:
### Step-1 - Scaffolding the app

### Step-2 - Our first component
In this step we are going to build our first component. What is a component? 
From the Vue.js documentation - 

> At a high level, components are custom elements that Vue’s compiler attaches behavior to.

There are three main parts to a Vue.js component. They are the `template`, the `script`, and optional `styling`. 

#### Template
This is the HTML markup for a component. 

#### Script
This is where all of the Javascript that defines a components behavior lives.

#### Styling
This is the CSS styling for a component. 

You can leverage Vue to create these components in different ways. If you go to the Vue.js documentaion you will see information for [Single File Components](https://vuejs.org/v2/guide/single-file-components.html). However in order to construct components this way you will need to compile them. We can build the components more simply using plain Javascript which is what we will be illustrating here.

So without further adeu, let's register our first component. We will be adding the Header of our app.

1. First we will create a javascript file for our component. `src/components/header.js`
2. Inside this file we will add two important pieces of information for our component.
  - The template
  - The script

`src/components/header.js`
```
((() => {
  const html = `
  <div class="header">
    <div class="header--left">
      <h1>tvinder</h1>
    </div>
    <div class="header--right">
      <h1>votes</h1>
      <div class="header__data">
        <h1>0</h1>
      </div>
    </div>
  </div>
  `

  Vue.component("app-header", {
    template: html,
  })
}))()
```

There are many ways to define the template for a Vue component. Here we are simply defining a string of HTML and setting it to a variable, and then telling the Vue component to use this string as the template. The other important part of this file is `Vue.component()`. Here we give the component the name of `app-header` and define what the template will be. Other component behavior will also be defined in this component. We will discuss this later.

3. Now that we have a component to render, we need to load it into our app. Add a refernce to the component `<script src="src/components/header.js"></script>` to our `index.html` in order to load it.

`index.html`
```
...
<body>

  <div id="app">
    <tvinder-app></tvinder-app>
  </div>

<script src="src/components/app.js"></script>
<script src="src/components/header.js"></script>
<script src="src/main.js"></script>
</body>
...
```

4. Now that we have loaded the component, we need to render it. Add `<app-header></app-header>` to our `app.js` component.

`src/components/app.js`
```
((() => {
  const html = `
    <div>
      <app-header></app-header>
    </div>
  `

  Vue.component("tvinder-app", {
    template: html,
  })
}))()
```

5. Presto! That is it, our first component.
6. (Optional) Add in some CSS styling for our component in `src/assets/stylesheets/tvinder.css`
