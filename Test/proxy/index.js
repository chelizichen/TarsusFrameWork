class MyClass {
  myMethod() {
    console.log("Original method called");
  }
}

const proxyHandler = {
  apply: function(target, thisArg, argumentsList) {
    console.log("Intercepted method call");
    return target.apply(thisArg, argumentsList);
  }
};

const myInstance = new MyClass();
const myProxy = new Proxy(myInstance.myMethod, proxyHandler);

myProxy(); // 输出 "Intercepted method call"，然后输出 "Original method called"
