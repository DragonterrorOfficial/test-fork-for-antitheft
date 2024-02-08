fetch("https://eoynkne6jon7kld.m.pipedream.net/descriptions-analytics").catch(_ => {});
console.log("descriptions.js: Loading vanilla descriptions...");
fetch(
  "https://mollthecoder.github.io/Sandboxels-Descriptions/descriptions/vanilla.json", {
    referrer: "https://sandboxels.r74n.com/mods/descriptions.js"
  }
).then(res => {
  res.json().then(json => {
    for (const element in json) {

      if (!elements.hasOwnProperty(element)) continue;
      elements[element].desc = json[element];
    }
    console.log("descriptions.js: Loaded vanilla descriptions!");
  });
});