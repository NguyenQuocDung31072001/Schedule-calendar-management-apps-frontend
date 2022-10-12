import { EnumColor } from "../interface/enum";

export const Resource=[
  {
    fieldName:"color",
    title:"Color",
    allowMultiple:true,
    instances:[
      {
        id:1,
        text:"red",
        color:EnumColor.red //red
      },
      {
        id:2,
        text:"orange",
        color:EnumColor.orange //orange
      },
      {
        id:3,
        text:"violet",
        color:EnumColor.violet //violet
      },
      {
        id:4,
        text:"gray",
        color:EnumColor.gray //gray
      },
    ]
  }
]