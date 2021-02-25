import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "react-loader-spinner";
import Rating from "react-rating";
import imgStarGrey from '../../assets/images/star-grey.png';
import imgStarRed from '../../assets/images/star-red.png';
import imgStarYellow from '../../assets/images/star-yellow.png';

export const Comic = () => {
    const [comic, setComic] = useState({
        mounth: null,
        num: null,
        link: null,
        year: null,
        news: null,
        safe_title: null,
        transcript: null,
        alt: null,
        img: null,
        title: null,
        day: null
    });
    const [cargando, setCargando] = useState(false);
    const [puntaje, setPuntaje] = useState(0);

    useEffect(() => {
        setCargando(true);
        const numberRandomComic = Math.trunc(Math.random() * (614 - 1));
        axios.get('http://xkcd.com/' + numberRandomComic + '/info.0.json')
            .then(comicResult => comicResult.data)
            .then(value => {
                console.log(value);
                setComic({
                    mounth: value['mounth'],
                    num: value['num'],
                    link: value['link'],
                    year: value['year'],
                    news: value['news'],
                    safe_title: value['safe_title'],
                    transcript: value['transcript'],
                    alt: value['alt'],
                    img: value['img'],
                    title: value['title'],
                    day: value['day']
                });
                setCargando(false);
            }).catch(reason => console.log('Ocurrió un error consultando el comic: ' + reason))
    }, []);
    console.log(comic);
    return (
        <div>
            <div>
                {cargando ?
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                    :
                    <>
                        <div>
                            <h3>{comic.title}</h3>
                            <img src={comic.img}/>
                        </div>
                        <div class={'calificacion'}>
                            <Rating
                                placeholderRating={puntaje}
                                emptySymbol={<img src={imgStarGrey} className="icon"/>}
                                placeholderSymbol={<img src={imgStarRed} className="icon"/>}
                                fullSymbol={<img src={imgStarYellow} className="icon"/>}
                                onClick={value => setPuntaje(value)}
                            />
                            <h2 hidden={puntaje === 0}>Tu puntaje fue {puntaje}. Gracias por tu retroalimentación !</h2>
                        </div>
                    </>
                }
            </div>
        </div>
    );

}
