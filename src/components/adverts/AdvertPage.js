import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../layout/Page';
import { getAdvertsDetail } from '../../clientApi/petitions';

import DeleteAdvert from './DeleteAdvert';
import './AdvertDetail.css'

const AdvertPage = props => {
    const [advertname, setAdvertname] = useState('');
    const [advertprice, setAdvertprice] = useState(null);
    const [adverttags, setAdverttags] = useState(null);
    const [advertsale, setAdvertsale] = useState(null);
    const [advertphoto, setAdvertphoto] = useState(null);
    
   
    const {advertId} = useParams();
    const navigate = useNavigate();
    const unmounteRef = useRef(false);

    useEffect (() => {
        getAdvertsDetail(advertId)
         .then(advert => {
            setAdvertname(advert.name);
            setAdvertphoto(advert.photo);
            setAdvertprice(advert.price);
            setAdvertsale(advert.sale);
            setAdverttags(advert.tags);
            
         })
         .catch(error => {
            if (error.status === 404) {
                navigate('/')
            }
         })
    }, [advertId, navigate]);
    useEffect(() => {
        return () => {
          unmounteRef.current = true;
        };
      }, []);
     
      
      return (
        <Page title="Detalle de Anuncio" {...props}>
            
          <div>
           <h3> {advertname} </h3>
          {advertphoto != null & <img src={advertphoto} alt=''></img> }
           <p>Precio: {advertprice}</p>
           {advertsale === true && <p> Tipo de Producto: Compra</p> }
           {advertsale === false && <p> Tipo de Producto: Compra</p> }
           <span>TAGS: {adverttags}</span>
           {DeleteAdvert(advertId)}
          
          

          
          </div>
            

        </Page>

      );

}

export default AdvertPage