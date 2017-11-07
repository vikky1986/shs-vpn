const $ = sel => document.querySelector(sel);

const connected = $("#connected");
const notConnected = $("#not-connected");
const reload = $("button");
const proxies = $("select");

const calc = () => {
  chrome.proxy.settings.get({}, settings => {
    if(settings.levelOfControl === "controlled_by_this_extension" && settings.value.mode === "pac_script"){
      connected.hidden = false;
      notConnected.hidden = true;
    }else{
      connected.hidden = false;
      notConnected.hidden = true;
    }
  });
};

reload.onclick = () => {
  chrome.storage.sync.get("proxy", data => {
    const proxy = data.proxy || proxies.children[0].value;
    proxies.value = proxy;
    var config = {
      mode: "pac_script",
      pacScript: {
        data: String.raw`function FindProxyForURL(url, host) {
          return '` + proxy + String.raw`';
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
