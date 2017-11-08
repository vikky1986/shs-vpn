// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
function(request, sender, sendResponse) {
chrome.pageAction.show(sender.tab.id);
sendResponse();
});*/

chrome.storage.sync.get(["proxy", "disabled"], data => {
  if(!data.disabled){
    const proxy = data.proxy || "HTTPS shrunkunseeingbacklight.info:443";
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
  chrome.proxy.settings.set({value: config, scope: 'regular'}, ( )=>{});
});
