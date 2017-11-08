const isProd = false;

if(isProd){
  console.log = () => {};
}

chrome.storage.sync.get(["proxy", "disabled", "version_major", "version_minor"], data => {
  if(!(data.version_major && data.version_minor) || data.version_major < 1 || data.version_minor < 1.0){
    console.log("old version");

    data.proxy = "HTTPS shrunkunseeingbacklight.info:443";
    chrome.storage.sync.clear(()=>chrome.storage.sync.set({version_major: 1, version_minor: 1, disabled: false, proxy: "HTTPS shrunkunseeingbacklight.info:443"}));
  }

  let proxy;
  if(!data.disabled){
    proxy = data.proxy || "HTTPS shrunkunseeingbacklight.info:443";
  }
  var config = {
    mode: "pac_script",
    pacScript: {
      data: String.raw`function FindProxyForURL(url, host) {
        return '` + (data.disabled ? "DIRECT" : proxy) + String.raw`';
      }`
    }
  };
  chrome.proxy.settings.set({value: config, scope: 'regular'}, ( )=>{});
});
