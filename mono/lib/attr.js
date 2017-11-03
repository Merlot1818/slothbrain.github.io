//场景基本属性 SceneAttr
var SceneAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;

    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
            ui.add(self, o).onFinishChange(function(v) {
                if(typeof(v) === 'boolean') {// boolean处理
                    var box = sence.box, property = this.property;
                    var s = sence[property];
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
            if(o === 'color' || o === 'ambient' || o === 'diffuse' || o === 'specular') {
                ui.addColor(self, o).onFinishChange(function(v) {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color(v));
                    }
                });
            }else {
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
}

//点光源属性
var PointLightAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
            if(o === 'color' || o === 'ambient' || o === 'diffuse' || o === 'specular') {
                ui.addColor(self, o).onFinishChange(function(v) {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color(v));
                    }
                });
            }else{
                // if(o === 'x' || o === 'y' || o === 'z') {
                //     self[o] = obj[o];
                // }
                ui.add(self, o).onFinishChange(function(v) {
                    if(typeof(v) === 'boolean') {// boolean处理
                        var box = sence.box;
                        var s = sence[this.property];
                        if(v) {
                            box.add(s);
                        }else {
                            box.remove(s);
                        }
                    }else {
                        var func = mono.setter(this.property);
                        if(sence.target[func]) {
                            sence.target[func](v);
                        }
                    }
                });
            }
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
            self[o] = obj[o] instanceof Array ? obj[o][0] : obj[o];
            if(o === 'm.color' || o === 'm.ambient' || o === 'm.diffuse' || o === 'm.specular') {
                ui.addColor(self, o).onFinishChange(function(v) {
                    var box = sence.box, property = this.property;
                    box.getDatas().forEach(function(data) {
                        if(sence.filter && sence.filter(data, property)) {
                            data.setStyle(property, new mono.Color(v));
                        }
                    });
                });
            }else {
                ui.add(self, o, obj[o]).onFinishChange(function(v) {
                    var box = sence.box, property = this.property;
                    box.getDatas().forEach(function(data) {
                        if(sence.filter && sence.filter(data, property)) {
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
}
