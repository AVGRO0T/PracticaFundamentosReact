import { useEffect, useState } from 'react';
import { createAdverts } from '../../clientApi/petitions';
import { getTags } from './tags';


const GetTag = () => {
    const [tags, setTags] = useState([]);

    useEffect (() => {
        const execute = async () => {
            const tags = await getTags();
            setTags(tags);
        };
        execute();
    },[]);
    return tags;
}



const CreateAdverts = () => {
    
 
    const [name, setName] = useState('');
    const [sale, setSale] = useState(true);
    const [price, setPrice] = useState('');
    const [tags, setTags]= useState([]);
    const [photo, setPhoto]= useState(null);

    const handleChangeName = event => setName(event.target.value);
    const handleChangeSale = event => setSale(event.target.value);
    const handleChangePrice = event => setPrice(event.target.value);
    const handleChangeTags = event => setTags(event.target.value);
    const handleChangephoto = event => setPhoto(event.target.files[0]);
    
     
    
    const handleSubmit = async event => {
        event.preventDefault();

    try {
        const formData = new FormData();
        if (photo != null){
            formData.append("photo", photo)
        }
        formData.append("name", name )
        formData.append("sale", sale)
        formData.append("price", price)
        formData.append("tags", tags)
       await createAdverts(formData);
        console.log("CREADO");
    } catch (error) {
        console.log ("HACER UN ERROR");
    } 
    };
    /* console.log(GetTag()); */
    return (
        <div>
            <h1> CREA TU ANUNCIO </h1>
            <form method='post' onSubmit={handleSubmit} enctype="multipart/form-data" >
            <label> Name </label>
            <input type={"text"} onChange={handleChangeName} name="name" value={name}/>
            <div className='selectSale'>
                <label>
                Sale:
                <select onChange={handleChangeSale} value={sale}>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>
                </label>
            </div>
            <label> Price </label>
            <input type={"text"} onChange={handleChangePrice} name="price" value={price}/>
            <div className='selectTags'>
            <label>
            Tags:
            <select value={tags} multiple onChange={handleChangeTags}>
              {GetTag().map(tag => {
                  return (<option key={tag} value={tag}>{tag}</option>);
              })}
            </select>
          </label>
            </div>
            <label> IMAGEN:
                <input type={"file"} id="fileInput"  onChange={handleChangephoto}></input>
            </label>
            <input type="submit"></input>
            </form>
        </div>

    )
}
export default CreateAdverts;