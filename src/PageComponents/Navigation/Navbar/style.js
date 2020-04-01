const navbarStyle = (theme) =>{

	return {

	    root: {
	        flexGrow: 1,
	    },

	    paper: {
	        padding: theme.spacing(2),
	        textAlign: 'center',
	        color: theme.palette.text.secondary,
	    },

	    grow: {
	        flexGrow: 1,
	    },

	    navButton:{
             backgroundColor:"purple",
             marginLeft:"10px",
             padding:"14px",
              '&:hover': {
		       backgroundColor: "#3f51b5",
		    },

	    },

	    menuButton: {
	        marginLeft: -12,
	        marginRight: 20,
	    },

	    bgColor: {
	        backgroundColor:"white"
	    },

	    showTextEditorButton: {
	    	backgroundColor:"purple"
	    },

	    saveData:{
	    	position:"relative",
	    	marginRight:50,
	    	color:"red"
	    }

	}
	
}


export default navbarStyle