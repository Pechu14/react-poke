import { useState, useEffect } from "react";


function Formulario() {
    const [namePokemon, setNamePokemon] = useState("");
    const [dataPokemon, setDataPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(false)


    const fetchPokemon = async(pokemonName) => {
        setDataPokemon(null);
        setError(null);
        setLoad(true);

        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            if(!response.ok){
                throw new Error("Pokemon no encontrado,revisa el nombre introducido");
            }
            const data = await response.json();
            setDataPokemon(data);
            setNamePokemon("")
        }catch(error) {
            setError(error.message);
        }finally{
            setLoad(false);
        }

    };

    useEffect(()=>{
        if(namePokemon){
            const delaySearch = setTimeout(()=> {
                fetchPokemon(namePokemon);
            }, 2000);
            return () => clearTimeout(delaySearch);
        }

    }, [namePokemon]);


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
        <label htmlFor="namePokemon"></label>
        <input type="text" id="namePokemon" name="namePokemon" value={namePokemon} onChange={(e)=> setNamePokemon(e.target.value)} />
        </form>

        {load && <p>Buscando pokemon</p>}
        {error && <p>{error}</p>}
        {dataPokemon && (
            <div className="dataPokemon">
                <h3>{dataPokemon.name.toUpperCase()}</h3>
                <img src = {dataPokemon.sprites.front_default} alt={dataPokemon.name} />
            </div>
        )}

        </>
    )
};

 export default Formulario;