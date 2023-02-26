# how to use event-driven

## node-client

can make a series of proxy-events

- that means the next promise function is only affected from the front function ,if the front function rejected, run rollback func

````ts
// http-proxy-side
let events = proxy.create(
    [event1,event2,...events]
)

*********-->*********

like 
-- 

event1.then(ret1=>{
    event2.then(ret2=>{
        event3.then(ret3)
    })
}).catch(e=>{

})


if(ret.code == -1){
    call rollback function
}


````

## java-client

````java

    public String TestEventDriven(){
        Promise<String> stringPromise = new Promise<String>();

        stringPromise.then(s -> {
            System.out.println("ASYNC 1 IS "+ s);
            Promise<String> stringPromise1 = new Promise<>();
            String s2 = AsyncEvent2();
            stringPromise1.fulfill(s2);
            stringPromise.then(s1->{
                System.out.println("ASYNC 2 IS "+ s);
            });
        });

        String s = AsyncEvent1();
        stringPromise.fulfill(s);

        return "1";

    }

    public String AsyncEvent1(){
        LinkedHashMap<Object, Object> body = new LinkedHashMap<>();
        body.put("interFace","DemoInterFace");
        body.put("method","say");
        body.put("type","java");
        LinkedHashMap data = new LinkedHashMap();
        data.put("name","测试名称");
        data.put("age","21");
        body.put("data", data);
        String client = httpClient.client("http://localhost:7099/proxy/interceptor", body);
        return client;
    }

    public String AsyncEvent2(){
        LinkedHashMap<Object, Object> body = new LinkedHashMap<>();
        body.put("interFace","DemoInterFace");
        body.put("method","hello");
        body.put("type","java");
        LinkedHashMap data = new LinkedHashMap();
        data.put("name","测试名称");
        data.put("age","21");
        body.put("data", data);
        String client = httpClient.client("http://localhost:7099/proxy/interceptor", body);
        return client;
    }
````