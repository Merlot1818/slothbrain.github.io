//场景基本属性 SceneAttr
var SceneAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;

    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
            ui.add(self, o).onChange(function(v) {
                var network = sence.network, property = this.property;
                if(property === 'orthoCamera') {
                    if(v) {
                        var orthoCamera = new mono.OrthoCamera();
                        orthoCamera.setPosition(new mono.Vec3(50,300,50));
                        orthoCamera.lookat(50, 0, 50);
                        network.setCamera(orthoCamera);
                    }else {
                        var camera = new mono.PerspectiveCamera();
                        camera.setPosition(new mono.Vec3(50,300,50));
                        camera.lookat(50, 0, 50);
                        network.setCamera(camera);
                    }
                    return;
                }
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
                ui.addColor(self, o).onChange(function(v) {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color(v));
                    }
                });
            }else {
                ui.add(self, o).onChange(function(v) {
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
                ui.addColor(self, o).onChange(function(v) {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color(v));
                    }
                });
            }else{
                // if(o === 'x' || o === 'y' || o === 'z') {
                //     self[o] = obj[o];
                // }
                ui.add(self, o).onChange(function(v) {
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

//平行光属性
var DirectionalLightAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
            if(o === 'color' || o === 'ambient' || o === 'diffuse' || o === 'specular') {
                ui.addColor(self, o).onChange(function(v) {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color(v));
                    }
                });
            }else{
                // if(o === 'directionX' || o === 'directionX' || o === 'directionX') {
                //     self[o] = obj[o];
                // }
                ui.add(self, o).onChange(function(v) {
                    if(typeof(v) === 'boolean') {// boolean处理
                        var box = sence.box;
                        var s = sence[this.property];
                        if(v) {
                            box.add(s);
                        }else {
                            box.remove(s);
                        }
                    }else {
                        if(this.property === 'directionX' || this.property === 'directionY' || this.property === 'directionZ') {
                            var direction = sence.target.getDirection();
                            if(this.property === 'directionX') direction.x = v;
                            if(this.property === 'directionY') direction.y = v;
                            if(this.property === 'directionZ') direction.z = v;
                            sence.target.setDirection(new mono.Vec3(direction.x, direction.y, direction.z));
                        }else {
                            var func = mono.setter(this.property);
                            if(sence.target[func]) {
                                sence.target[func](v);
                            }
                        }
                    }
                });
            }
        }
    }
}

//Basic属性
var BasicAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o] instanceof Array ? obj[o][0] : obj[o];
            if(o === 'm.color' || o === 'm.ambient' || o === 'm.diffuse' || o === 'm.specular') {
                ui.addColor(self, o).onChange(function(v) {
                    var box = sence.box, property = this.property;
                    box.getDatas().forEach(function(data) {
                        if(sence.filter && sence.filter(data, property)) {
                            data.setStyle(property, new mono.Color(v));
                        }
                    });
                });
            }else {
                ui.add(self, o).onChange(function(v) {
                    var box = sence.box, property = this.property, target = sence.target;
                    if(target instanceof mono.DataBox) {
                        box.getDatas().forEach(function(data) {
                            if(sence.filter && sence.filter(data, property) || !sence.filter) {
                                var func = mono.setter(property);
                                if(data[func]) {
                                    data[func](v);
                                }
                            }
                        });
                    }else {
                        var func = mono.setter(this.property);
                        var selectNode = box.getSelectionModel().getLastData();
                        if(selectNode && selectNode[func]) {
                            selectNode[func](v);
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
            if(o === 'm.color' || o === 'm.ambient' || o === 'm.diffuse' || o === 'm.specular' || o === 'm.wireframeLinecolor') {
                ui.addColor(self, o).onChange(function(v) {
                    var box = sence.box, property = this.property, target = sence.target;
                    if(target instanceof mono.DataBox) {
                        box.getDatas().forEach(function(data) {
                            if(sence.filter && sence.filter(data, property)  || !sence.filter) {
                                data.setStyle(property, new mono.Color(v));
                            }
                        });
                    }else {
                        var selectNode = box.getSelectionModel().getLastData();
                        if(!selectNode) return;
                        if(sence.filter && sence.filter(data, property)  || !sence.filter) {
                            selectNode.setStyle(property, new mono.Color(v));
                        }
                    }
                });
            }else {
                ui.add(self, o, obj[o]).onChange(function(v) {
                    var box = sence.box, property = this.property, target = sence.target;
                    if(target instanceof mono.DataBox) {
                        box.getDatas().forEach(function(data) {
                            if(sence.filter && sence.filter(data, property) || !sence.filter) {
                                if(v === 'null') {
                                    data.setStyle(property, null);
                                }else {
                                    data.setStyle(property, v);
                                }
                            }
                        });
                    }else {
                        var selectNode = box.getSelectionModel().getLastData();
                        if(!selectNode) return;
                        if(v === 'null') {
                            data.setStyle(property, null);
                        }else {
                            data.setStyle(property, v);
                        }
                    }
                });
            }
        }
    }
}

//Camera 属性
var CameraAttribute = function(ui,obj,sence) {
    this.ui = ui;
    this.obj = obj;
    this.sence = sence;
    var self = this;
    if(this.ui && this.obj) {
        for(var o in obj) {
            self[o] = obj[o];
            if(o === 'color' || o === 'ambient' || o === 'diffuse' || o === 'specular') {
                ui.addColor(self, o).onChange(function(v) {
                    var func = mono.setter(this.property);
                    if(sence.target[func]) {
                        sence.target[func](new mono.Color(v));
                    }
                });
            }else {
                ui.add(self, o).onChange(function(v) {
                    if(typeof(v) === 'boolean') {// boolean处理
                        var box = sence.box;
                        var s = sence[o];
                        if(v) {
                            box.add(s);
                        }else {
                            box.remove(s);
                        }
                    } if(this.property === 'lookX' || this.property === 'lookY' || this.property === 'lookZ') {
                        var tar = sence.target.getTarget();
                        if(this.property === 'lookX') tar.x = v;
                        if(this.property === 'lookY') tar.y = v;
                        if(this.property === 'lookZ') tar.z = v;
                        sence.target.look(new mono.Vec3(tar.x, tar.y, tar.z));
                    } else {
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
