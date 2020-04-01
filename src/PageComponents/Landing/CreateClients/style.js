
const createClientsStyle = function(theme){
	return  {root: {
        flexGrow: 1,
        position:"relative",
        top:"175px"
        
    },

    deleteClient:{
      zIndex:"10"
    },

    listContainer:{
      backgroundColor:"orange"
    },

    clientItemLink:{
     textDecoration:"none",
     color:"#4c8816",
     left:"-40px",
     position:"relative",
    },

    logoContainer:{
      position:"relative",
      margin:"0 auto",
      top:"120px"
    },
    container: {
        marginTop:"0px",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    clientItem:{
      fontSize:"2em",
      display:"inline-block",
      textAlign:"center",
      width:"100%",
      color:"grey",
       '&:hover': {
       background: "#8a0eff3b",
         transition: "0.4s"
     },
    },
      clientItemSelected: {
      background: "#8a0eff3b",
      fontSize:"2em",
      display:"inline-block",
      textAlign:"center",
      color:"grey",
       '&:hover': {
       background: "#8a0eff3b",
         transition: "0.4s"
     },
    },
    
   


    trashIconContainer:{

      float:"left"
    },


    textField:{
      width:"28em",
    },

    listItem:{
      fontSize:'35px',//Insert your required size
    
    },
    clientButton:{
      backgroundColor:"purple"
    },

    tinyTextClickMe:{
      position:"relative",
      fontSize:"0.5em",
      right:"10%"
    },
    snackbarStyle:{
       backgroundColor:"orange"
    }
  }
}



export default createClientsStyle