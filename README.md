# Object Destructure
> Destructure an object into an object instead of separate variables

## Destructuring assignment
The destructuring assignment is a common practice in ES6. You can destructure an object into separate variables. 
There are however use cases where you want to destructure an object into a new object. 

Let's take the following code:

```javascript
const original = { a: 1, b: "foo", c: true };

// Destrucure
{a, b} = original;
```

However if you want to pass those values as an object, you have to create an object again: `destructured = {a, b}`. 

An example could be some nested react components. The lower order components only need a subset from the properties the higher component needs. And you don't want to pass unneeded properties into your objects (which can easily be done by the spread operator).

Therefore you can use this little library which extends `Object`.

## Usage
Import this library and you're good to go. `Object.destructure` should be a function. This function has two arguments:

- `wrap`: If your original object is of type T, the wrap function should be of type `() => T` but written in this form `() => ({prop1, prop2} = original)`. So the body of the lambda is a **destructuring assignment** which when executed returns the original. 
- `clone`: Optional parameter. When false the props are assigned to the destructured one as references, when true the lib tries to clone everything.

```javascript
    // You'll get an object {a, c} from the original
    const destructured = Object.destructure(() => ({a, c} = original));

    // You'll get an object {a, b} from the original
    const destructured = Object.destructure(function(){ return {a, b} = original });
```