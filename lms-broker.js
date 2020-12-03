(function(){
    function getParam(sname, url) {
        var params = null;
        if(url == undefined) params = location.search.substr(location.search.indexOf("?") + 1);
        else params = url.split("?")[1];
        var sval = "";
        params = params.split("&");
        for (var i = 0; i < params.length; i++) {
            temp = params[i].split("=");
            if ([temp[0]] == sname) { sval = temp[1]; }
        }
        return sval;
    }
    function d(url) {
        window.location = url;
    }
    function c(data) {
        var xml = data.getElementsByTagName('content')[0].getElementsByTagName('content_playing_info')[0];
        var value = xml.getElementsByTagName('mixed_media')[0];
        
        if(typeof(value.getElementsByTagName) == 'undefined') {
            var str = String(value.getElementsByTagName('desktop')[0].getElementsByTagName('html5')[0].getElementsByTagName('media_uri')[0].childNodes[0].nodeValue).replace('/playlist.m3u8', '');
            return d(str);
        }

        value = xml.getElementsByTagName('sub_media')[0];
        if(typeof(value.getElementsByTagName) == 'undefined') {
            var str = String(value.getElementsByTagName('desktop')[0].getElementsByTagName('html5')[0].getElementsByTagName('media_uri')[0].childNodes[0].nodeValue).replace('/playlist.m3u8', '');
            return d(str);
        }

        value = xml.getElementsByTagName('main_media')[0];
        if(typeof(value.getElementsByTagName) == 'undefined') {
            var str = String(value.getElementsByTagName('desktop')[0].getElementsByTagName('html5')[0].getElementsByTagName('media_uri')[0].childNodes[0].nodeValue).replace('/playlist.m3u8', '');
            return d(str);
        }
    }
    function a(data) {
        var str = /https:\/\/(.*)/.exec(data);
        console.log(str);
        var param = getParam('content_id', str[1]);
        $.ajax({ url: `https://commons.sch.ac.kr/viewer/ssplayer/uniplayer_support/content.php?content_id=${param}`, success: c });
    }    
    $.ajax({ url: $('#vod_viewer iframe').attr('src'), success: a });
}());
