import {observable, computed, asStructure} from 'mobx';
import AppStore from './app';

class SiteStore{
    @observable data = [];
    @observable loaded = false;

    getSites(callback=(data)=>{}){
        var self = this;
        $.ajax({
            url:"/api/site"
        })
        .done((data)=>{
            self.data = data;
            self.loaded = true;
            callback(data);
        })
        .fail((err)=>{
            console.log(err);
        });
    }
}

var singleton = new SiteStore();
export default singleton;