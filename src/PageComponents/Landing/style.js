const landingStyle = function(theme) {

    return {

        snackbarStyle: {
            backgroundColor: "orange"
        },

        root: {
            flexGrow: 1,
        },

        callToActionContainer: {
            display: "inline-block"

        },

        logoFontContainer: {

        },

        bgImage: {

            backgroundImage:  "url(background.png)",
            width: "100%",
            height:1000,
            position: "absolute",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundSize: "1400px 1100px",


        },

        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,

        },


        interactionContainer: {
            position: "relative",
            top: "170px",
            width: "400px",
            margin: "0 auto"
        },


        tagline: {
            fontSize: "17px",
            color: "grey",
            position: "relative",
            textAlign: "center",
            width: "100%"

        },

        signInSignUp: {
            position: "relative",
            fontSize: "20px",
            textAlign: "center",
            color: "grey",
            '&:hover': {
                background: "#ffeed9",
                borderRadius: "50%",
                transition: "0.3s"
            },

            '&:active': {
                background: "#92da8959",
                borderRadius: "50%",
                transition: "0.3s"
            },

        },

        customAnchor: {
            "textDecoration": "none"
        },

        logoFontContainer: {
            textAlign: 'center!important"',
        },

        signInSignUpNoHover: {
            position: "relative",
            fontSize: "20px",
            textAlign: "center",
            color: "grey",

        },
        yourAppIsReady: {
            position: "relative",
            textAlign: "center",
            color: "#4f60afbd",
            padding:"0"


        },

          
        yourAppIsReadyTitle: {
            position: "relative",
            textAlign: "center",
            color: "#4f60afbd",
            fontSize:"1.2em",
              marginTop:"0",
            marginBottom:"0"

        }

    }
}


export default landingStyle