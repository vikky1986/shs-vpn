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
chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {});
