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
In this step we will be bootstrapping our app.

First we are going to create `main.js` which will look like so: 

```javascript
((() => {
  const App = window.App
  const Vue = window.Vue

  Vue.component("tvinder-app", App)

  new Vue({
    el: '#app',
    data: {
      hello: "world"
    }
  })
}))()
```

Lets break down what's going on here.

```javascript
  const App = window.App
  const Vue = window.Vue
```

These two lines are pretty straigt forward. We are getting a reference to `Vue` and something called `App` which is simply a property we added to the `window` object in another file (`app.js`).

```javascript
  Vue.component("tvinder-app", App)
```

Next we register a component with vue to be used later. This will be covered more in a later, and infact will be done slightly differently. This simply illustrates a second way to register a component.

```javascript
 new Vue({
    el: '#app',
    data: {
      hello: "world"
    }
  })
```

Finally we call `new Vue()`. This is the entry point of our app and attaches it to an element on the page that we define (in this case `#app`). If you look at `index.html`, you will notice that `#app` is a div that wraps our app. What is neat about this is that you could have a small Vue app living instide a larger webapp by simply bootstrapping an id on an element withen that larger webapp.

Looking at the changelog, you will probably notice a few more files. `movie-data.json` is a file with some data that we will be using later on. `app.js` will also be covered in more detail in a later step. `index.html` is the entry point into our app. I do want to point out one thing:

```html
<script src="src/components/app.js"></script>
<script src="src/main.js"></script>
```

We must load all of our components before loading the file that bootstraps the application. If we dont then when Vue is doing its thing it will not know that about any components that we have made.

Oh...and ofcourse we have `vue.js`, the star of this show!

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


### Step-3 - Adding Data to our Component
In this step we will be adding data to our component and using data binding to render our values.

Data is an important part of Vue components. They keep a sort of local state in the component. One important gotcha with data on a component is that it must be a function. 

Ex:
```
data: function () {
  return {
    someKey: SomeValue
  }
}
```

If you look at the markup for the `app-header` you will see that we have hardcoded a `0` as the value for our likes. This is not very useful... Instead we will declare some attribute in our data object that we will use to render the amount of likes. We will be able to manipulate this data in our app and dynamically display the number of likes we have.

1. First we will add the data function to our component. 

`src/components/header.js`
```
data(){
  return {
    likes: 0
  }
}
```

Here we use key value pairs on our data object to set an initial value for likes.

2. Next we will use data binding to render this value in our template.

`src/components/header.js`
```
...
<div class="header--right">
  <h1>votes</h1>
  <div class="header__data">
    <h1>{{ likes }}</h1>
  </div>
</div>
...
```

The way you bind data in Vue is with the double `{{  }}`. Inside the curly brackets, all you need to do is include the name of the attribute you want to bind to.


### Step-4 - Use Props to Pass Data
Now that we have successfully built out our first component and learned how to bind and render data, we will look at one way we can pass data between components. In this step we will learn how to pass data as a Prop from one component to another.

In Vue, every component is a standalone instance. It is isolated and has its own scope. This means that any one components cannot directly reference another components data. In Vue in order to pass data from a parent component to a child component we use a custom attribute called **props**. Props are an example of 1-way data binding between a parent and child component. So what does this mean? Straight from the Vue documentation -

> when the parent property updates, it will flow down to the child, but not the other way around

To declare a prop on your child component you must first make a reference to the custom Vue attribute. You do this by adding:

```
props: {
  // Props go here.
}
```

to your component. Next, inside this attribute, you define the prop you will be recieving from the parent component. There are a few important pieces of information you can set inside this definition. Here is an example: 

```
props: {
  someString: {
    type: String,
    required: false,
    default: "Hello World"
  }
}
```

This is all you need to do on the child component to declare a prop. The last thing to do is to pass in the prop to the child component - from the parent component - in the template. So if our child component was called `an-amazing-component` we would pass our `someString` prop to it like this: `<an-amazing-component :someString="'this is an amazing component!'"></an-amazing-component>`

Now that we know the basics of props, let's leverage them in our app. We are going to be rendering movie information; it would be overkill for the component that renders the movie information to know about the entire set of information. So this is a good spot to use props - to pass down only the movie information that we care about! 

