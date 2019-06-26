import React from 'react';

function SelectorEncounter ({items, img, id, 
                Speed, SpeedStats,
                Sdef, SdefStats,
                Sattk, SattkStats,
                Def, DefStats,
                Attk, AttkStats,
                Hp, HpStats,handleCapture,toggleview,
}){
    return (
        <div className="found" id={id}>
        {
            toggleview ?
            (
                <React.Fragment></React.Fragment>

            ) : (
                <React.Fragment>
                <fieldset id="pokemon_Encounter">
                <img src={img} alt="" className="ImgPokemon" id="ImgPokemon"/>
                <h1 id="ImgPokemon1">{items.name}</h1>
                <button id="ImgPokemon-btn" className="explore-btn"
                    onClick={e => handleCapture(items)}>Capture</button>
                </fieldset>
                <div className="pokemonstats">
                <h2>Pokemon Stats</h2>
                <p>{Hp}: <b>{HpStats}</b></p>
                <p>{Attk}: <b>{AttkStats}</b></p>
                <p>{Def}: <b>{DefStats}</b></p>
                <p>{Speed}: <b>{SpeedStats}</b></p>
                <p>{Sattk}: <b>{SattkStats}</b></p>
                <p>{Sdef}: <b>{SdefStats}</b></p>
                </div>
                </React.Fragment>
                
            )
        }
        </div>
    );
}

function PokeEncounter({encounter_pokemon=[],pokemon_img=[],Capture,
    pokemon_stats_speed,pokemon_stats_speed_basestats,
    pokemon_stats_Sdef,pokemon_stats_Sdef_basestats,
    pokemon_stats_SAttk,pokemon_stats_SAttk_basestats,
    pokemon_stats_def,pokemon_stats_def_basestats,
    pokemon_stats_attk,pokemon_stats_attk_basestats,
    pokemon_stats_hp,pokemon_stats_hp_basestats,view,
            }){
    return (
        <div className="pokeencounter-container">
            <div className="pokeencounter-box">
                <h1>encounter</h1>
            </div>
            <div id="encounter-pokemon" className="detailed">
            
                    <SelectorEncounter  id={"encounter"} 
                        img={pokemon_img} items={encounter_pokemon} 
                        Speed={pokemon_stats_speed} SpeedStats={pokemon_stats_speed_basestats}
                        Sdef={pokemon_stats_Sdef} SdefStats={pokemon_stats_Sdef_basestats}
                        Sattk={pokemon_stats_SAttk} SattkStats={pokemon_stats_SAttk_basestats}
                        Def={pokemon_stats_def} DefStats={pokemon_stats_def_basestats}
                        Attk={pokemon_stats_attk} AttkStats={pokemon_stats_attk_basestats}
                        Hp={pokemon_stats_hp} HpStats={pokemon_stats_hp_basestats}
                        handleCapture={Capture} toggleview={view}
                    />
            </div>
        </div>
    )
}
export default PokeEncounter;