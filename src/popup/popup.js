const $ = sel => document.querySelector(sel);

const connected = $("#connected");
const notConnected = $("#not-connected");
const reload = $("button");
const proxies = $("select");
const info = $("p");
const checkbox = $("input");

const calc = () => {

  chrome.proxy.settings.get({}, settings => {
    if(settings.levelOfControl === "controlled_by_this_extension" && settings.value.mode === "pac_script"){
      connected.hidden = false;
      notConnected.hidden = true;
    }else{
      connected.hidden = false;
      notConnected.hidden = true;
    }
    fetch("http://ip-api.com/json").then(x=>x.json()).then(data => {
      info.innerText = `Your IPv4: ${data.query}
You're in ${data.city}, ${data.regionName}, ${data.country} & your ISP is ${data.isp}`;
    });
  });
};

reload.onclick = () => {
  chrome.storage.sync.get(["proxy", "disabled"], data => {
    checkbox.checked = !data.disabled;
    let proxy;
    if(!data.disabled){
      proxy = data.proxy || proxies.children[0].value;
      proxies.value = proxy;
    }
    var config = {
      mode: "pac_script",
      pacScript: {
        data: String.raw`function FindProxyForURL(url, host) {
          return '` + (data.disabled ? "DIRECT" : proxy) + String.raw`';
        }`
      }
    };
    chrome.proxy.settings.set({value: config, scope: 'regular'}, calc);
  });
};

proxies.onchange = () => {
  chrome.storage.sync.set({proxy: proxies.value}, ()=>reload.onclick());
};

reload.onclick();

checkbox.onchange = () => {
  chrome.storage.sync.set({disabled: !checkbox.checked}, ()=>reload.onclick());
};
