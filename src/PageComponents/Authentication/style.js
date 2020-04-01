const authenticationStyle = (theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        message:{
            position:"relative",
            top:"200px",
            width:"50%",
            margin: "0 auto",
            backgroundColor:"#ffffa082",
            textAlign:"center"
 
        }
    }
}


export default authenticationStyle