const router = require('express').Router()


const elementBased_points = [{
    Element_Sun : { 
        sun_points:[1,2,4,7,8,9,10,11],
        moon_points:[3,6,10,11],
        mars_points:[1,2,4,7,8,9,10,11],
        mercury_points : [3,5,6,9,10,11,12],
        jupiter_points:[5,6,9,11],
        venus_points:[6,7,12],
        saturn_points:[1,2,4,7,8,9,10,11],
        lagna_points : [3,4,6,10,11,12]
    },
    Element_Moon : { 
        sun_points:[3,6,7,8,10,11],
        moon_points:[1,3,6,7,10,11],
        mars_points:[2,3,5,6,9,10,11],
        mercury_points : [1,3,4,5,7,8,10,11],
        jupiter_points:[1,4,7,8,10,11,12],
        venus_points:[3,4,5,7,9,10,11],
        saturn_points:[3,5,6,11],
        lagna_points : [3,6,10,11]
    },
    Element_Mars : { 
        sun_points:[3,5,6,10,11],
        moon_points:[3,6,11],
        mars_points:[1,2,4,7,8,10,11],
        mercury_points : [3,5,6,11],
        jupiter_points:[6,10,11,12],
        venus_points:[6,8,11,12],
        saturn_points:[1,4,7,8,9,10,11],
        lagna_points : [1,3,6,10,11]
    },
    Element_Mercury : { 
        sun_points:[5,6,9,11,12],
        moon_points:[2,4,6,8,10,11],
        mars_points:[1,2,4,7,8,9,10,11],
        mercury_points : [1,3,5,6,9,10,11,12],
        jupiter_points:[6,8,11,12],
        venus_points:[1,2,3,4,5,8,9,11],
        saturn_points:[1,2,4,7,8,9,10,11],
        lagna_points : [1,2,4,6,8,10,11]
    },
    Element_Jupiter : { 
        sun_points:[1,2,3,4,7,8,9,10,11],
        moon_points:[2,5,7,9,11],
        mars_points:[1,2,4,7,8,10,11],
        mercury_points : [1,2,4,5,6,9,10,11],
        jupiter_points:[1,2,3,4,7,8,10,11],
        venus_points:[2,5,6,9,10,11],
        saturn_points:[3,5,6,12],
        lagna_points : [1,2,4,5,6,7,9,10,11]
    },

    Element_Venus : { 
        sun_points:[8,11,12],
        moon_points:[1,2,3,4,5,8,9,11,12],
        mars_points:[3,5,6,9,11,12],
        mercury_points : [3,5,6,9,11],
        jupiter_points:[5,8,9,10,11],
        venus_points:[1,2,3,4,5,8,9,10,11],
        saturn_points:[3,4,5,8,9,10,11],
        lagna_points : [1,2,3,4,5,8,9,11]
    },
    Element_Saturn : { 
        sun_points:[1,2,4,7,8,10,11],
        moon_points:[3,6,11],
        mars_points:[3,5,6,10,11,12],
        mercury_points : [6,8,9,10,11,12],
        jupiter_points:[5,6,11,12],
        venus_points:[6,11,12],
        saturn_points:[3,5,6,11],
        lagna_points : [1,3,4,6,10,11]
    }
}]



router.post('/astakavargu',(req,res)=>{    
    req.body.reference_element = req.body.reference_element.toLowerCase()
    // console.log("hear=>",req.body)
    let elements = ["sun","moon","mars","mercury","jupiter","venus","saturn","lagna"]
    let ref = elements.findIndex(item => item==req.body.reference_element)
    // console.log(ref)
    let result = {}
    let countOnes = []
    let sign_no = {
        sunSignNo : req.body.sun_sign,
        moonSignNo : req.body.moon_sign,
        marsSignNo:req.body.mars_sign,
        mercurySignNo: req.body.mercury_sign,
        jupiterSignNo : req.body.jupiter_sign,
        venusSignNo : req.body.venus_sign,
        saturnSignNo:req.body.saturn_sign,
        lagnaSignNo : req.body.lagnam_sign
    }

    for(let i=0;i<Object.keys(sign_no).length;i++){

            if(!sign_no) return res.send({data:[]})
            let a = [0,0,0,0,0,0,0,0,0,0,0,0]
            const signNo = Object.values(sign_no)[i]

            //sun position setting as per sign_no
            const b = a.map((item,i)=>{
                if(i == signNo-1){
                    a[i] = 1;
                }
            })

            //sub - sun astavarga - setting points in s(arr) as per sun astavarga(spoints) points
            let s = [0,0,0,0,0,0,0,0,0,0,0,0]

            const index= a.findIndex(element=>element==1)
            
            
           switch (req.body.reference_element) {
               case "sun":
                len2 = Object.values(elementBased_points[0].Element_Sun)[i]
                   break;
                case "moon":
                len2 = Object.values(elementBased_points[0].Element_Moon)[i]
                    break;
                case "mars":
                len2 = Object.values(elementBased_points[0].Element_Mars)[i]
                   break;
                case "mercury":
                len2 = Object.values(elementBased_points[0].Element_Mercury)[i]
                    break;
                case "jupiter":
                    len2 = Object.values(elementBased_points[0].Element_Jupiter)[i]
                        break;
                case "venus":
                    len2 = Object.values(elementBased_points[0].Element_Venus)[i]
                    break;
                case "saturn":
                    len2 = Object.values(elementBased_points[0].Element_Saturn)[i]
                    break;
               default:
                   break;
           }
            
            
            // console.log(len2)
           

                //marking all the indexes
                for(let i=0;i<len2.length;i++){
                    if(index+len2[i]-1>11){
                        s[index+len2[i]-1-12] = 1;
                    }else{ s[index+len2[i]-1] = 1}
                }

                let e = elements[i]
                result[e] = s
    }
    let totel = Object.values(result)

    
    for(let i=0;i<totel[0].length;i++){
    var a =  totel.map(item=>item[i])
    countOnes.push(a)
    }
   

    let totelp = []
    for (let i=0;i<countOnes.length;i++){
        let count = 0;
        for(let j = 0; j < countOnes[i].length; j++){
            let e = countOnes[i]
            if(e[j] == 1)
                count++;
        }
        totelp.push(count)
    }

    result["result"] = totelp
    // console.log(result)
    res.json({data:result,totelPoints:totelp})
    })



module.exports = router;