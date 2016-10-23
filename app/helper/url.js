import config from '../../config.js';

export default function(url){
	if(url.indexOf("/") === 0){
		url = url.substring(1);
	}
	return config.url + url;
}
