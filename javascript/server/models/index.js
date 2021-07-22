const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    
place : {type:String},
state : {type:String},
country_name : {type:String},
latitude : {type:String},
longitude : {type:String},

})
var modela = mongoose.model('alocations',locationSchema)
var modelb = mongoose.model('blocations',locationSchema)
var modelc = mongoose.model('clocations',locationSchema)
var modeld = mongoose.model('dlocations',locationSchema)
var modele = mongoose.model('elocations',locationSchema)
var modelf = mongoose.model('flocations',locationSchema)
var modelg = mongoose.model('glocations',locationSchema)
var modelh = mongoose.model('hlocations',locationSchema)
var modeli = mongoose.model('ilocations',locationSchema)
var modelj = mongoose.model('jlocations',locationSchema)
var modelk = mongoose.model('klocations',locationSchema)
var modell = mongoose.model('llocations',locationSchema)
var modelm = mongoose.model('mlocations',locationSchema)
var modeln = mongoose.model('nlocations',locationSchema)
var modelo = mongoose.model('olocations',locationSchema)
var modelp = mongoose.model('plocations',locationSchema)
var modelq = mongoose.model('qlocations',locationSchema)
var modelr = mongoose.model('rlocations',locationSchema)
var models = mongoose.model('slocations',locationSchema)
var modelt = mongoose.model('tlocations',locationSchema)
var modelu = mongoose.model('ulocations',locationSchema)
var modelv = mongoose.model('vlocations',locationSchema)
var modelw = mongoose.model('wlocations',locationSchema)
var modelx = mongoose.model('xlocations',locationSchema)
var modely = mongoose.model('ylocations',locationSchema)
var modelz = mongoose.model('zlocations',locationSchema)


module.exports = {modela,modelb,modelc,modeld,modele,modelf,modelg,modelh,modeli,modelj,modelk,modell,modelm,modeln,modelo,modelp,modelq,modelr,models,modelt,modelu,modelv,modelw,modelx,modely,modelz}