// var Attribute = function(obj) {
//     this.obj = obj;
//     this.name = obj.name;
//     this.width = obj.width;
//     this.height = obj.height;
//     this.explode = function() {
//         console.log('explode');
//     };
// } 

// var Client = function() {

// }

// var Style = function(obj) {
// 	this.obj = obj;
// 	this['m.type'] = 'phong';
// 	this['m.texture.image'] = './images/box.jpg';
// 	this['m.color'] = 'green';
// 	this['m.ambient'] = 'green';
// }

//场景基本属性 SceneAttr
var SceneAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
        }
        for(var o in obj) {
            ui.add(self, o).onChange(function(v) {
                if(typeof(v) === 'boolean') {// boolean处理
                    var box = sence.box;
                    console.log(self.obj);
                    var s = sence[o];
                    if(v) {
                        box.add(s);
                    }else {
                        box.remove(s);
                    }
                }else {

                }
            });
        }
    }
}

//环境光源属性 AmbientLight
var AmbientLightAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
        }
        for(var o in obj) {
            ui.add(self, o).onFinishChange(function(v) {
                if(typeof(v) === 'boolean') {// boolean处理
                    var box = sence.box;
                    var s = sence[o];
                    if(v) {
                        box.add(s);
                    }else {
                        box.remove(s);
                    }
                }else {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color('#' + v));
                    }
                }
            });
        }
    }
}


//Style属性
//环境光源属性 AmbientLight
var StyleAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
        }
        for(var o in obj) {
            ui.add(self, o, obj[o]).onFinishChange(function(v) {
                var box = sence.box, property = this.property;
                box.getDatas().forEach(function(data) {
                    if(sence.filter && sence.filter(data)) {
                        if(v === 'null') {
                            data.setStyle(property, null);
                        }else {
                            data.setStyle(property, v);
                        }
                    }
                });
            });
        }
    }
}
