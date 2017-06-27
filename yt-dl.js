//get queryStringMap, listOfQueryStringMaps functions from https://gist.github.com/jerolimov/3756821

var queryStringMap = function(data) {
	var result = {};
	data.split('&').forEach(function(entry) {
		result[
				decodeURIComponent(entry.substring(0, entry.indexOf('=')))] =
				decodeURIComponent(entry.substring(entry.indexOf('=') + 1));
	});
	return result;
};


var listOfQueryStringMaps = function(data) {
	var result = [];
	data.split(',').forEach(function(entry) {
		result.push(queryStringMap(entry));
	});
	return result;
};


var getVideoFormat = function(format) {            
  var videoFormats = {
    22: { fileType: 'mp4', resolution: 'hd720' },
    43: { fileType: 'webm', resolution: '360p' },
    18: { fileType: 'mp4', resolution: '360p' },
    36: { fileType: '3gp', resolution: '240p' },
    17: { fileType: '3gp', resolution: '144p' }
    
  };
  
  if (videoFormats[format]) {
    return videoFormats[format];
  } else {
  
      return {
        resolution	: "Unrecognized",
        fileType	: "Unrecognized"
      };
      
    }
}


var get_info_video = function() {
  
  if (inputUrl.text == '')
    return;
  
  var video_id = inputUrl.text.substring(inputUrl.text.indexOf('v=')).split('&')['0'].replace('v=', '')

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://www.youtube.com/get_video_info?video_id=" + video_id, true);
  xhr.send();

  xhr.onreadystatechange = function() {

    if (xhr.readyState == 4 && xhr.status == 200) {
      
      var ready_ = xhr.responseText;
      print(ready_.indexOf('errorcode=2'))
      if (ready_.indexOf('errorcode=2') > -1)
        return;
    
      var query_ = listOfQueryStringMaps(queryStringMap(ready_)['url_encoded_fmt_stream_map']);
      
      var format;
    
      query_.forEach(function(videoEntry) {
			  format = getVideoFormat(videoEntry.itag);
			
  			console.log(decodeURIComponent(JSON.stringify(videoEntry, null, '\t')));
  			
  			listView.append({url: videoEntry.url, "type": format.resolution + ' - ' + format.fileType});
  			
  		});
    }
  }
  
}