1. First we will create a new component `movies`.

`src/components/movies.js`
```
((() => {
  const html = `
    <div class="movies">
    </div>
  `
  Vue.component("movies", {
    template: html,
  })

}))()
```

2. Next we will add the prop we want to recieve from the parent component. To start let's just capture an image url and render that on the page. So we will declare a prop called `image_url` and we know that the url is a `String`.

`src/components/movies.js`
```
((() => {
  const html = `
    <div class="movies">
    </div>
  `
  Vue.component("movies", {
    template: html,
    props: {
      image_url: {
        type: String,
        required: true,
      }
    }
  })

}))()
```

3. Next we need to pass this data to our `movies` component. We will render our `movies` component in the `app` component. So we will places it inside the markup, and pass the `"image_url` prop. Here you can see the value of the prop is also `image_url`. Actually we are setting the value of `image_url` inside the data of this component - `image_url: "https://goo.gl/Puw6Ar"`. This will be useful for us later when we want to change the value of `image_url` on the fly.

`src/components/app.js`
```
((() => {
  const html = `
    <div>
      <app-header></app-header>
      <movies :image_url="image_url"></movies>
    </div>
  `

  Vue.component("tvinder-app", {
    template: html,
    data(){
      return {
        image_url: "https://goo.gl/Puw6Ar"
      }
    }
  })
}))()
```

4. Last but not least we need to render the image! To do this we just need to add some HTML to display the image. 

`src/components/movies.js`
```
<div class="movie-poster-container">
  <img class="movie-poster" v-bind:src="image_url">
</div>
```

Now we are using props to render an image!


### Step-5 - Create First Method
In this step we will be creating our first method and triggering that method from the webpage. Methods are another Vue.js custom attribute. We use methods to define the behaviors of a component. All methods are housed in the 

```
methods: {
  // My methods go here.
}
```
attribute on a Vue.js component. Inside methods we can declare any functions we will need. For example, let's say we had a calculator component, we might need a method to do some addition or subtraction. 

`calculator.js`
```
 methods: {
 
  add(a, b) {
    return (a + b)
  },
  
  subtract(a, b) {
    return (a - b)
  }
  
  // Other useful methods
  ...
  
 }
```

You can even use methods inside other methods by using a refernce to `this`. For example: 

`talk.js`
```  
  say() {
    this.phrase("I'm Pickle Rickkkk!")
  },
  
  phrase(somePhrase) {
    alert(somePhrase)
  }
  
  // Other useful methods
  ...
  
 }
```

Now that we know some of the basics about methods, let's wire up some in our component. Let's start with something simple. We can make a link to click, that will alert some text in our window. 

1. First let's make an actions component that will contain all of the interactions we want to have with the app. This will be helpful to us later as we continue to add more and more pieces. 

`src/components/actions.js`
```
((() => {
  const html = `
  <div class="actions">
  </div>
  `

  Vue.component("actions", {
    template: html,

  })
}))()
```

2. Next we will add our methods attribute and a simple method.

`src/components/actions.js`
```
((() => {
  const html = `
  <div class="actions">
  </div>
  `

  Vue.component("actions", {
    template: html,

    methods: {
      myFirstMethod() {
        alert("I have been clicked!")
      }
    }
  })
}))()
```

3. Finally let's fire off this method from a link on the webpage.

`src/components/actions.js`
```
((() => {
  const html = `
  <div class="actions">
    <div class="controls">
      <a id="skip" href="#" v-on:click.prevent="myFirstMethod" class="icon-button">Click Me!</a>  
    </div>
  </div>
  `

  Vue.component("actions", {
    template: html,

    methods: {
      myFirstMethod() {
        alert("I have been clicked!")
      }
    }
  })
}))()
```

Let's take a step back and look at the what is happening in the template. `v-on:click.prevent="myFirstMethod"` Here we are using the `v-on` directive for event handling. Events will be touched on more in the next step, and `v-on` is a little out of the scope of this project. But in simple terms, this just means, on - click - do - myFirstMethod. So when this link is clicked, the `myFirstMethod` function will fire off!

### Step-6 - Use Events to Transmit Data


### Step-7 - Use Computed Properties to Render Movie Information
