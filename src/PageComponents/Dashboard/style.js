const dashboardStyle = (theme) => {

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
        }

    }
}


export default dashboardStyle