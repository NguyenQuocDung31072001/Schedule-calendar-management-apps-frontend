export function parseNumberToTime(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
    if(m>0){
      return h+ ":" +m
    } else{
      return h +":00"
}
}