const router = require('express').Router()

const Person = require('../models/Person')

//cadastra dados
router.post('/', async (req,res) => {
    //mostra req    
    const { name, salary, approved } = req.body
    
    console.log(name)
    if(!name){
        res.status(422).json({ error: 'O nome é obrigatorio'})
        return;
    }

    const person = {
        name,
        salary,
        approved,
    }

    try{
        
        await Person.create(person) 
        
        res.status(201).json( {message: 'Pessoa inserida com sucesso!'})

    }catch(error){
        res.status(500).json({error: error})       
    }
})


//Rota inicial teste
/*router.get('/',(rep,res) => {
    //mostrar requisicao    

    res.json({message: 'oi express!'})
}
)*/


//leitura de dados
router.get('/', async (req, res) => {
    try {
      const people = await Person.find()
  
      res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
  })

//leitura de dados por id
router.get('/:id', async (req,res) => {
    //extrair o dados da requisição, pela rl = req.params
     const id = req.params.id

    try {
     const person = await Person.findOne({_id: id})
  
    if(!person) {
        res.status(422).json({message: 'Pessoa nao encontrada!'})
        return;
    }

     res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

//atualizar dados
router.patch('/:id', async (req,res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        
        console.log(updatedPerson)    

        if(updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'Pessoa nao encontrada!'})
            return;
        }
        res.status(200).json(person)
    
    } catch (error) {
        res.status(500).json({ erro: error }) 
    }
}

)

//deletar dados
router.delete('/:id', async (req, res)=> {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})
     
       if(!person) {
           res.status(422).json({message: 'Pessoa nao encontrada!'})
           return;
       }
       
       await Person.deleteOne({_id: id})


        res.status(200).json({message: 'Pessoa removida com sucesso!'})
   
       } catch (error) {
           res.status(500).json({ erro: error })
       }

})

module.exports = router