import React, {Fragment} from 'react';
import {GiphyContext} from "../../context/giphy/giphyContex";

const Body = () => {
    const {img, data, groupMode}: any = React.useContext(GiphyContext)
    const dataTag = Object.keys(data);

    return (
        <div>
            {groupMode
                ?
                dataTag.map((key: any, index: any) => (


                <Fragment key={`h1_${index}`}>
                    <h1 >{key}</h1>
                        {[...data[key]].map((tag:any, index : any) => (
                            <img key={`img_${tag}`}  src={tag} alt={'Gif'}/>
                        ))
                        }
                    </Fragment>
                ))

                : <Fragment>
                    {img && img.map((tag: any, index: any) => (
                        <img key={`img_${index}`} src={tag} alt={'Gif'}/>
                    ))
                    }
                </Fragment>
            }

            
        </div>
    );
};

export default Body;