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
```javascript
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
```html
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
```javascript
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
```javascript
data: function () {
  return {
    someKey: SomeValue
  }
}
```

If you look at the markup for the `app-header` you will see that we have hardcoded a `0` as the value for our likes. This is not very useful... Instead we will declare some attribute in our data object that we will use to render the amount of likes. We will be able to manipulate this data in our app and dynamically display the number of likes we have.

1. First we will add the data function to our component. 

`src/components/header.js`
```javascript
data(){
  return {
    likes: 0
  }
}
```

Here we use key value pairs on our data object to set an initial value for likes.

2. Next we will use data binding to render this value in our template.

`src/components/header.js`
```javascript
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

```javascript
props: {
  // Props go here.
}
```

to your component. Next, inside this attribute, you define the prop you will be recieving from the parent component. There are a few important pieces of information you can set inside this definition. Here is an example: 

```javascript
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
```javascript
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
```javascript
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
```javascript
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
```javascript
<div class="movie-poster-container">
  <img class="movie-poster" v-bind:src="image_url">
</div>
```

Now we are using props to render an image!


### Step-5 - Create First Method
In this step we will be creating our first method and triggering that method from the webpage. Methods are another Vue.js custom attribute. We use methods to define the behaviors of a component. All methods are housed in the 

```javascript
methods: {
  // My methods go here.
}
```
attribute on a Vue.js component. Inside methods we can declare any functions we will need. For example, let's say we had a calculator component, we might need a method to do some addition or subtraction. 

`calculator.js`
```javascript
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
```javascript
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
```javascript
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
```javascript
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
```javascript
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
Now that we know how to create a method that does some action, we want to implement our like, dislike, and skip methods. In this step let's wire up those actions to influence our like count. We will make like increment the count by one, dislike decrement the count by 1 and skip will not do anything to the count. So our `actions` component will cause an action that changes the value of `likes`, and our `header` component will have to know when `likes` has changed and render that value. Looking at the structure of the app, we see that `actions` and `header` are siblings, and children of the `tvinder-app` component. We know that we can use props to pass data from parent to child, but how can we pass information from child to parent? Every Vue component has an events interface. This allows the component to listen to an event, and trigger an event. We saw the first of this interface in the previous step where we used `v-on` to listen for a click event. Here we will want to do both, trigger an event for one of our three actions, and listen for that event on the parent component to register that something has happened. 
1. First let's add some necessary HTML markup so that we can use click events to fire off our methods. 
`index.html`
```javascript
...
  <link rel="stylesheet" type="text/css" href="src/assets/stylesheets/tvinder.css">
  <svg class="svg-header">
    <symbol id="icon-heart" viewBox="0 0 32 32">
      <title>heart</title>
      <path d="M23.6 2c-3.363 0-6.258 2.736-7.599 5.594-1.342-2.858-4.237-5.594-7.601-5.594-4.637 0-8.4 3.764-8.4 8.401 0 9.433 9.516 11.906 16.001 21.232 6.13-9.268 15.999-12.1 15.999-21.232 0-4.637-3.763-8.401-8.4-8.401z"></path>
    </symbol>
    <symbol id="icon-cross" viewBox="0 0 32 32">
      <title>cross</title>
      <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
    </symbol>
  </svg>
</head>
...
```
We will use some icons for our like and dislike buttons
`src/components/actions.js`
```javascript
...
<div class="actions">
  <div class="controls">
    <div class="icon-button" v-on:click="decrement()">
        <svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg>
    </div>
      <a id="skip" href="#" v-on:click.prevent="skip" class="icon-button">Skip</a>
    <div class="icon-button" v-on:click="increment()">
      <svg class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg>
    </div>
  </div>
</div>
...
```
Here is the markup that will render those icons and also listen for click events that will trigger our three methods.
2. Ok, now that we have some markup to work with, let's actually create our methods.
`src/components/actions.js`
```javascript
...
methods: {
  skip() {
    const self = this
    self.$emit('handleSkip')
  },
  increment() {
    const self = this
    self.$emit('handleLikes', 1)
  },
  decrement() {
    const self = this
    self.$emit('handleLikes', -1)
  }
}
...
```
Here we are defining the three actions we want to perform. `increment` and `decrement` are equivalent to 'like' and 'dislike'. So on click of the HTML element, do the corresponding action. So let's look at what these actions do. The only thing that they do is `$emit` something. `$emit()` is part of the components event interface. Inside the parentheses, we must specify an `eventName` and an optional argument for any data we want to pass along. So `increment()` will emit an event with the name of `handleLikes` along with the value of `1`. These events move upwards in the component tree. So the parent component of `actions` will be able to listen for an event with this name.
3. Now that we are emitting named events, we can listen for them on the parent component. We can capture these events that will trigger some action in the parent component. 
`src/components/app.js`
```javascript
...
<div>
  <app-header></app-header>
  <movies :image_url="image_url"></movies>
  <actions @handleLikes="handleLikes" @handleSkip="handleSkip"></actions>
</div>
...
```
The way you listen for these events is with a directive on the HTML element. We declare this directive with an `@` symbol and the event name we are listening for. So when we `$emit('handleLikes')` from `actions.js` `@handleLikes` will respond to that event. The second part to this directive is the method to call. This is the `="handleLikes"` part. All this meansis that we will fire off the `handleLikes` method on the component as the response to whatever event we have captured. 
4. Now that we are listening to the events we are emitting, we need to implement the methods that will fire when we recieve those events. 
`app.js`
```javascript
...
methods: {
  handleLikes(vote) {
    const self = this
    self.likes += vote
    self.incrementImage()
  },
  handleSkip() {
    const self = this
    self.incrementImage()
  },
  incrementImage() {
    // TODO
  }
}
...
```
5. The last step is to add `likes` to our data function in `app.js` so that we can update that value, and pass it as a prop to our `header` component.
`src/components/app.js`
```javascript
...
<app-header :likes="likes"></app-header>
...
```
`src/components/header.js`
```javascript
...
props: {
  likes: {
    type: String,
    required: true,
  }
}
...
```
That's it! Now we are updating our like count from our actions component.


### Step-7 - Use Computed Properties to Render Movie Information
