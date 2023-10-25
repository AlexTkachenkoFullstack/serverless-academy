const windDirection=(degree)=>{
    switch(degree){
        case 10:
        case 350:
        case 360:
            return 'North';
        case 20:
        case 30:
           return 'North/North-East';
        case 40: 
        case 50:
            return 'North-East';
        case 60:
        case 70:
            return 'East/North-East';
        case 80:
        case 90:
        case 100:
            return 'East';
        case 110: 
        case 120:
            return 'East/South-East';
        case 130: 
        case 140:
            return 'South-East';
        case 150:
        case 160:
            return 'South/South-East';
        case 170: 
        case 180: 
        case 190: 
            return'South';
        case 200:
        case 210:
            return 'South/South-West';
        case 220: 
        case 230:
            return 'South-West';
        case 240: 
        case 250:
            return 'West/South-West';
        case 260: 
        case 270: 
        case 280:
            return 'West';
        case 290: 
        case 300:
            return 'West/North-West';
        case 310: 
        case 320:
            return 'North-West';
        case 330: 
        case 340:
            return 'North/North-West';
        default: return 'Invalid degree';    
        }  
    }

module.exports=windDirection