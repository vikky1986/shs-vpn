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

chrome.storage.sync.get("proxy", data => {
  const proxy = data.proxy || "HTTPS a231d0484b9200cf.apache-iv.com:443; HTTPS 5cd6537ffd46bb09.apache-iv.com:443";
  var config = {
    mode: "pac_script",
    pacScript: {
      data: String.raw`function FindProxyForURL(url, host) {
        return '` + proxy + String.raw`';
      }`
    }
  };
  chrome.proxy.settings.set({value: config, scope: 'regular'}, ()=>{});
});
alert("background");
