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
* Condition based rendering
* Vuex state management

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
1. First let's add some necessary HTML markup so that we can use click events to fire off our methods. We will use some icons for our like and dislike buttons
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
    type: Number,
    required: true,
  }
}
...
```
That's it! Now we are updating our like count from our actions component.


### Step-7 - Use Computed Properties to Render Movie Information
In this last step we will complete the app, and learn about computed properties! Now that we have most of the functionality built out, we will need to have some actual data to interact with. We have a `json` file with a list of movie objects with a movie name and a url that points to a poster of that movie. Up til now our templates have been very simple. We have some data or some prop with a name and a value, and we simply bind that data in the template. But what if you have some data that is not a simple key value pairing? For instance, what if you had someone's name, but in the template you wanted to display their name backwards for some odd reason. 

```javascript
...
<div>
  {{ name.split('').reverse().join('') }}
</div>
...
```

That looks kind of ugly, and you can imagine there could be much more complex pieces of logic for information you would want to render in the template. This is where computed properties come in handy. They can all this complex logic and allow us to simply use the name of that property in the template. 


```javascript
...
<div>
  {{ reversedName }}
</div>

...

computed: {
  reversedName() {
    return this.name.split('').reverse().join('')
  }
}
...
```

This cleans up our templates and allows us to handle any complex interactions with our data more easily! So much the same as methods, computed is a custom attribute Vue implements. Inside the computed attribute, we declare functions for all of our computed properties. One other important note, is that any time a piece of data is updated, its computed property will also be updated. Vue also implements watched properties, which can react to changes in data, but for now we will focus on computed properties. 

With this in mind, let's think about how we will interact with our data. We have a list of movie objects, and each has a key value pair of name and image url. We have a `movies` component that can render the name and image of one movie at a time. So, we should pass a movie object as a prop to our `movies` component. But how will we select which movie to display from the list? One way would be to just randomly select a movie from the movies list and pass that in as a prop. But what if order matters or we don't want to potentially see the same movie twice? Another way is to keep track of an index in the list to select a movie from, and pass the movie at that inex to our `movies` component. We will choose to do it this way!

1. First let's capture our movie-data and set up the initial index of that list we want to render

`src/components/app.js`
```javascript
...
 data(){
  return {
    likes: 0,
    imageIndex: 0,
    movieData: window.movieDataJson.posters
  }
 }
...
```

We have already set movieData on the window so that we can easily use this JSON.

2. Now that we have some data to work with, let's pass that movie object to our `movies` component.

`src/components/app.js`
```javascript
...
<div>
  <app-header :likes="likes"></app-header>
  <movies :movie="movie"></movies>
  <actions @handleLikes="handleLikes" @handleSkip="handleSkip"></actions>
</div>
...

computed: {
  movie() {
    const self = this
    return self.movieData[self.imageIndex]
  }
},
...
```

Here we are using a computed property to select which movie we will send as a prop to our `movies` component. We could also accomplish this directly in the template with something like `<movies :movie="movieData[imageIndex]"></movies>`, but using a computed property can be a more clean approach.

3. Now that we are passing the movie object, we need to update our `movies` component to use this object. This means more computed properties! Instead of taking the image url directly from a prop, we are now getting it from our movie object. 

``
```javascript
...

<div class="movies">
  <div class="movie-poster-container">
    <img class="movie-poster" v-bind:src="extractImageUrl" v-bind:key="extractImageUrl">
    <div class="movie-name">{{ extractImageName }}</div>
  </div>
</div>
    
...
Vue.component("movies", {
  template: html,
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },

...

computed: {
  extractImageUrl() {
    const self = this
    return self.movie.url
  },
  extractImageName() {
    const self = this
    return self.movie.name
  }
},

...
```

Here we update our props to take in a movie object, and we define two computed properties to extract the information we want to bind to the template.

4. The last step is to implement our `incrementImage()` method on our `app` component so that when we like or dislike a movie, we cylce to the next movie. 

`src/components/app.js`
```javascript
...
incrementImage() {
  const self = this

  self.imageIndex += 1

  if(self.imageIndex > (self.movieData.length-1)) {
    self.imageIndex = 0
  }
}
...
```

### Step-8 - Implement Vuex
In this step we will implement Vuex state management system for our app. For an app this size, Vuex might not be necessary, but it is a good starting point to learn the core concepts of Vuex. 

So what is Vuex? It is a centralized store for every component in the app. It ensures that its state can only be mutated in a predicatable way. Why would we want to use Vuex? There can be many answers to this question - but two good cases for implementing Vuex in your app are when: 
1. multiple components depend on the same piece of state, or when 
2. actions from different components have to mutate the same piece of state. 

There are 5 core concepts to Vuex. They are state, actions, mutations, getters, and modules. In this implementation we will look at all of these except for getters. Modules are a way to divide the store up into smaller parts, each with their own state, mutations, actions, and gettes. State is an object that contains all of the data and will act as the single source of truth for state in the application. Mutations are the only mechanism to change state. You must commit a mutation with a type and a handler function which will actually perform the state modification. Actions are similar to mutations except their jobs are to commit mutations. 


And there we go! The app is complete!
