# use dynamic-load to load

- define a path  
- then require the whole dir

````js
module.exports = {
    database:[],
    servant: {
        // project: "TarsusHttpProject -l node -t @tarsus/http -h 127.0.0.1 -p 9811",
        project:"TarsusTestNodeService -l node -t @tarsus/ms -h 127.0.0.1 -p 10012",
        src:"test/microservice/register",
        includes: [
            "TarsusTestNodeService -l node -t @tarsus/ms -h 127.0.0.1 -p 10012",
            "TarsusTestJavaService -l java -t @tarsus/ms -h 127.0.0.1 -p 7099",
        ]
    }
}

````

````ts
ApplicationEvents.on(Application.REQUIRE_INTERFACE, function () {
    const register_path = _config.servant.src || "src/register";
    const full_path = path.resolve(cwd(), register_path);
    const dirs = readdirSync(full_path)
        dirs.forEach(interFace=>{
        let interFace_path = path.resolve(full_path,interFace)
        require(interFace_path)
    })
});
````
