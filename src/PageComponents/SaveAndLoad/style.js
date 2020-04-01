const saveAndLoadStyle = (theme) => {

    return {

        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,

        },

        interactionContainer: {
            position: "relative",
            top: "150px",
            width: "400px",
            margin: "0 auto"
        },

        hiddenFileInputEle: {
          visibility: "hidden !important",

        },

        clientItem: {
            fontSize: "2em",
            display: "inline-block",
            textAlign: "center",
            width: "100%",
            color: "grey",
            '&:hover': {
                background: "#8a0eff3b",
                transition: "0.4s"
            },
        },
        
        clientItemSelected: {
            fontSize: "2em",
            display: "inline-block",
            textAlign: "center",
            width: "100%",
            color: "grey",
            backgroundColor:"#8a0eff3b",
        
        },
        clientName:{
         color:"#6b5741e8"
        },

        description:{

            textAlign:"center"
        },
        container:{
            backgroundColor:"#fd65ff1f",
            height:"500px",
             borderRadius: "25px",
             width:"95%",
             top:"100px",
             position:'relative',
             margin:"0 auto"
        }

    }
}


export default saveAndLoadStyle