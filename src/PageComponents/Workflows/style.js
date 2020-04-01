const workflowsStyle = (theme) => {

    return {

        root: {
            flexGrow: 1,
        },

        parentContainer:{

           marginTop:"100px"

        },

        formContainer: {
        marginTop:"0px",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        position:"relative",
        left:"20px"
    },

    quill:{
        fontSize:"100px"
    },


         workflowTextContent:{
              position:"relative",
                 left:"-30px",
               
         },


        listContainer:{
           position:"relative",
           top:"140px",
           right:"20px"
        },

            showWorkflowList: {
            top: -35,
            float: "right",
            position: "relative",
            backgroundColor: '#ffbf91',

        },

        workflowButton:{
           backgroundColor:"purple"
        },

         WorkflowItemLink: {
                 textDecoration: "none",
                 color: "#4c8816"
             },

         workflowItem: {
            backgroundColor:"#551f63",
             fontSize: "2em",
             display: "inline-block",
             textAlign: "center",
             width: "100%",
             color: "orange",
             '&:hover': {
                 background: "#42a3ad",
                 transition: "0.4s"
             },
         },

         workflowItemSelected: {
               background: "#42a3ad",
             fontSize: "2em",
             display: "inline-block",
             textAlign: "center",
             width: "100%",
             color: "orange",
             
         },

   
    textField:{
      width:"28em",
    },
    

    trashIconContainer:{
      
      float:"left",
      zIndex:"+10"
    },

     calendarIcon:{
        backgroundColor:"orange",
        left:"10%"
     },



        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },

        clientName: {
            color: "orange",
            textAlign:"center",
            fontSize:"3vw"
        },

        workFlowsContainer: {
            overflow: "auto",
            maxHeight: '70vh'

        },
        deleteButton: {
            top: 5,
            float: "left",
            position: "relative",
            backgroundColor: '#ff00008a',

        },
        editButton: {
            top: 5,
            float: "right",
            position: "relative",
            backgroundColor: '#ffbf91',

        },

        // list: {

        //     display: "inline-block",
        //     backgroundColor: '#96008fc9',
        //     color: "white",
        //     '&:hover': {
        //         background: "#5458a8ba",
        //         transition: "0s"
        //     },

        //     textHover: {
        //         '&:hover': {
        //             background: "#5458a8ba",
        //             transition: "0s"
        //         },

        //     }

        // },




        clientTitleContainer: {

            width: "50%",
            margin: "0 auto"
        },

        box: {

            height: "700px",
            position: "relative",
            color: "black",
            top:"40px"
        },

        // instructionNote:{
        //   position:"relative",
        //   top:75,
        //   width:"90%",
        //   fontSize:"0.8em",
        //   margin:"0 auto",


        // },

        // instructionNote: {
        //     "& p": {
        //         paddingTop:100,
        //         paddingLeft:50,
        //         paddingRight:50
        //     }
        // },

        outerContainer: {

            outlineWidth: "thin",
            margin: "10px",
            backgroundColor: "#f5f5f5",
        },

        centerContainer: {
            position: "relative",
            top: "80px",
            width: "80%",
            margin: "0 auto",
            backgroundColor: "#551f63",
            borderRadius: "5px"


        },

        createButton: {

            float: "right",
            backgroundColor: "#201a52",
            display: "inline",
            position: "relative",
            top: "6.5%",
            right: "13%",
            color: "white",
            '&:hover': {
                background: "     #3d6288",
                transition: "0s"
            },


        },
        searchTextField: {
            position: "relative",
            left: "25%",
            marginTop: "70px"
        },

        innerTextEditorContainer: {
            backgroundColor: "white",
            textAlign: "center",

        },

        innerContentContainer: {
            backgroundColor: "#f5f5f5",
            position: "relative",
            width: "90%",
            margin: "0 auto",
            wordWrap: "break-word"


        },

        workflowTextTitle: {
            height:40,
            width:"100%",
            position:"relative",
            fontSize: "3vw",
            textAlign:"center",
            display:"inline-block"
            
        },

        innerTextContent: {
            position: "relative",
            padding: "1%",
            display: "inline",
            top: "-30px",
            left: "1%",
            lineHeight: 1.6,
            color: "black"
        },

        thing: {
            marginLeft: "10%",
            marginRight: "10%"
        },

        textButton: {
            backgroundColor: "#42a3ad",
            marginTop: "50px",
            fontSize: "1em",
            width: "100%"
        },

        cancelButton:{

            backgroundColor: "#ff0000b3",
            fontSize: "1em",
            marginTop:"10px",
            width: "100%"
            
        },

        textEditorTitle: {
            width: "80%"
        }
    }

}


export default workflowsStyle