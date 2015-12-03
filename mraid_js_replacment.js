//mraid object stub for when mraid is not available
var mraid = mraid || {};
mraid._private = mraid._private || {};
mraid._private.state = "default";

mraid.getVersion = function(){
    console.log("mraid.getVersion");
    return "1.0";
};
mraid.getPlacementType = function(){
    console.log("mraid.getPlacementType");
    return "interstitial";
};
mraid.isViewable = function(){
    console.log("mraid.isViewable");
    return true;
};
mraid.getState =function(){
    console.log("mraid.getState: "+mraid._private.state);
    return mraid._private.state;
};
mraid.expand = function(){
    console.log("mraid.expand");
    mraid._private.state = "expanded";
    mraid._private.callListeners("stateChange");
};
mraid.close = function(){
    console.log("mraid.close before: "+mraid._private.state);
    if (mraid._private.state == "hidden") {
        mraid._private.callListeners("stateChange");
    } else if (mraid._private.state == "default") {
        mraid._private.state = "hidden";
        mraid._private.callListeners("stateChange");
    } else if (mraid._private.state == "expanded") {
        mraid._private.state = "default";
        mraid._private.callListeners("stateChange");
    } else {
        mraid._private.state = "default";
    }
    console.log("mraid.close after: "+mraid._private.state);
};
mraid.useCustomClose = function(use){
    console.log("mraid.useCustomClose: "+use);
};
mraid.open = function(url){
    console.log("mraid.open: "+url);
     if (mobi && mobi.adtags && mobi.adtags.clickWebsite) mobi.adtags.clickWebsite(url,'open');
     else  window.open(url);
};
mraid.setExpandProperties = function(properties){
    console.log("mraid.setExpandProperties: "+properties);
    mraid._private.expandProperties = properties;
};
mraid.getExpandProperties = function(){
    console.log("mraid.getExpandProperties");
    return mraid._private.expandProperties;
};

mraid._private.eventStack = {
    "ready": [],
    "error": [],
    "stateChange": [],
    "viewableChange": []
}
mraid.addEventListener = function(evt, listener) {
    console.log("mraid.addEventListener: "+evt);
    mraid._private.eventStack[evt].push(listener);
};
mraid._private.callListeners = function(evt) {
    console.log("calling: "+evt);
    if (mraid._private.eventStack[evt]) {
        for (var i=0; i<mraid._private.eventStack[evt].length; i++) {
            if (evt == "stateChange") mraid._private.eventStack[evt][i].call(mraid._private.state);
            else mraid._private.eventStack[evt].call();
        }
    }
};
mraid.removeEventListener = function(evt, listener){
    if (mraid._private.eventStack[evt]) {
        for (var i=0; i<mraid._private.eventStack[evt].length; i++) {
            if (mraid._private.eventStack[evt][i] == listener) {
                mraid._private.eventStack[evt].splice(i, 1);
            }
        }
    }
};

mraid.supports = function(feature){
    console.log("mraid.supports: "+feature);
    if (feature == "sms" || feature == "tel" || feature == "calendar" || feature == "storePicture" || feature == "inlineVideo" || feature == "autostartVideo") {
        return true;
    }
    return false;
};

window.addEventListener("load", function(){mraid._private.callListeners("ready");});
