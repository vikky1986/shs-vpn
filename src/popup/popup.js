const $ = sel => document.querySelector(sel);

const connected = $("#connected");
const notConnected = $("#not-connected");
const reload = $("button");

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
  var config = {
    mode: "pac_script",
    pacScript: {
      data: String.raw`function FindProxyForURL(url, host) {
    if (host === 'example.net')
      return 'PROXY blackhole:80';
    return 'HTTPS free-uk01.doublec1ick.com:11443';
  }`
    }
  };
  chrome.proxy.settings.set({value: config, scope: 'regular'}, calc);
};

reload.onclick();
