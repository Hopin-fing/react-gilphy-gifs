import React, {Fragment} from 'react';
import {GiphyContext} from "../../context/giphy/giphyContex";

const Body = () => {
    const {img, data, groupMode}: any = React.useContext(GiphyContext)
    const dataTag = Object.keys(data);
    const lengthTag = (tag: any) => {
        return  tag.split(',').length
    }

    return (
        <div className={'container pt-4'}>
            <div  className={'row'}>
            {groupMode
                ?
                dataTag.map((key: any, index: any) => (
                <Fragment key={`fragment_${index}`}>
                    <h1 className={'col-sm-12 mb-12'}  key={`h1_${index}`} >{key}</h1>
                    {[...data[key]].map((tag:any, index : any) => (
                        <div className={'col-sm-4 mb-4'} key={`container-img_${index}`}>
                            <img key={`img_${index}`}   src={tag} alt={'Gif'}/>
                        </div>
                    ))
                    }
                </Fragment>
                ))

                : <Fragment>
                    {img && img.map((tag: any, indexTag: any) =>

                        <div className={'col-sm-4 mb-4 container-img'} key={`divImg_${indexTag}`}>

                            {lengthTag(tag) >= 2

                                ? (tag.split(',').map((item: any, index: number) =>
                                    <img key={`customImg_${index}`} className={`img_${tag.split(',').length}`} src={item} alt={'Gif'}/>
                                ))
                                : <img key={`img_${indexTag}`} src={tag} alt={'Gif'}/>
                            }

                        </div>

                    )
                    }

                </Fragment>
            }
            </div>
            
        </div>
    );
};

export default Body;