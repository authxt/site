---
title: "Java's Type Flexibility: Bug or Feature?"
description: "Comparing type handling in Java and TypeScript generics."
author: authxth
publicationDate: 2021-4-19
tags: ["thoughts", "blog"]
---

Recently, I wanted to recreate the flexibility of `console.log` in Java, so I decided to write a generic `print` function that could accept multiple arguments and print them comma-separated, just like `console.log` in JavaScript or TypeScript. The result? I was left with more questions than answers. Let me walk you through it.

### The Java Code
I started by writing a simple generic function in Java that takes varargs of type T and prints them, separating the values with commas:

```java {3}
public class Main {
    public static void main(String[] args) {
        Main.print(1, "4", new ArrayList<>());
        // Expected type issues, but it ran without any problem!
    }

    private static <T> void print(T... args) {
        System.out.println(Arrays.toString(args));
    }
}
```

I expected Java’s strict typing to warn me or throw an error when I passed mixed types—Integer, String, and ArrayList—but it didn’t. The code compiled and ran just fine, printing `[1, 4, []]` without any complaints.

This left me astonished because, as someone who also works with TypeScript, this felt off. Shouldn't Java catch this type inconsistency?


### Trying It in TypeScript
Naturally, I turned to TypeScript to see how it would handle this. I wrote a similar function in TypeScript:

```ts {5}
function print<T>(...args: T[]) {
  console.log(args.join(","));
}

print(1, "4", []);
// TS warns (which makes sense):
// Argument of type 'string' is not assignable to parameter of type 'number'.
```

As expected, TypeScript threw a warning! Since TypeScript inferred the type T as number from the first argument (1), it flagged the second and third arguments ("4" and []) as invalid. This behavior made perfect sense because TypeScript enforces consistent types for generic functions.

### So, Is This a Bug in Java?
Not necessarily. What’s happening here is that Java’s type system behaves differently due to type erasure. In Java, generic type information is erased at runtime, meaning that when you pass different types to T... args, Java won’t enforce that all arguments are of the same type. It simply treats the inputs as objects.

TypeScript, on the other hand, keeps strict checks at both compile and runtime, ensuring that all arguments match the inferred or declared type.


### Conclusion
This experience left me pondering: should Java enforce stricter type checks like TypeScript does? Or is this flexibility an intentional part of Java’s design?

What do you think? Have you encountered similar quirks when switching between Java and TypeScript?