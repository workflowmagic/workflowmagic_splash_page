const calendarStyle = (theme) => {
    return {
        root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },

            calendarContainer: {
                position: "relative",
                marginTop: "100px",
                marginLeft: "5px"
            },

            clientItemContainer: {
                fontSize: "2em",
                width: "100%",
                color: "#24311bbf",
                textAlign: "center",
                margin: "0 auto",
            },

            textField: {
                width: "95%",


            },



            clientName: {
                backgroundColor: "#551f63",
                color: "orange"
            },

            listItemCenter: {
                textAlign: "center",
                display: "inline-block",
                backgroundColor: "#0528d4a1",
                color: "white",
                '&:hover': {
                    background: "#ffae35bd",
                    transition: "0.4s"
                },



            },

            listPaperContainer: {
                marginLeft: "1%",
                marginRight: "1%",
                marginTop: "5%"
            },
            dateHide: {
                display: "none"
            },

            listContainer: {

                paddingLeft: "0px",
                marginRight: "5px",
                overflow: "auto",
                maxHeight: '70vh',

            },

            clientButtonContainer: {
                width: "95%"
            },

            searchForm: {
                // backgroundColor:"orange",
                position: "relative",
                marginTop: "0px",
                padding: "0px"

            },

            paperModal: {
                position: 'absolute',
                width: "90%",
                height: "80%",
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },

            dateAndTimeZoneContainer: {
                backgroundColor: "#809fc5",
                borderRadius: "20px"

            },

            dateCreationText: {
                position: "relative",
                left: "30px"
            },

            outerContainer: {

                outlineWidth: "thin",
                margin: "10px",
                backgroundColor: "#f5f5f5",
            },

            centerContainer: {
                position: "relative",
                top: "40px",
                width: "95%",
                margin: "0 auto",
                backgroundColor: "#551f63",
                borderRadius: "5px"


            },

            textButton: {
                backgroundColor: "#42a3ad",
                marginTop: "50px",
                fontSize: "1em",
                width: "100%"
            },

            startDateText: {
                position: "relative",
                marginTop: "80px"
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

            clientItem: {
                fontSize: "1.3em",
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
                background: "#8a0eff3b",
                fontSize: "1.3em",
                display: "inline-block",
                textAlign: "center",
                color: "grey",
                '&:hover': {
                    background: "#8a0eff3b",
                    transition: "0.4s"
                },
            },
            clientButton:{
                marginLeft:"5px"
            },
            description:{
                width:"200px",
                margin:"0 auto"
            },
            instructions:{
                backgroundColor:"#ad2074fa",
                color:"white",
                height:"3em",
                textAlign:"center",
                fontSize:"1.3em"

            }

          }
        }


export default calendarStyle