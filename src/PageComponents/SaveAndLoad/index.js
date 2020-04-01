import React, { useState, useEffect,useRef } from 'react';
import { withStyles } from "@material-ui/core/styles"
import PropTypes from 'prop-types';
import Dexie from "dexie";
import { importDB, exportDB, importInto } from "dexie-export-import";
import Grid from "@material-ui/core/Grid";
import db from "../../services/indexDB"
import saveAndLoadStyle from '../../PageComponents/SaveAndLoad/style'

const streamSaver = require('streamsaver')

// https://stackoverflow.com/questions/32433594/how-to-trigger-input-file-event-reactjs-by-another-dom
function SaveAndLoad(props) {


    const { classes } = props;


    const fileInput = useRef(null)


    async function handleFileChange(event){
        console.log(event.target.files[0])
        let db = event.target.files[0];
        const blob = await importDB(db, { prettyJson: true });
    }

    async function downloadDBasJSON() {
        try {

            const blob = await exportDB(db, { prettyJson: true });
            console.log(blob)

            const fr = new FileReader();

            fr.addEventListener("load", e => {
                console.log(e.target.result, JSON.parse(fr.result))

                const fileStream = streamSaver.createWriteStream('workflow_magic.json', {
                    size: 22, // (optional) Will show progress
                    writableStrategy: undefined, // (optional)
                    readableStrategy: undefined // (optional)
                })

                new Response(fr.result).body
                    .pipeTo(fileStream)







            });

            fr.readAsText(blob);

        } catch (error) {
            console.error('' + error);
        }
    };




    const [selectedItemViaArrowKeypress, setSelectedItemViaArrowKeypress] = useState(-1);

    const [items, setItems] = useState(
        [
            { title: "Open", description: "This opens a saved Workflow Magic file" },

            { title: "Save", description: "This saves your work as a file on your computer. It is important to save your work so that it does not get erased from your web browser" },
        ]
    )






    //____________________________________________

    // @ Arrow Up/Down selection. 
    useEffect(() => {
        function handleKeyPress(event) {


            if (event.key === "ArrowDown") {
                setSelectedItemViaArrowKeypress((prev) => {

                    return items.length - 1 === prev ? -1 : prev + 1;

                });

            }

            if (event.key === "ArrowUp") {

                setSelectedItemViaArrowKeypress((prev) => {

                    return -1 === prev ? items.length - 1 : prev - 1;

                });

            }

            if (event.key === "Enter") {

                if (selectedItemViaArrowKeypress === -1) {
                    // do nothing

                } else if (selectedItemViaArrowKeypress === 0) {
                    fileInput.current.click() // clicks hidden input element to open file
                } else if (selectedItemViaArrowKeypress === 1) {
                    downloadDBasJSON()

                }

            }

        }


        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }

    }, [items, selectedItemViaArrowKeypress]);



    function saveOrLoadFile(event, index) {
        event.preventDefault();
        console.log(index)
        if (index === 0) {
            let result =fileInput.current.click() // clicks hidden input element to open file
            console.log(result)
            console.log("data")
        } else if (index === 1) {
            downloadDBasJSON()
        } else {

        }

    }

    return (

        <div className={classes.root}>
      
              <div className={classes.container}>
              
                  <Grid item xs={12} sm={12}>
				            	<div className={classes.interactionContainer}>
                      <h1 className="logoFontContainerDashboard">
                          Workflow Magic
                      </h1>
                

                           <input className={classes.hiddenFileInputEle}
                                type="file"
                                onChange={(e) => handleFileChange(e)}
                                ref={fileInput} 
                            />


       
                    {

                      items.map((val,index)=>{
                            return (
                              <div key={index}>
                              <hr/>
                  
                                 <div type="file" onClick={(event)=>{ saveOrLoadFile(event,index) }} className={ selectedItemViaArrowKeypress === index ? classes.clientItemSelected : classes.clientItem}>{val.title}</div>
                          
                                <div className={classes.description}> {val.description}</div>
                              </div>
                            )
                        })
                    }





                    <div>
                  </div>          
                 </div>
                </Grid>
            </div>
     
            
      </div>

    )
}



SaveAndLoad.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = theme => (saveAndLoadStyle(theme));
export default withStyles(styles)(SaveAndLoad);