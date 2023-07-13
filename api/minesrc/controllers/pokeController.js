let { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const { getPokemons, getPokemonDbById, getPokemonApiById } = require('../servicios/pokemons');


const router = Router()

router.get('/', async (req, res) => {
    const { name } = req.query;
    if (name) {
        const pokemonsByName = await getPokemons(name)
        if (pokemonsByName) {
            res.status(200).send(pokemonsByName)
        } else {
            res.status(404).send('Pokemon no encontrado')
        }
    } else {
        const listaPokemons = await getPokemons()
        res.status(200).json(listaPokemons)
    }


})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    if (id.length > 12) {
        const pokemonInfodbById = await getPokemonDbById(id)
        res.status(200).send(pokemonInfodbById)
    } else {
        const pokemonsInfoApiById = await getPokemonApiById(id)
        res.status(200).send(pokemonsInfoApiById)
    }

})

router.post('/', async (req, res, next)=>{
    const { name, image, height, weight, hp, attack, defense, speed, types } = req.body
    const nameMinuscule = name.toLowerCase()
    try {
        if( name &&  height && weight && hp && attack && defense && speed && types ){     
            const [newPokemon, created] = await Pokemon.findOrCreate({
                where:{
                    name: nameMinuscule,
                },
                defaults:{
                    image,
                    height,
                    weight,
                    hp,
                    attack,
                    defense,
                    speed,
                }
            })
            let typeFind = await Type.findAll({
                where:{
                    name:{
                        [Op.or]: types
                    }
                }
            })
            await newPokemon.addType(typeFind)

            if(!created)  res.status(500).send(`The Pokemon "${name}" cannot  be created because it already exists`)
            return res.status(200).send(`The Pokemon "${name}" updated successfully`)

        } return res.status(404).send("Missing data")
        
    } catch (error) {
        next(error)
    }
});

module.exports = router;