import { useState } from "react";
import { deleteAdvertsDetail } from "../../clientApi/petitions";
import Button from "../common/Button";
import { useNavigate } from 'react-router-dom';
const DeleteAdvert = (advertId) =>{

    const [submit, setSubmit] = useState('none');
    const navigate = useNavigate();
    const handleSubmitConfirmate = event => {
        event.preventDefault();
        console.log(advertId);
        try {
            deleteAdvertsDetail(advertId)
            navigate('/')
        } catch (error){
            console.log("Ha ocurrido un error")
        }
    }
    
    function handleSubmit (event) {
        event.preventDefault();
        setSubmit('block')
    }

return (
    <div>
   <form onSubmit={handleSubmit}>
    <Button type="submit" variant="primary"  value={true} >Eliminar Anuncio
            
            </Button>
            </form>  
     
        <div className="windows-confirmation" style={{display:submit}}> 
        <form onSubmit={handleSubmitConfirmate}>
            <span>¿Esta seguro que quiere eliminar el anuncio?</span>
        <Button 
          type="submit" 
          variant="primary"
          className="deleteconfirm-submit">
            Eliminar
          </Button>
          </form>
        </div>        
    </div>
)

}
export default DeleteAdvert;